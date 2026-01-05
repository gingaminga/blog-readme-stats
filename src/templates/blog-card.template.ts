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
  borderColor: "#000000",
  descriptionColor: "#959595",
  tagBgColor: "#6366F1",
  textColor: "#F9FAFB",
};

/**
 * @description 블로그 카드 SVG 생성
 * @param theme - undefined일 경우 브라우저의 prefers-color-scheme 사용
 */
export function generateBlogCardSVG(data: BlogCardData, theme?: Theme): string {
  const { blogName, date, description, faviconUrl, postTitle, tags } = data;

  // 스타일 생성
  let styleContent = "";
  if (theme) {
    // 테마가 지정된 경우: 고정 색상 사용
    const colors = theme === Theme.DARK ? DARK_THEME : LIGHT_THEME;
    const tagOpacity = theme === Theme.DARK ? ".tag-bg { fill-opacity: 0.7; }" : "";
    styleContent = `
    <style>
      :root {
        --bg-color: ${colors.bgColor};
        --border-color: ${colors.borderColor};
        --text-color: ${colors.textColor};
        --description-color: ${colors.descriptionColor};
        --tag-bg: ${colors.tagBgColor};
      }
      ${tagOpacity}
    </style>`;
  } else {
    // 테마가 없는 경우: 브라우저 설정에 따라 자동 변경
    styleContent = `
    <style>
      :root {
        --bg-color: ${LIGHT_THEME.bgColor};
        --border-color: ${LIGHT_THEME.borderColor};
        --text-color: ${LIGHT_THEME.textColor};
        --description-color: ${LIGHT_THEME.descriptionColor};
        --tag-bg: ${LIGHT_THEME.tagBgColor};
      }
      
      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: ${DARK_THEME.bgColor};
          --border-color: ${DARK_THEME.borderColor};
          --text-color: ${DARK_THEME.textColor};
          --description-color: ${DARK_THEME.descriptionColor};
          --tag-bg: ${DARK_THEME.tagBgColor};
        }
        
        .tag-bg {
          fill-opacity: 0.7;
        }
      }
    </style>`;
  }

  const maxTagWidth = 410; // 전체 450 - 좌/우 여백40(20+20)
  let tagX = 20;
  const tagElements = tags
    .slice(0, 3)
    .map((tag) => {
      const tagWidth = Math.max(70, Math.min(tag.length * 7 + 16, 120));
      if (tagX + tagWidth > maxTagWidth) return "";

      const tagElement = `
      <rect x="${tagX}" y="91" width="${tagWidth}" height="24" rx="12" fill="var(--tag-bg)" class="tag-bg"/>
      <text x="${tagX + tagWidth / 2}" y="107" font-size="12" font-weight="400" fill="var(--text-color)" text-anchor="middle">${escapeXml(truncateText(tag, 15))}</text>
    `;
      tagX += tagWidth + 8;

      return tagElement;
    })
    .filter((el) => el !== "");

  return `<svg width="450" height="150" viewBox="0 0 450 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="faviconClip">
      <circle cx="420" cy="131" r="8"/>
    </clipPath>
  </defs>
  ${styleContent}
  
  <!-- 배경 -->
  <rect width="450" height="150" fill="var(--bg-color)" stroke="var(--border-color)" stroke-width="1" rx="10"/>
  
  <!-- 제목 -->
  <foreignObject x="20" y="15" width="410" height="30">
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-size: 20px;
      font-weight: 700;
      color: var(--text-color);
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
      color: var(--description-color);
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
  <text x="20" y="135" font-size="12" font-weight="400" fill="var(--text-color)">
    ${escapeXml(date)}
  </text>
  
  <!-- 블로그명 -->
  <text x="402" y="135" font-size="12" font-weight="400" fill="var(--text-color)" text-anchor="end">
    ${escapeXml(blogName)}
  </text>
  
  <!-- 파비콘 배경 (원형) -->
  <circle cx="420" cy="131" r="8" fill="#ffffff" stroke="var(--border-color)" stroke-width="1"/>
  
  <!-- 파비콘 -->
  <image x="412" y="123" width="16" height="16" xlink:href="${faviconUrl}" clip-path="url(#faviconClip)"/>
</svg>`;
}
