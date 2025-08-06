import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ServiceReviewSchema = new Schema({
serviceid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    sellerid: {
        type: String
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
    
});
export default mongoose.model('servicereview', ServiceReviewSchema);