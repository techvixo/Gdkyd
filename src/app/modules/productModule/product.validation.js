const z = require('zod')

const createProductZodSchema = z.object({
  body: z.object({
    title_en: z.string({
      required_error: 'Product english title is required!'
    }),
    title_cn: z.string({
      required_error: 'Product chinese title is required!'
    }),
    subTitle_en: z.string({
      required_error: 'Product english sub title is required!'
    }),
    subTitle_cn: z.string({
      required_error: 'Product chinese sub title is required!'
    }),
    category: z.object({
        categoryId: z.string().optional(),
        title: z.string().optional()
      }).optional(),
      createdBy: z.object({
        adminId: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional()
      }).optional(),
    description_en: z.string({
      required_error: 'Product description_en is required!'
    }),
    description_cn: z.string({
      required_error: 'Product description_cn is required!'
    }),
  })
})

const specificProductZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is missing in request params!"
    })
  })
})

const ProductValidationZodSchema = {
    createProductZodSchema,
    specificProductZodSchema
}

module.exports = ProductValidationZodSchema
