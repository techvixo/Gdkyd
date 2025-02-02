const z = require('zod')

const createOurTeamZodSchema = z.object({
  body: z.object({
    name_en: z.string({
      required_error: 'Team member english name is required!'
    }),
    name_cn: z.string({
      required_error: 'Team member chinese name is required!'
    }),
    role: z.string({
      required_error: 'Team member role is required!'
    }),
    experience_en: z.string({
      required_error: 'Team member experience_en is required!'
    }),
    experience_cn: z.string({
      required_error: 'Team member experience_cn is required!'
    }),
    address_en: z.string({
      required_error: 'Team member address_en is required!'
    }),
    address_cn: z.string({
      required_error: 'Team member address_cn is required!'
    }),
    university_en: z.string({
      required_error: 'Team member university_en is required!'
    }),
    university_cn: z.string({
      required_error: 'Team member university_cn is required!'
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

const specificOurTeamZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: 'id is missing in request params!'
    })
  })
})

const OurTeamValidationZodSchema = {
  createOurTeamZodSchema,
  specificOurTeamZodSchema
}

module.exports = OurTeamValidationZodSchema
