import { blogService } from "@config/container.config";
import GetRecentBlogUrlParamDTO from "@dto/blog/get-recent-blog-url.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description RSS를 읽어 최신 블로그 글의 URL로 리다이렉트하는 컨트롤러
 */
export const getRecentBlogUrlController: RequestDTOHandler<GetRecentBlogUrlParamDTO> = async (_req, res) => {
  const paramDTO = res.locals.requestDTO;

  const response = await blogService.getRecentBlogUrl(paramDTO);

  res.redirect(302, response.url);
};
