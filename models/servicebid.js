import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ServiceBidSchema = new Schema({
name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    payout: {
        type: Number,
        required: true
    },
    expectedcompletiontime: {
        type: Number,
        required: true
    },
    numberofbids: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maincategory: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true
    },
    datelisted: {
        type: String,
        required: true
    },
    expirationdate:{
        type: String,
        required: true
    },
    typeofdelivery: {
        type: String,
        required: true
    },
    bidimage: {
        type: String,
        required: true
    },
    wonby: {
        type: String 
    }
});
export default mongoose.model('servicebid', ServiceBidSchema);