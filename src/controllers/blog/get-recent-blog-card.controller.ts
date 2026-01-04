import { blogService } from "@config/container.config";
import GetRecentBlogCardParamDTO from "@dto/blog/get-recent-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description RSS를 읽어 최신 블로그 정보로 SVG 카드를 생성하는 컨트롤러
 */
export const getRecentBlogCardController: RequestDTOHandler<GetRecentBlogCardParamDTO> = async (_req, res) => {
  const paramDTO = res.locals.requestDTO;

  const response = await blogService.createRecentBlogCard(paramDTO);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=3600"); // 1시간 캐시
  res.send(response.svg);
};
