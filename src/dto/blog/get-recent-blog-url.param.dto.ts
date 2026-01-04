import { GetRecentBlogUrlParam } from "@my-types/params/blog.param.type";

class GetRecentBlogUrlParamDTO {
  url: string;

  constructor({ url }: GetRecentBlogUrlParam) {
    this.url = url;
  }
}

export default GetRecentBlogUrlParamDTO;
