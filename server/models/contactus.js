import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ContactUsSchema = new Schema({
userid: {
        type: String,
        required: true
    },
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
    phonenumber: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
export default mongoose.model('contactus', ContactUsSchema);