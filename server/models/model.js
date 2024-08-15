const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ModelMsg = mongoose.model('ModelMsg', modelSchema);
module.exports = ModelMsg;
