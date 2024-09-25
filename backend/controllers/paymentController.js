import asyncHandler from "../middleware/asyncHandler.js";
import Payment from "../models/paymentModel.js";
import Enrollment from "../models/enrollmentModel.js";

// @desc    Get all payments for an enrollment
// @route   GET /api/payments/enrollment/:enrollmentId
// @access  Public
const getPaymentsByEnrollment = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ enrollment: req.params.enrollmentId });
  
 
  res.json(payments);
});

// @desc    Add a payment for an enrollment
// @route   POST /api/payments
// @access  Public
const addPayment = asyncHandler(async (req, res) => {
  const { enrollmentId, amount, remarks } = req.body;

  // Find the enrollment
  const enrollment = await Enrollment.findById(enrollmentId).populate('trainingPackage');
  
  if (!enrollment) {
    res.status(404);
    throw new Error("Enrollment not found");
  }

  // Check the total balance remaining
  const lastPayment = await Payment.findOne({ enrollment: enrollmentId }).sort({ createdAt: -1 });

  let currentBalance=enrollment.balance-amount;
 
  // Ensure balance is not less than 0
  if (currentBalance < 0) {
    res.status(400);
    throw new Error("Paid amount exceeds the remaining balance");
  }

  // If balance is 0, no further payments can be made
  if (enrollment.balance === 0 && lastPayment) {
    res.status(400);
    throw new Error("Enrollment already fully paid");
  }

  // Create the payment
  const payment = new Payment({
    enrollment: enrollmentId,
    paidAmount:amount,
    remarks,
    balance:currentBalance,
    dateTime: new Date().toISOString(),
  });
  enrollment.balance=currentBalance;
  const updatedEnrollment = await enrollment.save();
  const createdPayment = await payment.save();

  res.status(201).json(createdPayment);
});

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Private/Admin
const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);


  if (payment) {
    const enrollment=await Enrollment.findById(payment.enrollment);
    enrollment.balance=enrollment.balance+payment.paidAmount;
    await enrollment.save();

    await payment.deleteOne();
    res.json({ message: "Payment removed" });
  } else {
    res.status(404);
    throw new Error("Payment not found");
  }
});

// @desc    Check if an enrollment has outstanding balance
// @route   GET /api/payments/enrollment/:enrollmentId/outstanding
// @access  Public
const getOutstandingBalance = asyncHandler(async (req, res) => {
  const lastPayment = await Payment.findOne({ enrollment: req.params.enrollmentId }).sort({ createdAt: -1 });

  if (!lastPayment) {
    // No payments made yet, balance is the total price of the enrollment package
    const enrollment = await Enrollment.findById(req.params.enrollmentId).populate('trainingPackage');
    const outstandingBalance = enrollment.trainingPackage.price;
    res.json({ outstandingBalance });
  } else {
    // Return the last recorded balance
    res.json({ outstandingBalance: lastPayment.balance });
  }
});

export {
  getPaymentsByEnrollment,
  addPayment,
  deletePayment,
  getOutstandingBalance
};
