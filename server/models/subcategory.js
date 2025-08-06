import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const SubCategorySchema = new Schema({
    subcategory: {
        type: String,
        required: true
    },
    parentcategory: {
        type: String,
        required: true
    }
});
export default mongoose.model('subcategory', SubCategorySchema);