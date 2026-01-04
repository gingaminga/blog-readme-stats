/**
 * @description XML 특수문자 이스케이프
 */
export function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/**
 * @description HTML 태그 제거 및 엔티티 디코딩
 */
export function stripHtmlTags(html: string): string {
  return (
    html
      // HTML 태그 제거
      .replaceAll(/<[^>]*>/g, " ")
      // HTML 엔티티 디코딩
      .replaceAll("&nbsp;", " ")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&amp;", "&")
      .replaceAll("&quot;", '"')
      .replaceAll("&#39;", "'")
      // 연속된 공백을 하나로
      .replaceAll(/\s+/g, " ")
      // 앞뒤 공백 제거
      .trim()
  );
}

/**
 * @description 텍스트 길이 제한
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}
