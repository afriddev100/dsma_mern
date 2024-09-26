import mongoose from "mongoose";

const paymentSchema= new mongoose.Schema({
 
   
    enrollment:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Enrollment"
    },
    dateTime:{
        type:String,
        required:false
    },
    remarks:{
        type:String,
        required:true,
      

    },
    paidAmount:{
        type:Number,
        required:true,
      

    },
    balance:{
        type:Number,
        required:true,
        

    },

},{timestamps:true

});

const Payment=mongoose.model("Payment",paymentSchema);

export default Payment;