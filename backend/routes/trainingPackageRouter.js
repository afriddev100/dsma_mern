import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import TrainingPackage from "../models/trainingPackageModel.js";
import {
  getTrainingPackages,
  getLatestTrainingPackages,
  getPackageById,
  saveTrainingPackage,
  updateTrainingPackage,
  deletePackage,
} from "../controllers/trainingPackageController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/")
.get(getTrainingPackages)
.post(protect,admin,saveTrainingPackage);
router.get("/latest", getLatestTrainingPackages);

router.route("/:id")
.get(checkObjectId,getPackageById)
.put(protect,admin,updateTrainingPackage)
.delete(protect,admin,checkObjectId,deletePackage)

//   router.get(
//     '/:id',
//

//         })
//     })
//   );

export default router;
