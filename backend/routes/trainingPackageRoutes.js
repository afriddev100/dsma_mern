import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import TrainingPackage from "../models/trainingPackageModel.js";
const router =express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const trainingPackages= await TrainingPackage.find({});
    res.json(trainingPackages);
  }));
  


  // API to fetch the last 3 training packages
// API to fetch the last 3 training packages
router.get(
    '/latest',
    asyncHandler(async (req, res) => {
      const packages = await TrainingPackage.find()
        .sort({ createdAt: -1 })  // Sort by newest first
        .limit(3);                 // Limit to 3 packages
  
      res.json(packages);           // Return the packages in JSON format
    })
  );


  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const selectedPackage = await TrainingPackage.findById(req.params.id);
  
      res.json(selectedPackage);           // Return the packages in JSON format
    })
  );


//   router.get(
//     '/:id',
//     asyncHandler(async (req, res) => {
//         console.log(req.body)
//         const trainingPackage=new TrainingPackage({
//             name:req.body.name,
//             price:req.body.price,
//             user:req.user.

//         })
//     })
//   );
  

  export default router;