const mongoose = require('mongoose');
const schema = mongoose.Schema;

// Create new User Schema that shows the data that a user will have
const UserSchema = new schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateCreated: Date, 
    profilePic: String
});

// Model the User object after the schema and export the "User"
const User = mongoose.model('user', UserSchema);
exports.User = User;