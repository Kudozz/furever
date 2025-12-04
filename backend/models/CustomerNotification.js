import mongoose from "mongoose";

const customerNotificationSchema = new mongoose.Schema({
  
  // Customer ID (references Customer model)
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  // Related entity ID (appointment, order, etc.)
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'relatedModel',
    required: false,
  },

  // Dynamic reference model
  relatedModel: {
    type: String,
    enum: ["Appointment", "Order", "Pet", "Payment"],
    required: false,
  },

  // Notification message
  message: { 
    type: String, 
    required: true 
  },
  
  // Notification type
  type: { 
    type: String, 
    default: "general",
    enum: [
      "appointment_confirmed",
      "appointment_reminder", 
      "appointment_cancelled",
      "appointment_rescheduled",
      "payment_received",
      "payment_due",
      "order_status",
      "promotional",
      "general"
    ]
  },

  // Read status
  isRead: { 
    type: Boolean, 
    default: false 
  },

  // Priority level
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  // Optional action URL
  actionUrl: {
    type: String,
    required: false
  }
  
},
  
{ timestamps: true }

);

// Index for faster queries
customerNotificationSchema.index({ customerId: 1, isRead: 1, createdAt: -1 });

export default mongoose.model("CustomerNotification", customerNotificationSchema);