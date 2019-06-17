import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ReferralClicksSchema = new Schema({
userid: {
        type: String
    },
    referredby: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
export default mongoose.model('referralclicks', ReferralClicksSchema);