import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PublicForumSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});
export default mongoose.model('publicforum', PublicForumSchema);