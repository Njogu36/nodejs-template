const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
first_name:String,
last_name:String,
email:String,
type:String,
password:String
});
const User = mongoose.model('User',userSchema);
module.exports = User;