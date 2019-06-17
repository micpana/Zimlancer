import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const NotificationsSchema = new Schema({
userid: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    read: {
        type: String,
        required: true
    },
    href: {
        type: String
    }
});
export default mongoose.model('notifictaions', NotificationsSchema);