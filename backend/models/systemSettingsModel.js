import mongoose from "mongoose";

const systemSettingsSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    systemName:{
        type:String,
        required:true

    },
    
    systemShortName:{
        type:String,
        required:true

    },
    welcomeContent:{
        type:String,
        required:true

    },
    aboutUs:{
        type:String,
        required:true

    },
    logo:{
        type:String,
        required:false
    },
    coverImage:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    contact:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },

},{timestamps:true

});

const SystemSettings=mongoose.model("SystemSettings",systemSettingsSchema);

export default SystemSettings;