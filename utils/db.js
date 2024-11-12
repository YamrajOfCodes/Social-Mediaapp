import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://kundan:9960322509@cluster0.k4tndq4.mongodb.net/Social?retryWrites=true&w=majority&appName=Cluster0");
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;