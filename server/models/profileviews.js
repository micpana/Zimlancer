import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProfileViewsSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    viewerid: {
        type: String
    },
    date: {
        type: String,
        required: true
    }
});
export default mongoose.model('profileviews', ProfileViewsSchema);