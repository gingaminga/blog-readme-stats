import { GetListBlogCardParam, Theme } from "@my-types/params/blog.param.type";

class GetListBlogCardParamDTO {
  count: number;

  rss: string;

  theme?: Theme;

  constructor({ count = 5, rss, theme }: GetListBlogCardParam) {
    this.rss = rss;
    this.theme = theme;
    this.count = count;
  }
}

export default GetListBlogCardParamDTO;
