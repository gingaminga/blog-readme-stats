import { Theme } from "@my-types/params/blog.param.type";
import { escapeXml, truncateText } from "@utils/text";

export interface BlogListCardData {
  blogName: string;
  faviconBuffer: ArrayBuffer;
  posts: BlogListItem[];
}

export interface BlogListItem {
  date: string;
  postTitle: string;
  tags: string[];
}

interface ThemeColors {
  bgColor: string;
  borderColor: string;
  dateColor: string;
  dividerColor: string;
  tagBgColor: string;
  textColor: string;
}

const LIGHT_THEME: ThemeColors = {
  bgColor: "#ffffff",
  borderColor: "#E5E7EB",
  dateColor: "#6B7280",
  dividerColor: "#E5E7EB",
  tagBgColor: "#F3F4F6",
  textColor: "#000000",
};

const DARK_THEME: ThemeColors = {
  bgColor: "#1F2830",
  borderColor: "#31373D",
  dateColor: "#959595",
  dividerColor: "#374151",
  tagBgColor: "#6366F1",
  textColor: "#F9FAFB",
};

/**
 * @description 블로그 리스트 카드 SVG 생성
 * @param theme - undefined일 경우 브라우저의 prefers-color-scheme 사용
 */
export function generateBlogListCardSVG(data: BlogListCardData, theme?: Theme): string {
  const { blogName, faviconBuffer, posts } = data;

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
        --date-color: ${colors.dateColor};
        --divider-color: ${colors.dividerColor};
        --tag-bg: ${colors.tagBgColor};
      }
      ${tagOpacity}

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .card-container {
        animation: fadeIn 0.6s ease-out;
      }
    </style>`;
  } else {
    // 테마가 없는 경우: 브라우저 설정에 따라 자동 변경
    styleContent = `
    <style>
      :root {
        --bg-color: ${LIGHT_THEME.bgColor};
        --border-color: ${LIGHT_THEME.borderColor};
        --text-color: ${LIGHT_THEME.textColor};
        --date-color: ${LIGHT_THEME.dateColor};
        --divider-color: ${LIGHT_THEME.dividerColor};
        --tag-bg: ${LIGHT_THEME.tagBgColor};
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: ${DARK_THEME.bgColor};
          --border-color: ${DARK_THEME.borderColor};
          --text-color: ${DARK_THEME.textColor};
          --date-color: ${DARK_THEME.dateColor};
          --divider-color: ${DARK_THEME.dividerColor};
          --tag-bg: ${DARK_THEME.tagBgColor};
        }

        .tag-bg {
          fill-opacity: 0.7;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .card-container {
        animation: fadeIn 0.6s ease-out;
      }
    </style>`;
  }

  /* 파비콘 처리 */
  const hasFavicon = faviconBuffer.byteLength > 0;
  const faviconBase64 = hasFavicon ? Buffer.from(faviconBuffer).toString("base64") : "";

  const faviconClipPath = hasFavicon
    ? `<defs>
      <clipPath id="profileClip">
        <circle cx="30" cy="30" r="16"/>
      </clipPath>
      </defs>
    `
    : "";

  const faviconElements = hasFavicon
    ? `
  <!-- 프로필 배경 (원형) -->
  <circle cx="30" cy="30" r="16" fill="#ffffff" stroke="var(--border-color)" stroke-width="1"/>

  <!-- 프로필 이미지 -->
  <image x="14" y="14" width="32" height="32" href="data:image/png;base64,${faviconBase64}" clip-path="url(#profileClip)"/>`
    : "";

  /* 블로그 글 리스트 생성 */
  const itemHeight = 60;
  const headerHeight = 60;
  const totalHeight = headerHeight + posts.length * itemHeight + 10; // 여백 10px

  const postElements = posts
    .map((post, index) => {
      const yOffset = headerHeight + index * itemHeight;

      // 태그 처리
      const maxTagWidth = 340; // 전체 450 - 좌측 여백 20 - 날짜 영역 90
      let tagX = 110;
      const tagElements = post.tags
        .slice(0, 3)
        .map((tag) => {
          const tagWidth = Math.max(60, Math.min(tag.length * 7 + 12, 80));
          if (tagX + tagWidth > maxTagWidth + 170) return "";

          const tagElement = `
        <rect x="${tagX}" y="${yOffset + 28}" width="${tagWidth}" height="20" rx="10" fill="var(--tag-bg)" class="tag-bg"/>
        <text x="${tagX + tagWidth / 2}" y="${yOffset + 42}" font-size="11" font-weight="400" fill="var(--text-color)" text-anchor="middle">${escapeXml(truncateText(tag, 12))}</text>
      `;
          tagX += tagWidth + 6;

          return tagElement;
        })
        .filter((el) => el !== "");

      return `
    <!-- 제목 -->
    <foreignObject x="20" y="${yOffset + 5}" width="410" height="20">
      <div xmlns="http://www.w3.org/1999/xhtml" style="
        font-size: 16px;
        font-weight: 600;
        color: var(--text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      ">${escapeXml(post.postTitle)}</div>
    </foreignObject>

    <!-- 날짜 -->
    <text x="20" y="${yOffset + 42}" font-size="12" font-weight="400" fill="var(--date-color)">
      ${escapeXml(post.date)}
    </text>

    <!-- 태그 -->
    ${tagElements.join("")}

    ${index < posts.length - 1 ? `<!-- 구분선 -->\n    <line x1="20" y1="${yOffset + itemHeight - 5}" x2="430" y2="${yOffset + itemHeight - 5}" stroke="var(--divider-color)" stroke-width="1"/>` : ""}
  `;
    })
    .join("");

  return `<svg width="450" height="${totalHeight}" viewBox="0 0 450 ${totalHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${faviconClipPath}
  ${styleContent}

  <g class="card-container">
    <!-- 배경 -->
    <rect width="450" height="${totalHeight}" fill="var(--bg-color)" stroke="var(--border-color)" stroke-width="1" rx="10"/>

    <!-- 프로필 영역 -->
    ${faviconElements}
    <text x="56" y="37" font-size="16" font-weight="600" fill="var(--text-color)">
      ${escapeXml(blogName)}
    </text>

    <!-- 헤더 구분선 -->
    <line x1="20" y1="55" x2="430" y2="55" stroke="var(--divider-color)" stroke-width="1"/>

    <!-- 블로그 글 리스트 -->
    ${postElements}
  </g>
</svg>`;
}
