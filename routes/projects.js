const { Project, validate, create } = require('../models/project');
const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const projects = await Project.find();

    res.send({ message: "success", projects: projects });
}));


router.get('/:name', asyncHandler(async(req, res) => {
    const projectName = decodeURI(req.params.name)
    const project = await Project.findOne({ title: projectName });

    res.send({ message: "success", project: project });
}));


router.post('/', asyncHandler(async(req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const project = create(req.body);
    const dbSave = await project.save();

    res.send({ message: "success", projects: dbSave });
}));

module.exports = router;