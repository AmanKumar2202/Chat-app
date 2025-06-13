import {config} from "dotenv";
import { connectDB } from "../lib/db.js";  
import User from "../models/user.model.js"
config();
const seedUsers = [
    //Chat Bot
    {
      _id: "bot_user_id",
      fullName: "ChatAI",
      email: "ai@chatapp.com",
      isBot: true,
      // profilePic: "https://yourcdn.com/ai-avatar.png"
      profilePic: "https://www.google.com/imgres?q=ai%20robot%20image%20for%20profile%20pic&imgurl=https%3A%2F%2Fimgcdn.stablediffusionweb.com%2F2024%2F6%2F12%2F0d2807f6-64c3-402b-ba4f-d92c6cf29bd7.jpg&imgrefurl=https%3A%2F%2Fstablediffusionweb.com%2Fimage%2F9290851-purple-ai-robot-profile-picture&docid=IqvcMjUFb82lUM&tbnid=d7Yu3lnEshiztM&vet=12ahUKEwjxl_fn0KONAxVlafUHHRjVGdUQM3oECGYQAA..i&w=1024&h=1024&hcb=2&ved=2ahUKEwjxl_fn0KONAxVlafUHHRjVGdUQM3oECGYQAA"
    },
    // Female Users
    {
      email: "emma.thompson@example.com",
      fullName: "Emma Thompson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      email: "olivia.miller@example.com",
      fullName: "Olivia Miller",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      email: "sophia.davis@example.com",
      fullName: "Sophia Davis",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      email: "ava.wilson@example.com",
      fullName: "Ava Wilson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      email: "isabella.brown@example.com",
      fullName: "Isabella Brown",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      email: "mia.johnson@example.com",
      fullName: "Mia Johnson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      email: "charlotte.williams@example.com",
      fullName: "Charlotte Williams",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      email: "amelia.garcia@example.com",
      fullName: "Amelia Garcia",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  
    // Male Users
    {
      email: "james.anderson@example.com",
      fullName: "James Anderson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      email: "william.clark@example.com",
      fullName: "William Clark",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "benjamin.taylor@example.com",
      fullName: "Benjamin Taylor",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "lucas.moore@example.com",
      fullName: "Lucas Moore",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "henry.jackson@example.com",
      fullName: "Henry Jackson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "alexander.martin@example.com",
      fullName: "Alexander Martin",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "daniel.rodriguez@example.com",
      fullName: "Daniel Rodriguez",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];
  
const seedDatabase = async () => {
    try {
      await connectDB();
  
      await User.insertMany(seedUsers);
      console.log("Database seeded successfully");
    } catch (error) {
      console.error("Error seeding database:", error);
    }

};

seedDatabase();