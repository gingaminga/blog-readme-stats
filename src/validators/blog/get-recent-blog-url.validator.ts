import GetRecentBlogUrlParamDTO from "@dto/blog/get-recent-blog-url.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { GetRecentBlogUrlParam } from "@my-types/params/blog.param.type";
import { urlScheme } from "@validators/url.schema";
import Joi from "joi";

export const getRecentBlogUrlSchema = Joi.object<GetRecentBlogUrlParam>().keys({
  url: urlScheme.required(),
});

export const getRecentBlogUrlValidator: RequestDTOHandler<GetRecentBlogUrlParamDTO> = async (req, res, next) => {
  const params = await getRecentBlogUrlSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetRecentBlogUrlParamDTO(params);

  next();
};
