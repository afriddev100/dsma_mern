import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js"
import trainingPackages from "./data/trainingPackages.js";
import TrainingPackage from "./models/trainingPackageModel.js";
import Enrollment from "./models/enrollmentModel.js";
import Payment from "./models/paymentModel.js";
import SystemSettings from "./models/systemSettingsModel.js";
import connectDB from "./config/db.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData= async ()=>{
    try{

    await User.deleteMany();
    await TrainingPackage.deleteMany();
    await Enrollment.deleteMany();
    await Payment.deleteMany();
    await SystemSettings.deleteMany();
    


    const createdUsers= await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleTrainingPackages=trainingPackages.map((tp)=>{
        return {...tp,user:adminUser};
    })
  //  await TrainingPackage.insertMany(sampleTrainingPackages);
    const createdTrainingPackages = await TrainingPackage.insertMany(sampleTrainingPackages);


  



    console.log('Data Imported!'.green.inverse);
    process.exit();
    }
    catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);

    }

    

}

const destroyData = async ()=>{
try{
    await User.deleteMany();
    await TrainingPackage.deleteMany();
    await Enrollment.deleteMany();
    await Payment.deleteMany();
    await SystemSettings.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();

}
catch(error){
    console.log(`${error}`.red.inverse);
    process.exit(1);

}

};

if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }
  

