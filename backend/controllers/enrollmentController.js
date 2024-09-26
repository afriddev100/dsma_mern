import asyncHandler from "../middleware/asyncHandler.js";
import Counter from "../models/counterModel.js";
import Enrollment from "../models/enrollmentModel.js";
import TrainingPackage from "../models/trainingPackageModel.js";


const generateRegistrationNo = async () => {
    const counter = await Counter.findOneAndUpdate(
      { id: 'enrollment' }, // Change 'name' to 'id'
      { $inc: { seq: 1 } }, // Increment the sequence
      { new: true, upsert: true }
    );
  
    return counter.seq; // Return the updated sequence value
  };
  
  

// @desc    Fetch all Enrollments
// @route   GET /api/enrollments
// @access  Public
const getEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({}).populate('trainingPackage', 'name price');
  res.json(enrollments);
});


// @desc    Fetch enrollment by id
// @route   GET /api/enrollments/:id
// @access  Public
const getEnrollmentById = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id).populate('trainingPackage', 'name price');

  if (enrollment) {
    res.json(enrollment);
  } else {
    res.status(404);
    throw new Error('Enrollment not found');
  }
});

// @desc    Save a new enrollment
// @route   POST /api/enrollments
// @access  Public
const saveEnrollment = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    dob,
    phone,
    email,
    address,
    trainingPackage,
    startDate,
    preferredTime,
  } = req.body;


  const registrationNo = await generateRegistrationNo();

  const trainingPackageOb=await TrainingPackage.findById(trainingPackage);

  const enrollment = new Enrollment({
    registrationNo,
    firstName,
    lastName,
    gender,
    dob,
    phone,
    email,
    address,
    trainingPackage,
    startDate,
    preferredTime,
    status:'Pending',
    balance:trainingPackageOb.price
  });

  const createdEnrollment = await enrollment.save();
  res.status(201).json(createdEnrollment);
});

// @desc    Update enrollment by id
// @route   PUT /api/enrollments/:id
// @access  Public
const updateEnrollmentStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['Verified', 'In-Session', 'Completed', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const enrollment = await Enrollment.findById(req.params.id);
  
  if (enrollment) {
    enrollment.status = status;
    const updatedEnrollment = await enrollment.save();
    res.json(updatedEnrollment);
  } else {
    res.status(404);
    throw new Error('Enrollment not found');
  }
});

// @desc    Delete an enrollment
// @route   DELETE /api/enrollments/:id
// @access  Public
const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (enrollment) {
    await enrollment.deleteOne({ _id: enrollment._id });
    res.json({ message: "Enrollment removed" });
  } else {
    res.status(404);
    throw new Error('Enrollment not found');
  }
});


// @desc    Check enrollment status by registrationNo, phone, or email
// @route   GET /api/enrollments/status
// @access  Public
const checkEnrollmentStatus = asyncHandler(async (req, res) => {
  const identifier  = req.params.identifier;

  if (!identifier) {
    res.status(400);
    throw new Error('Please provide a registration number, phone number, or email to check status');
  }

  // Build the query object based on the identifier type
  const query = {};

  if (/^\d{10}$/.test(identifier)) { // Example regex for a 10-digit phone number
    query.phone = identifier;
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) { // Basic email regex
    query.email = identifier;
  } else {
    query.registrationNo = identifier; // Treat as registration number
  }

  // Fetch enrollments that match the query
  const enrollments = await Enrollment.find(query).populate('trainingPackage', 'name');

  if (enrollments.length > 0) {
    // Return enrollment details with registrationNo, training package name, and status
    const enrollmentDetails = enrollments.map(enrollment => ({
      registrationNo: enrollment.registrationNo,
      trainingPackageName: enrollment.trainingPackage.name,
      status: enrollment.status
    }));

    res.json(enrollmentDetails);
  } else {
    res.status(404);
    throw new Error('No enrollments found with the provided information');
  }
});



export {
  getEnrollments,
  getEnrollmentById,
  saveEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  checkEnrollmentStatus
};
