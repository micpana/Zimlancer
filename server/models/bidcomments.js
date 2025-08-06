import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const BidCommentsSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    sellerid: {
        type: String,
        required: true
    },
    bidid: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    datelisted: {
        type: String,
        required: true
    }
});
export default mongoose.model('bidcomments', BidCommentsSchema);