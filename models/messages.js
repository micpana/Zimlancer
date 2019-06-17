import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const MessagesSchema = new Schema({
sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    filepath1: {
        type: String,
    },
    filepath2: {
        type: String,
    },
    filepath3: {
        type: String,
    },
    read: {
        type: String,
        required: true
    }

});
export default mongoose.model('messages', MessagesSchema);