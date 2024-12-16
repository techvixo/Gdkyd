const z = require('zod')

const createCertificateZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'Certificate english name is required!'
    }),
    name_cn: z.string({
      required_error: 'Certificate chinese name is required!'
    }),
  })
})

const specificCertificateZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const CertificateValidationZodSchema = {
    createCertificateZodSchema,
  specificCertificateZodSchema
}

module.exports = CertificateValidationZodSchema
