import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ReferralsSchema = new Schema({
userid: {
        type: String,
        required: true
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
export default mongoose.model('referrals', ReferralsSchema);