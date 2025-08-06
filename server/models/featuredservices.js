import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const FeaturedServicesSchema = new Schema({
serviceid: {
        type: String,
        required: true
    },
    expirationdate: {
        type: Date,
        required: true
    }, 
    datefeatured:{
        type: Date,
        required: true
    }
});
export default mongoose.model('featuredservices', FeaturedServicesSchema);