import { GetPickBlogCardParam, Theme } from "@my-types/params/blog.param.type";

class GetPickBlogCardParamDTO {
  postUrl: string;

  rss: string;

  theme?: Theme;

  constructor({ postUrl, rss, theme }: GetPickBlogCardParam) {
    this.postUrl = postUrl;
    this.rss = rss;
    this.theme = theme;
  }
}

export default GetPickBlogCardParamDTO;
