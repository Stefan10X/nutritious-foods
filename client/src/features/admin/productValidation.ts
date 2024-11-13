import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  meat: yup.string().required(),
  sideDish: yup.string().required(),
  price: yup.number().required().moreThan(100),
  quantityInStock: yup.number().required().min(0),
  grams: yup.number().required().min(0),
  calories: yup.number().required().min(0),
  proteins: yup.number().required().min(0),
  carbohidrates: yup.number().required().min(0),
  fats: yup.number().required().min(0),
  ingredients: yup.string().required(),
  file: yup.mixed().when("pictureUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required("Please provide an image"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
