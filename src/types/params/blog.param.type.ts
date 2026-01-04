export const enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export interface GetRecentBlogCardParam {
  theme?: Theme;
  url: string;
}
