import asyncHandler from "../middleware/asyncHandler.js";
import Resource from "../models/resourceModel.js";



// @desc    Fetch all resource
// @route   GET /api/resource/random
// @access  Public
const getAllResources= asyncHandler(async (req, res) => {
    const resources = await Resource.find({});
    res.json(resources);
});





// @desc    Fetch resource by id
// @route   GET /api/trainingpackages/:id
// @access  Public
const getResourceById = asyncHandler(async (req, res) => {
    const selectedResource = await Resource.findById(req.params.id);
  
    res.json(selectedResource);
  });

// @desc    Create a new resource
// @route   POST /api/resource
// @access  Private/Admin
const saveResource = asyncHandler(async (req, res) => {
    const { name, file, description } = req.body;
    const newResource = new Resource({
        name,
        file,
        description
    });
    const createdResource = await newResource.save();
    res.status(201).json(createdResource);
});

// @desc    Update a resource
// @route   PUT /api/resource/:id
// @access  Private/Admin
const updateResource = asyncHandler(async (req, res) => {
    const { name, file, description } = req.body;
    const resourceToUpdate = await Resource.findById(req.params.id);
    
    if (resourceToUpdate) {
        resourceToUpdate.name = name;
        resourceToUpdate.file = file;
        resourceToUpdate.description = description;
        
        const updatedResource = await resourceToUpdate.save();
        res.status(200).json(updatedResource);
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

// @desc    Delete a resource
// @route   DELETE /api/resource/:id
// @access  Private/Admin
const deleteResource = asyncHandler(async (req, res) => {
    const resourceToDelete = await Resource.findById(req.params.id);

    if (resourceToDelete) {
        await resourceToDelete.deleteOne({ _id: resourceToDelete._id });
        res.json({ message: "Resource removed" });
    } else {
        res.status(404);
        throw new Error("Resource not found");
    }
});

export {
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource,
    saveResource
};
