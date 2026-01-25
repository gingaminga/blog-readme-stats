import GetListBlogCardParamDTO from "@dto/blog/get-list-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { GetListBlogCardParam, Theme } from "@my-types/params/blog.param.type";
import { urlScheme } from "@validators/url.schema";
import Joi from "joi";

export const getListBlogCardSchema = Joi.object<GetListBlogCardParam>().keys({
  count: Joi.number().integer().min(1).max(10).optional().default(5),
  rss: urlScheme.required(),
  theme: Joi.string().valid(Theme.DARK, Theme.LIGHT).optional(),
});

export const getListBlogCardValidator: RequestDTOHandler<GetListBlogCardParamDTO> = async (req, res, next) => {
  const params = await getListBlogCardSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetListBlogCardParamDTO(params);

  next();
};
