import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const PurchaseHistorySchema = new Schema({
serviceid: {
        type: String,
        required: true
    },
    servicename: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    price: {
        type: Number,
        required: true   
    },
    date: {
        type: String,
        required: true
    },
    paymentmethod: {
        type: String,
        required: true
    },
    sellerid: {
        type: String,
        required: true
    },
    sellername: {
        type: String
    },
    maincategory: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    }, 
    completed: {
        type: String,
        required: true
    },
    datecompleted:{
        type: String
    }

});
export default mongoose.model('purchasehistory', PurchaseHistorySchema);