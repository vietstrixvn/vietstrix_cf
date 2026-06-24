import { logError, logWarn } from '@/utils';

/**
 * Revalidate cache sau khi tạo/sửa/xóa content
 */
export async function revalidateContent(options: {
  paths?: string[];
  tags?: string[];
}) {
  const { paths = [], tags = [] } = options;

  try {
    const secret = process.env.NEXT_PUBLIC_REVALIDATE_SECRET;

    if (!secret) {
      logWarn('NEXT_PUBLIC_REVALIDATE_SECRET not set');
      return;
    }

    // Revalidate paths
    for (const path of paths) {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, secret }),
      });
    }

    // Revalidate tags
    for (const tag of tags) {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag, secret }),
      });
    }
  } catch (error) {
    logError(' Error revalidating:', error);
  }
}

/**
 * Revalidate sau khi tạo/sửa/xóa bài viết
 */
export async function revalidatePosts() {
  await revalidateContent({
    paths: ['/bai-viet', '/', '/doi-tac'],
    tags: ['posts'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa sản phẩm
 */
export async function revalidateProducts() {
  await revalidateContent({
    paths: ['/san-pham', '/'],
    tags: ['products'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa đối tác
 */
export async function revalidateProjects() {
  await revalidateContent({
    paths: ['/doi-tac', '/'],
    tags: ['projects'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa category
 */
export async function revalidateCategories() {
  await revalidateContent({
    paths: ['/bai-viet', '/san-pham', '/doi-tac', '/'],
    tags: ['categories', 'types'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa banner
 */
export async function revalidateBanners() {
  await revalidateContent({
    paths: ['/'],
    tags: ['banners'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa tags
 */
export async function revalidateTags() {
  await revalidateContent({
    paths: ['/bai-viet', '/san-pham', '/doi-tac'],
    tags: ['tags'],
  });
}

/**
 * Revalidate sau khi tạo/sửa/xóa gallery
 */
export async function revalidateGallery() {
  await revalidateContent({
    paths: ['/gioi-thieu'],
    tags: ['gallery'],
  });
}

/**
 * Revalidate header (khi categories thay đổi)
 */
export async function revalidateHeader() {
  await revalidateContent({
    paths: ['/'],
    tags: ['types', 'categories'],
  });
}

/**
 * Revalidate toàn bộ site (dùng khi cần)
 */
export async function revalidateAll() {
  await revalidateContent({
    paths: [
      '/',
      '/bai-viet',
      '/san-pham',
      '/doi-tac',
      '/gioi-thieu',
      '/lien-he',
    ],
    tags: [
      'posts',
      'products',
      'projects',
      'categories',
      'types',
      'banners',
      'tags',
      'gallery',
    ],
  });
}
