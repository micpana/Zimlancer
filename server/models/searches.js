import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const SearchesSchema = new Schema({
userid: {
        type: String
    },
    searchitem: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});
export default mongoose.model('searches', SearchesSchema);