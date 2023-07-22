const Question = require("../models/questionModel");
const Category = require("../models/categoryModel");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("category");
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const question = req.body.question;
    const answer = req.body.answer;
    const newQuestion = new Question({ category, question, answer });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    if (error.message.startsWith("E11000")) {
      return res.status(400).json({ error: "Question already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const question = req.body.question;
    const answer = req.body.answer;
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { category, question, answer },
      { new: true }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate(
      "category"
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionsByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const questions = await Question.find({ category: req.params.id });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionsCategoryWise = async (req, res) => {
  try {
    const categories = await Category.find();
    const questions = await Question.find().populate("category");
    const categoryWiseQuestions = [];
    categories.forEach((category) => {
      const categoryQuestions = questions.filter(
        (question) => question.category.category === category.category
      );
      categoryWiseQuestions.push({
        category: category.category,
        questions: categoryQuestions,
      });
    });
    res.status(200).json(categoryWiseQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
