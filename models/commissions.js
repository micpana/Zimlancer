import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CommissionsSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    transactorid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    commission: {
        type: Number,
        required: true   
    },
    serviceid: {
        type: String,
        required: true
    }

});
export default mongoose.model('commissions', CommissionsSchema);