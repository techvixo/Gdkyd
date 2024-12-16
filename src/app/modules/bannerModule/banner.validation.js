const z = require('zod')

const createBannerZodSchema = z.object({
  body: z.object({
    title_en: z.string({
      required_error: 'Banner english title is required!'
    }),
    title_cn: z.string({
      required_error: 'Banner chinese title is required!'
    }),
    description_en: z.string({
      required_error: 'Banner english description is required!'
    }),
    description_cn: z.string({
      required_error: 'Banner chinese description is required!'
    })
  })
})

const specificBannerZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const BannerValidationZodSchema = {
  createBannerZodSchema,
  specificBannerZodSchema
}

module.exports = BannerValidationZodSchema
