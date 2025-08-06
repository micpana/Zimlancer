import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    emailaddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepicturepath: {
        type: String
    },
    datejoined: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    skills: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    balance: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateofbirth: {
        type: String,
        required: true
    },
    newsletter: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true
    },
    responsetime:{
        type: Number
    }
});
export default mongoose.model('user', UserSchema);