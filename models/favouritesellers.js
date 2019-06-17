import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FavouriteSellerSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    sellerid: {
        type: String,
        required: true
    }
});
export default mongoose.model('favouriteseller', FavouriteSellerSchema);