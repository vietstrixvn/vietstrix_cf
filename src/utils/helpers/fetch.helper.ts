/**
 * Fetch wrapper that handles large number IDs (snowflake IDs)
 * by converting them to strings before JSON parsing to prevent rounding
 */
export async function fetchWithLargeNumbers(
  url: string,
  options?: RequestInit
): Promise<any> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.statusText}`);
  }

  const text = await response.text();

  // Use regex to wrap large numbers (16+ digits) in quotes before parsing
  // This prevents JavaScript from rounding large numbers like snowflake IDs
  const jsonString = text.replace(
    /"(id|category_id|type_id|image_id|service_id|user_id|post_id|product_id|banner_id|tag_id|mention_id)":\s*(\d{16,})/g,
    '"$1":"$2"'
  );

  return JSON.parse(jsonString);
}
