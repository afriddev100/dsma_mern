
import dotenv from "dotenv";
import initCompany from "./data/systemSettingSample.js";
import connectDB from "./config/db.js";
import Company from "./models/companyModel.js";
import colors from "colors";


dotenv.config();

connectDB();

const importData= async ()=>{
    try{



    await Company.deleteMany();
    

  //  await TrainingPackage.insertMany(sampleTrainingPackages);
    const createdCompany = await Company.insertMany(initCompany);
    console.log('Company Data Imported!'.green.inverse);
    process.exit();
    }
    catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);

    }

    

}

const destroyData = async ()=>{
try{
    await createdCompany.deleteMany();
    console.log('Company Data Destroyed!'.green.inverse);
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
  

