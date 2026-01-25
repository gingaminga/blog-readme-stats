export const enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export interface GetPickBlogCardParam {
  postUrl: string;
  rss: string;
  theme?: Theme;
}

export interface GetRecentBlogCardParam {
  theme?: Theme;
  url: string;
}

export interface GetRecentBlogUrlParam {
  url: string;
}
