import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  
  receiverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

   appointmentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Appointment",
    required:true,
  },

  message:{ 
    type: String, 
    required: true 
  },
  
  type:{ 
    type: String, 
    default: "appointment" 
},

  read:{ 
    type: Boolean, 
    default: false 
},
  
},
  
{timestamps: true }

);

export default mongoose.model("Notification", notificationSchema);
