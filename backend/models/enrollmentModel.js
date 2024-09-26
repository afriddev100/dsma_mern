import mongoose from "mongoose";

const enrollmentSchema= new mongoose.Schema({
 
    registrationNo:{
        type:Number,
        required:true,
        unique: true

    },
    firstName:{
        type:String,
        required:true

    },
    
    lastName:{
        type:String,
        required:true

    },
    gender:{
        type:String,
        required:true

    },
    dob:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    trainingPackage:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"TrainingPackage"
    },
    startDate:{
        type:String,
        required:false
    },
    preferredTime:{
        type:String,
        required:false
    },
    status:{
       type:String,
       required:false 
    },
    balance:{
        type:Number,
        required:true,
        unique: true

    }

},{timestamps:true

});

const Enrollment=mongoose.model("Enrollment",enrollmentSchema);

export default Enrollment;