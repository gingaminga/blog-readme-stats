import { blogService } from "@config/container.config";
import GetListBlogCardParamDTO from "@dto/blog/get-list-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";

/**
 * @description RSS를 읽어 블로그 글 리스트 SVG 카드를 생성하는 컨트롤러
 */
export const getListBlogCardController: RequestDTOHandler<GetListBlogCardParamDTO> = async (_req, res) => {
  const paramDTO = res.locals.requestDTO;

  const response = await blogService.createListBlogCard(paramDTO);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=3600"); // 1시간 캐시
  res.send(response.svg);
};
