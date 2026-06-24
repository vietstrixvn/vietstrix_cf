// uploadValidator.ts
// Mirror của Go allowedExtensions map — dễ sync khi backend thay đổi

export type FileCategory =
  | 'image'
  | 'video'
  | 'document'
  | 'thumbnail'
  | 'banner';

const ALLOWED_EXTENSIONS: Record<FileCategory, readonly string[]> = {
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
  document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'],
  thumbnail: ['jpg', 'jpeg', 'png', 'webp'],
  banner: ['jpg', 'jpeg', 'png', 'webp'],
} as const;

// Size limits (bytes) — tuỳ chỉnh theo backend
const MAX_FILE_SIZE: Record<FileCategory, number> = {
  image: 10 * 1024 * 1024, // 10 MB
  video: 500 * 1024 * 1024, // 500 MB
  document: 20 * 1024 * 1024, // 20 MB
  thumbnail: 2 * 1024 * 1024, // 2 MB
  banner: 5 * 1024 * 1024, // 5 MB
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ValidateOptions {
  /** Nếu true, đọc magic bytes thay vì chỉ dựa vào extension (an toàn hơn) */
  checkMagicBytes?: boolean;
  /** Override max size (bytes) cho lần gọi này */
  maxSize?: number;
}

// ─── Core helpers ─────────────────────────────────────────────────────────────

/** Lấy extension từ tên file, lowercase, không có dấu chấm */
export function getExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Tự động detect category từ file
 * Trả về category phù hợp nhất dựa trên extension
 */
export function detectFileCategory(file: File): FileCategory {
  const ext = getExtension(file.name);

  // Check each category
  for (const [category, extensions] of Object.entries(ALLOWED_EXTENSIONS)) {
    if ((extensions as readonly string[]).includes(ext)) {
      return category as FileCategory;
    }
  }

  // Default fallback based on MIME type
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('application/') || file.type.startsWith('text/')) {
    return 'document';
  }

  // Final fallback
  return 'document';
}

/** Kiểm tra extension có nằm trong category không */
export function isExtensionAllowed(
  filename: string,
  category: FileCategory
): boolean {
  const ext = getExtension(filename);
  return (ALLOWED_EXTENSIONS[category] as string[]).includes(ext);
}

/**
 * Đọc magic bytes (file signature) để xác minh thực sự loại file.
 * Quan trọng vì user có thể đổi tên .exe thành .jpg.
 */
async function readMagicBytes(file: File, bytes = 12): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      resolve(new Uint8Array(e.target!.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(0, bytes));
  });
}

const MAGIC_SIGNATURES: Array<{ hex: string; mimes: string[] }> = [
  { hex: 'ffd8ff', mimes: ['image/jpeg'] },
  { hex: '89504e47', mimes: ['image/png'] },
  { hex: '47494638', mimes: ['image/gif'] },
  { hex: '52494646', mimes: ['image/webp'] }, // RIFF....WEBP
  { hex: '25504446', mimes: ['application/pdf'] },
  {
    hex: '504b0304',
    mimes: ['application/zip', 'application/vnd.openxmlformats'],
  },
  { hex: '000000', mimes: ['video/mp4'] },
  { hex: '1a45dfa3', mimes: ['video/mkv', 'video/webm'] },
];

async function validateMagicBytes(
  file: File,
  category: FileCategory
): Promise<string | null> {
  try {
    const bytes = await readMagicBytes(file);
    const hex = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const matched = MAGIC_SIGNATURES.find((sig) => hex.startsWith(sig.hex));

    // Nếu không match bất kỳ signature nào đã biết → cảnh báo nhẹ (không block)
    if (!matched) return null;

    const mime = file.type;
    const categoryMimeMap: Record<FileCategory, string[]> = {
      image: ['image/'],
      video: ['video/'],
      document: [
        'application/pdf',
        'application/msword',
        'application/vnd',
        'text/plain',
      ],
      thumbnail: ['image/'],
      banner: ['image/'],
    };

    const allowedPrefixes = categoryMimeMap[category];
    const mimeMatch = allowedPrefixes.some((prefix) => mime.startsWith(prefix));

    if (!mimeMatch) {
      return `File "${file.name}" doesn't seem like it. ${category} valid (Magic bytes do not match the extension.).`;
    }
  } catch {
    // Silent fail — magic byte check là optional
  }
  return null;
}

// ─── Main validator ────────────────────────────────────────────────────────────

/**
 * Validate một file theo category.
 *
 * @example
 * const result = await validateFile(file, "image");
 * if (!result.valid) console.error(result.errors);
 */
export async function validateFile(
  file: File,
  category: FileCategory,
  options: ValidateOptions = {}
): Promise<ValidationResult> {
  const errors: string[] = [];
  const maxSize = options.maxSize ?? MAX_FILE_SIZE[category];

  // 1. Extension check
  if (!isExtensionAllowed(file.name, category)) {
    const allowed = ALLOWED_EXTENSIONS[category].join(', ');
    errors.push(
      `"${file.name}": extension không hợp lệ cho ${category}. Cho phép: ${allowed}.`
    );
  }

  // 2. File size check
  if (file.size > maxSize) {
    const mb = (maxSize / 1024 / 1024).toFixed(0);
    errors.push(`"${file.name}": vượt quá giới hạn ${mb} MB.`);
  }

  // 3. Magic bytes check (optional)
  if (options.checkMagicBytes && errors.length === 0) {
    const magicError = await validateMagicBytes(file, category);
    if (magicError) errors.push(magicError);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate nhiều files cùng lúc (parallel).
 * Trả về map từ file index → ValidationResult.
 */
export async function validateFiles(
  files: File[],
  category: FileCategory,
  options: ValidateOptions = {}
): Promise<ValidationResult[]> {
  return Promise.all(files.map((f) => validateFile(f, category, options)));
}

// ─── Debounced validator (dùng trong onChange của input) ──────────────────────

/**
 * Tạo một debounced validator — lý tưởng cho file input onChange.
 * Tránh validate liên tục khi user chọn nhiều file nhanh.
 *
 * @example
 * const debouncedValidate = createDebouncedValidator("image", (results) => {
 *   results.forEach(r => { if (!r.valid) showError(r.errors); });
 * }, 300);
 *
 * <input type="file" onChange={(e) => debouncedValidate(Array.from(e.target.files ?? []))} />
 */
export function createDebouncedValidator(
  category: FileCategory,
  onResult: (results: ValidationResult[], files: File[]) => void,
  delay = 300,
  options: ValidateOptions = {}
): (files: File[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (files: File[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
      const results = await validateFiles(files, category, options);
      onResult(results, files);
    }, delay);
  };
}

// ─── Aggregate helper ─────────────────────────────────────────────────────────

/**
 * Gộp nhiều ValidationResult thành một kết quả chung.
 * Tiện dùng khi muốn hiển thị tất cả lỗi cùng lúc.
 */
export function mergeResults(results: ValidationResult[]): ValidationResult {
  const errors = results.flatMap((r) => r.errors);
  return { valid: errors.length === 0, errors };
}
