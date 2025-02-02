const z = require('zod')

const createCategoryZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'name_en is required!'
    }),
    name_cn: z.string({
      required_error: 'name_cn is required!'
    }),
    description_en: z.string({
      required_error: 'description_en is required!'
    }),
    description_cn: z.string({
      required_error: 'description_cn is required!'
    }),
  })
})

const specificCategoryZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is missing in request params!"
    })
  })
})

const CategoryValidationZodSchema = {
    createCategoryZodSchema,
    specificCategoryZodSchema
}

module.exports = CategoryValidationZodSchema
