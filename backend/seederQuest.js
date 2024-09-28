
import dotenv from "dotenv";
import sampleQuestions from "./data/questions.js";
import connectDB from "./config/db.js";
import Question from "./models/questionModel.js";
import colors from "colors";

dotenv.config();

connectDB();

const importData= async ()=>{
    try{



    await Question.deleteMany();
    

  //  await TrainingPackage.insertMany(sampleTrainingPackages);
    const createdQuestions = await Question.insertMany(sampleQuestions);
    console.log('Question Data Imported!'.green.inverse);
    process.exit();
    }
    catch(error){
        console.log(`${error}`.red.inverse);
        process.exit(1);

    }

    

}

const destroyData = async ()=>{
try{
    await Question.deleteMany();
    console.log('Question Data Destroyed!'.green.inverse);
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
  

