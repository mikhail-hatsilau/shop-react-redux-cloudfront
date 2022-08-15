import * as Yup from "yup";

export const ProductImageSchema = Yup.object({
  id: Yup.string().required(),
  main: Yup.bool(),
  source: Yup.string(),
});

export const ProductSchema = Yup.object({
  id: Yup.string(),
  title: Yup.string().required().default(""),
  description: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
  categoryId: Yup.string().uuid(),
  images: Yup.array(ProductImageSchema).required(),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;
