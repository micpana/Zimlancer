import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const InterestsSchema = new Schema({
userid: {
        type: String
    },
    maincategory: {
        type: String,
        required: true
    },
    subcategory: {
        type: String
    },
    date: {
        type: String,
        required: true
    },
    serviceid: {
        type: String
    },
    sellerid: {
        type: String
    }
});
export default mongoose.model('interests', InterestsSchema);