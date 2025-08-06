import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const WithdrawalHistorySchema = new Schema({
userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    withdrawalmethod: {
        type: String,
        required: true
    }
});
export default mongoose.model('withdrawalhistory', WithdrawalHistorySchema);