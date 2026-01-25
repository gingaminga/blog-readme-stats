import { GetListBlogCardParam, Theme } from "@my-types/params/blog.param.type";

class GetListBlogCardParamDTO {
  rss: string;

  theme?: Theme;

  constructor({ rss, theme }: GetListBlogCardParam) {
    this.rss = rss;
    this.theme = theme;
  }
}

export default GetListBlogCardParamDTO;
