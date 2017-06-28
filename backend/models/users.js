// BEFORE PASSPORT
// module.exports = function(mongoose){
//     return [{
//         username: {type: String, unique:true, required: true},
//         password: {type: String},
//         firstname: {type: String},
//         lastname: {type: String},
//         tags: [String],
//     }, {
//         timestamps: true,
//         strict: false
//     }]
// };
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {type:String, required: true, unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: {type: String, required: true, unique:true}
}, {
         timestamps: true,
         strict: false
     }
);

UserSchema.virtual('fullname').get(function () { return this.firstName + ' ' + this.lastName; })

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
