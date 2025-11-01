import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet; 