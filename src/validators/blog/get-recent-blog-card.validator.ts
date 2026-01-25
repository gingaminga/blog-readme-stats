import GetRecentBlogCardParamDTO from "@dto/blog/get-recent-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { GetRecentBlogCardParam, Theme } from "@my-types/params/blog.param.type";
import { urlScheme } from "@validators/url.schema";
import Joi from "joi";

export const getRecentBlogCardSchema = Joi.object<GetRecentBlogCardParam>().keys({
  theme: Joi.string().valid(Theme.DARK, Theme.LIGHT).optional(),
  url: urlScheme.required(),
});

export const getRecentBlogCardValidator: RequestDTOHandler<GetRecentBlogCardParamDTO> = async (req, res, next) => {
  const params = await getRecentBlogCardSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetRecentBlogCardParamDTO(params);

  next();
};
