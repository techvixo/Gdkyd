// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const verificationSchema = new mongoose.Schema({
//     userId: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     code: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     expireDate: Date,
//     type: {
//         type: String,
//         enum: ["email-verification", "forget-password"]
//     },
//     status: {
//         type: String,
//         enum: ['done', 'lose']
//     },
// }, {
//     timestamps: true
// })


// verificationSchema.pre('save', function (next) {
//     if(!this.isModified('code')){
//         return next()
//     }
//     if (this.isModified('code')) {
//         const saltRounds = 10
//         this.code = bcrypt.hashSync(this.code, saltRounds)
//     }
    
//     next()
// })

// verificationSchema.statics.compareCode = async function (userPlaneCode) {
//     const verifications = await this.find({}); 

//     for (let verification of verifications) {
//         const isMatch = bcrypt.compareSync(userPlaneCode, verification.code);
//         if (isMatch) {
//             return verification;
//         }
//     }
// }

// const Verification = mongoose.model("verification", verificationSchema)

// module.exports = Verification