import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one profile per customer
    },
    profilePicture: { 
        type: String,
        default: "" 
    },
    phoneNumber: { 
        type: String,
        default: "" 
    },
    address: { 
        type: String,
        default: "" 
    },
    bio: { 
        type: String,
        default: "" 
    },
}, {
    timestamps: true,
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;