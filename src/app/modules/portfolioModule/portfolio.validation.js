const z = require('zod')

const createPortfolioZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'Portfolio english name is required!'
    }),
    name_cn: z.string({
      required_error: 'Portfolio chinese name is required!'
    }),
    description_en: z.string({
      required_error: 'Portfolio description_en title is required!'
    }),
    description_cn: z.string({
      required_error: 'Portfolio description_cn title is required!'
    }),
    url: z.string({
      required_error: 'Portfolio url title is required!'
    }),
    addedBy: z
      .object({
        adminId: z.string().optional(),
        name_en: z.string().optional(),
        name_cn: z.string().optional(),
        email: z.string().optional()
      })
      .optional()
  })
})

const specificPortfolioZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const PortfolioValidationZodSchema = {
  createPortfolioZodSchema,
  specificPortfolioZodSchema
}

module.exports = PortfolioValidationZodSchema
