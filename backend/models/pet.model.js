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
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    adoptionInfo: {
        phone: {
            type: String,
            default: null
        },
        address: {
            type: String,
            default: null
        },
        adoptionDate: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
});

const Pet = mongoose.model('Pet', petSchema);
export default Pet; 