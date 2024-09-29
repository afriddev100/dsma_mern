import mongoose from "mongoose";

const systemSettingsSchema= new mongoose.Schema({

    systemName:{
        type:String,
        required:true

    },
    logo:{
        type:String,
        required:false
    },
    
    systemShortName:{
        type:String,
        required:false

    },
    welcomeContent:{
        type:String,
        required:false

    },
    aboutUs:{
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