import GetPickBlogCardParamDTO from "@dto/blog/get-pick-blog-card.param.dto";
import { RequestDTOHandler } from "@my-types/express.type";
import { GetPickBlogCardParam, Theme } from "@my-types/params/blog.param.type";
import Joi from "joi";

export const getPickBlogCardSchema = Joi.object<GetPickBlogCardParam>().keys({
  postUrl: Joi.string().uri().required(),
  rss: Joi.string().uri().required(),
  theme: Joi.string().valid(Theme.DARK, Theme.LIGHT).optional(),
});

export const getPickBlogCardValidator: RequestDTOHandler<GetPickBlogCardParamDTO> = async (req, res, next) => {
  const params = await getPickBlogCardSchema.validateAsync(req.query);

  res.locals.requestDTO = new GetPickBlogCardParamDTO(params);

  next();
};
