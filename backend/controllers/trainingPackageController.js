import asyncHandler from "../middleware/asyncHandler.js";
import TrainingPackage from "../models/trainingPackageModel.js";

// @desc    Fetch all Training Packages
// @route   GET /api/trainingpackages
// @access  Public
const getTrainingPackages = asyncHandler(async (req, res) => {
  const trainingPackages = await TrainingPackage.find({});
  res.json(trainingPackages);
});

// @desc    Fetch last 3 training packages
// @route   GET /api/trainingpackages/latest
// @access  Public
const getLatestTrainingPackages = asyncHandler(async (req, res) => {
  const packages = await TrainingPackage.find()
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(3); // Limit to 3 packages

  res.json(packages);
});

// @desc    Fetch package by id
// @route   GET /api/trainingpackages/:id
// @access  Public
const getPackageById = asyncHandler(async (req, res) => {
  const selectedPackage = await TrainingPackage.findById(req.params.id);

  res.json(selectedPackage);
});

const saveTrainingPackage = asyncHandler(async (req, res) => {
  const { name, price, description, image, duration,videoUrl } = req.body;
  const trainingPackage = new TrainingPackage({
    name: name,
    price: price,
    user: req.user._id,
    description: description,
    image: image,
    duration: duration,
    videoUrl:videoUrl
  });
  const createdPackage = await trainingPackage.save();
  res.status(201).json(trainingPackage);
});

const updateTrainingPackage = asyncHandler(async (req, res) => {
  const { name, price, description, image, duration ,videoUrl} = req.body;
  const trainingPackage = await TrainingPackage.findById(req.params.id);
  if (trainingPackage) {
    trainingPackage.name=name;
    trainingPackage.price=price;
    trainingPackage.user=req.user._id;
    trainingPackage.description=description;
    trainingPackage.image=image;
    trainingPackage.duration=duration;
    trainingPackage.videoUrl=videoUrl;
    const upadatedPackage = await trainingPackage.save();
    res.status(201).json(upadatedPackage);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a package
// @route   DELETE /api/trainingpackage/:id
// @access  Private/Admin
const deletePackage = asyncHandler(async (req, res) => {
  const trainingPackage = await TrainingPackage.findById(req.params.id);

  if (trainingPackage) {
    await trainingPackage.deleteOne({ _id: trainingPackage._id });
    res.json({ message: "Package removed" });
  } else {
    res.status(404);
    throw new Error("Package not found");
  }
});

export {
  getTrainingPackages,
  getLatestTrainingPackages,
  getPackageById,
  saveTrainingPackage,
  updateTrainingPackage,
  deletePackage
};
