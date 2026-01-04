import { Theme } from "@my-types/params/blog.param.type";
import { escapeXml, truncateText } from "@utils/text";

export interface BlogCardData {
  blogName: string;
  date: string;
  description: string;
  faviconUrl: string;
  postTitle: string;
  tags: string[];
}

interface ThemeColors {
  bgColor: string;
  borderColor: string;
  descriptionColor: string;
  tagBgColor: string;
  textColor: string;
}

const LIGHT_THEME: ThemeColors = {
  bgColor: "#ffffff",
  borderColor: "#E5E7EB",
  descriptionColor: "#959595",
  tagBgColor: "#F3F4F6",
  textColor: "#000000",
};

const DARK_THEME: ThemeColors = {
  bgColor: "#202830",
  borderColor: "#202830",
  descriptionColor: "#959595",
  tagBgColor: "#6366F1",
  textColor: "#F9FAFB",
};

/**
 * @description 블로그 카드 SVG 생성
 */
export function generateBlogCardSVG(data: BlogCardData, theme: Theme = Theme.LIGHT): string {
  const { blogName, date, description, faviconUrl, postTitle, tags } = data;
  const isDarkTheme = theme === Theme.DARK;
  const colors = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  const maxTagWidth = 410; // 전체 450 - 좌/우 여백40(20+20)
  let tagX = 20;
  const tagOpacity = isDarkTheme ? ' fill-opacity="0.7"' : "";
  const tagElements = tags
    .slice(0, 3)
    .map((tag) => {
      const tagWidth = Math.max(70, Math.min(tag.length * 7 + 16, 120)); // 기본 70, 최대 120
      if (tagX + tagWidth > maxTagWidth) return ""; // 여백을 넘으면 표시하지 않음

      const tagElement = `
      <rect x="${tagX}" y="91" width="${tagWidth}" height="24" rx="12" fill="${colors.tagBgColor}"${tagOpacity}/>
      <text x="${tagX + tagWidth / 2}" y="107" font-family="'Noto Sans KR', 'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="400" fill="${colors.textColor}" text-anchor="middle">${escapeXml(truncateText(tag, 15))}</text>
    `;
      tagX += tagWidth + 8;

      return tagElement;
    })
    .filter((el) => el !== "");

  const svg = `<svg width="450" height="150" viewBox="0 0 450 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&amp;display=swap');
    </style>
    <clipPath id="faviconClip">
      <circle cx="420" cy="131" r="8"/>
    </clipPath>
  </defs>
  
  <!-- 배경 -->
  <rect width="450" height="150" fill="${colors.bgColor}" stroke="${colors.borderColor}" stroke-width="1" rx="10"/>
  
  <!-- 제목 -->
  <foreignObject x="20" y="15" width="410" height="30">
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-size: 20px;
      font-weight: 700;
      color: ${colors.textColor};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      height: 100%;
    ">${escapeXml(postTitle)}</div>
  </foreignObject>
  
  <!-- 설명 (최대 2줄) -->
  <foreignObject x="20" y="45" width="410" height="40">
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-size: 12px;
      font-weight: 400;
      color: ${colors.descriptionColor};
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.6;
      width: 100%;
    ">${escapeXml(description)}</div>
  </foreignObject>
  
  <!-- 태그 -->
  ${tagElements.join("")}
  
  <!-- 작성 날짜 -->
  <text x="20" y="135" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="400" fill="${colors.textColor}">
    ${escapeXml(date)}
  </text>
  
  <!-- 블로그명 -->
  <text x="402" y="135" font-family="'Segoe UI', Ubuntu, sans-serif" font-size="12" font-weight="400" fill="${colors.textColor}" text-anchor="end">
    ${escapeXml(blogName)}
  </text>
  
  <!-- 파비콘 배경 (원형) -->
  <circle cx="420" cy="131" r="8" fill="#ffffff" stroke="${colors.borderColor}" stroke-width="1"/>
  
  <!-- 파비콘 -->
  <image x="412" y="123" width="16" height="16" xlink:href="${faviconUrl}" clip-path="url(#faviconClip)"/>
</svg>`;

  return svg;
}
