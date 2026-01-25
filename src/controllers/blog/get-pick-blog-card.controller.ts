import { blogService } from "@config/container.config";
import GetPickBlogCardParamDTO from "@dto/blog/get-pick-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description RSS에서 특정 URL의 블로그 글 정보로 SVG 카드를 생성하는 컨트롤러
 */
export const getPickBlogCardController: RequestDTOHandler<GetPickBlogCardParamDTO> = async (_req, res) => {
  const paramDTO = res.locals.requestDTO;

  const response = await blogService.createPickBlogCard(paramDTO);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=3600"); // 1시간 캐시
  res.send(response.svg);
};
