import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
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
    price: {
        type: Number,
        required: true
    },
    completiontime: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datelisted: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    extras1: {
        type: String
    },
    extras2: {
        type: String
    },
    extras1price: {
        type: Number
    },
    extras2price: {
        type: Number
    },
    extras1additionaltime: {
        type: Number
    },
    extras2additionaltime: {
        type: Number
    },
    imagepath1: {
        type: String,
        required: true
    },
    imagepath2: {
        type: String,
    },
    imagepath3: {
        type: String,
    },
    maincategory: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    typeofdelivery: {
        type: String,
        required: true
    }
});
export default mongoose.model('service', ServiceSchema);