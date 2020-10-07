const { Project } = require('../models/project');
const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, asyncHandler(async(req, res) => {
    const terms = req.query.terms

    const projects = await Project.find({ $text: { $search: terms } })

    res.send({ message: "success", projects: projects })
}));


module.exports = router;