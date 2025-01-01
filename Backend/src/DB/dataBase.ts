import mongoose from "mongoose";


const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;


// Creating Schemas
const userSchema=new Schema({
    username:{type:String,unique:true,required: true},
    email:{type:String,unique:true,required: true},
    password:{type:String}
},{ timestamps: true })

const contentSchema=new Schema({
    userId:{type:ObjectId,require:true},
    title:{type:String},
    content:{type:String},
    done:{type:Boolean}
} ,{ timestamps: true })

const adminSchema=new Schema({
    username:{type:String,unique:true,required: true},
    email:{type:String,unique:true,required: true},
    password:{type:String}
});


const userModel=mongoose.model("users",userSchema);
const contentModel=mongoose.model("content",contentSchema);
const adminModel=mongoose.model("admin",adminSchema);

export {userModel,contentModel,adminModel};