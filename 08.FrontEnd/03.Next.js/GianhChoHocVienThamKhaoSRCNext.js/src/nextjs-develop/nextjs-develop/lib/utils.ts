/**
 * TEACHING POINT: Utility functions promote code reuse.
 * This function calculates reading time based on a simple formula.
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}
