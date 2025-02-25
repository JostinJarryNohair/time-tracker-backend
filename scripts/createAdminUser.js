const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const adminUser = {
      username: "admin",
      password: "admin123", // This will be hashed by the User model pre-save middleware
      role: "admin",
    };

    const user = await User.create(adminUser);
    console.log("Admin user created successfully:", user.username);

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
