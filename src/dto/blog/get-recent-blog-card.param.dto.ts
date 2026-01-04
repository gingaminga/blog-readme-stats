import { GetRecentBlogCardParam, Theme } from "@my-types/params/blog.param.type";

class GetRecentBlogCardParamDTO {
  theme?: Theme;

  url: string;

  constructor({ theme, url }: GetRecentBlogCardParam) {
    this.theme = theme;
    this.url = url;
  }
}

export default GetRecentBlogCardParamDTO;
