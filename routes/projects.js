const { Project, validate, create } = require('../models/project');
const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const projects = await Project.find();

    res.send(projects);
}));

router.post('/', asyncHandler(async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const project = create(req.body);
    const dbSave = await project.save();

    res.send(dbSave);
}));

module.exports = router;