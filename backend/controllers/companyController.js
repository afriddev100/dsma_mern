import asyncHandler from "../middleware/asyncHandler.js";
import Company from "../models/companyModel.js";

// @desc    Fetch the only company document
// @route   GET /api/company
// @access  Public
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findOne(); // Fetch the first and only document

  if (company) {
    res.json(company);
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});

// @desc    Update the company document
// @route   PUT /api/company
// @access  Private/Admin
const updateCompany = asyncHandler(async (req, res) => {
  const { name, logo } = req.body;

  const company = await Company.findOne(); // Find the first and only document

  if (company) {
    company.name = name || company.name;
    company.logo = logo || company.logo;

    const updatedCompany = await company.save();
    res.json(updatedCompany);
  } else {
    res.status(404);
    throw new Error("Company not found");
  }
});

export { getCompany, updateCompany };
