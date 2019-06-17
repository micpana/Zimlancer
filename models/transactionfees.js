import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const TransactionFeesSchema = new Schema({
fixedamount: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});
export default mongoose.model('transactionfees', TransactionFeesSchema);