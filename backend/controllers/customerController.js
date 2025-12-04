import User from "../models/userModel.js";
import upload from "../middleware/uploadMiddleware.js"; 

// PUT /api/customers/update-profile/:id
export const updateCustomerProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update fields
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;

    // If image uploaded
    if (req.file) {
      customer.profilePic = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await customer.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      profilePic: updatedUser.profilePic,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
