import asyncHandler from "../middleware/asyncHandler.js";
import Question from "../models/questionModel.js";



// @desc    Fetch all questions
// @route   GET /api/questions/random
// @access  Public
const getAllQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
});



// @desc    Fetch 20 random questions
// @route   GET /api/questions/random
// @access  Public
const getRandomQuestions = asyncHandler(async (req, res) => {
    const randomQuestions = await Question.aggregate([{ $sample: { size: 20 } }]);
      // Convert plain objects back to Mongoose documents
      const questions = randomQuestions.map(question => Question.hydrate(question));

    res.json(questions);
});



// @desc    Fetch question by id
// @route   GET /api/trainingpackages/:id
// @access  Public
const getQuestionById = asyncHandler(async (req, res) => {
    const selectedQuestion = await Question.findById(req.params.id);
  
    res.json(selectedQuestion);
  });

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private/Admin
const saveQuestion = asyncHandler(async (req, res) => {
    const { question, image, options, rightAnswer } = req.body;
    const newQuestion = new Question({
        question,
        image,
        options,
        rightAnswer
    });
    const createdQuestion = await newQuestion.save();
    res.status(201).json(createdQuestion);
});

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
const updateQuestion = asyncHandler(async (req, res) => {
    const { question, image, options, rightAnswer } = req.body;
    const questionToUpdate = await Question.findById(req.params.id);
    
    if (questionToUpdate) {
        questionToUpdate.question = question;
        questionToUpdate.image = image;
        questionToUpdate.options = options;
        questionToUpdate.rightAnswer = rightAnswer;
        
        const updatedQuestion = await questionToUpdate.save();
        res.status(200).json(updatedQuestion);
    } else {
        res.status(404);
        throw new Error("Question not found");
    }
});

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
const deleteQuestion = asyncHandler(async (req, res) => {
    const questionToDelete = await Question.findById(req.params.id);

    if (questionToDelete) {
        await questionToDelete.deleteOne({ _id: questionToDelete._id });
        res.json({ message: "Question removed" });
    } else {
        res.status(404);
        throw new Error("Question not found");
    }
});

export {
    getRandomQuestions,
    saveQuestion,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    getAllQuestions
};
