const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true},
    middleName: { type: String, required: false},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true, match:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    dob: { type: Date, required: true},
    joinDate: { type: Date, default: Date.now},
    registerAs: { 
        category: { type: String, required: true},
        categoryId: { type: mongoose.Schema.Types.ObjectId, refPath: 'registerAs.catergory', required: true}
    },
    password: { type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);