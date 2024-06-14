import mongoose from "mongoose";

const connectDb = handler => async (req, res)=>{
    if(mongoose.connections[0].readyState){
        return handler (req, res)
    }
    // await mongoose.connect(process.env.MONGO_URI)
    // await mongoose.connect("mongodb://localhost:27017/next-atlus")
    await mongoose.connect("mongodb+srv://nileshdeore:12501250@cluster0.qogyo0p.mongodb.net/next-atlus?retryWrites=true&w=majority&appName=Cluster0")
    
    return handler(req, res);
}

export default connectDb;