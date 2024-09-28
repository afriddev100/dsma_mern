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



    // Map training package IDs to enrollments
    const enrollments = [
        {
          registrationNo: 6,
          firstName: "Minhas",
          lastName: "Ali",
          gender: "Male",
          dob: "1994-02-08",
          phone: "8921907083",
          email: "minhasali101@gmail.com",
          address: "Malhar, Pournami Gardens",
          trainingPackage: createdTrainingPackages[0]._id, // Use the first created training package
          startDate: "2024-09-20",
          preferredTime: "12:30",
          status: "Completed",
          balance: 0,
        },
        {
          registrationNo: 7,
          firstName: "Afrid",
          lastName: "SS",
          gender: "Male",
          dob: "2004-09-13",
          phone: "8156834053",
          email: "afrid4286@gmail.com",
          address: "sal sabil \nkandal pallippuram po",
          trainingPackage: createdTrainingPackages[1]._id, // Use the second training package
          startDate: "2024-10-11",
          preferredTime: "10:36",
          status: "Verified",
          balance: 3000,
        },
        {
          registrationNo: 8,
          firstName: "John",
          lastName: "Doe",
          gender: "Male",
          dob: "1990-05-15",
          phone: "9876543210",
          email: "john.doe@example.com",
          address: "1234 Elm Street",
          trainingPackage: createdTrainingPackages[1]._id, // Use the second training package
          startDate: "2024-11-05",
          preferredTime: "09:00",
          status: "Pending",
          balance: 5000,
        },
        {
          registrationNo: 9,
          firstName: "Jane",
          lastName: "Smith",
          gender: "Female",
          dob: "1988-03-25",
          phone: "1234567890",
          email: "jane.smith@example.com",
          address: "5678 Oak Avenue",
          trainingPackage: createdTrainingPackages[0]._id, // Use the first training package
          startDate: "2024-11-15",
          preferredTime: "14:00",
          status: "Pending",
          balance: 3000,
        },
      ];
  
      const createdEnrollments = await Enrollment.insertMany(enrollments);
  
      // Map payments to enrollments
      const payments = [
        {
          enrollment: createdEnrollments[0]._id, // Reference to the first created enrollment
          dateTime: "2024-09-25T23:38:47.214Z",
          remarks: "1st installment",
          paidAmount: 2000,
          balance: 1000,
        },
        {
          enrollment: createdEnrollments[0]._id, // Reference to the first created enrollment
          dateTime: "2024-09-25T23:57:46.964Z",
          remarks: "final settlement",
          paidAmount: 1000,
          balance: 0,
        },
        {
          enrollment: createdEnrollments[1]._id, // Reference to the second created enrollment
          dateTime: "2024-09-26T16:09:23.947Z",
          remarks: "first installment",
          paidAmount: 2000,
          balance: 3000,
        },
        {
          enrollment: createdEnrollments[2]._id, // Reference to the third created enrollment
          dateTime: "2024-11-05T10:00:00.000Z",
          remarks: "1st installment",
          paidAmount: 2500,
          balance: 2500,
        },
        {
          enrollment: createdEnrollments[3]._id, // Reference to the fourth created enrollment
          dateTime: "2024-11-15T10:00:00.000Z",
          remarks: "1st installment",
          paidAmount: 1500,
          balance: 1500,
        },
      ];
  
      await Payment.insertMany(payments);
  
  



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
  

