const z = require('zod')

const loginValidationZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required'
    }),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})

const changePasswordZodSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is missing in request params!"
    })
  }),
  body: z.object({
    oldPassword: z.string({
      required_error: "Old password is required!"
    }),
    newPassword: z.string({
      required_error: "New password is required!"
    })
  })
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refresh_token: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

const AuthValidation = {
  loginValidationZodSchema,
  changePasswordZodSchema,
  refreshTokenZodSchema
}

module.exports = AuthValidation
