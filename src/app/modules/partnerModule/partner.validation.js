const z = require('zod')

const createPartnerZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'Partner english name is required!'
    }),
    name_cn: z.string({
      required_error: 'Partner chinese name is required!'
    }),
  })
})

const specificPartnerZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const PartnerValidationZodSchema = {
    createPartnerZodSchema,
  specificPartnerZodSchema
}

module.exports = PartnerValidationZodSchema
