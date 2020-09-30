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


router.get('/featured/:type', asyncHandler(async(req, res) => {
    const type = String(req.params.type)
    const projects = await Project.find({ featured: type });

    res.send({ message: "success", projects: projects });
}));


router.post('/featured/:type', asyncHandler(async(req, res) => {
    const type = String(req.params.type)
    const projects = req.body

    const oldProjects = await Project.find({ featured: type });
    for (let i = 0; i < oldProjects.length; i++) {
        const title = oldProjects[i].title;
        const project = await Project.findOne({ title: title });
        if (!project) return status(400).send({ message: "project not found. unable to update featured list." });

        project.featured = "no";
        project.save()
    }

    for (let i = 0; i < projects.length; i++) {
        const title = projects[i].title;
        const project = await Project.findOne({ title: title });
        if (!project) return status(400).send({ message: "project not found. unable to update featured list." });

        project.featured = type;
        project.save()
    }
    res.send({ message: "success" });
}));


router.post('/create', asyncHandler(async(req, res) => {
    // TODO: ADD ADMIN ONLY AUTHENTICATION

    const existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) return res.send({ message: "Project with that name already exists." });

    const project = create(req.body.title);
    const dbSave = await project.save();

    res.send({ message: "success", project: dbSave });
}));


router.put('/', asyncHandler(async(req, res) => {
    // TODO: ADD ADMIN ONLY AUTHENTICATION

    const title = req.body.title
    if (!title) return res.status(400).send({ message: "Current project title is required." })

    if (title != req.body.project.title) {
        let existingTitle = await Project.findOne({ title: req.body.project.title });
        if (existingTitle) return res.status(400).send({ message: "Project with title already exists." })
    }

    const error = validate(req.body.project);
    if (error) return res.status(400).send(error.message);

    let existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) {

        existingProject.title = req.body.project.title
        existingProject.subtitle = req.body.project.subtitle
        existingProject.category = req.body.project.category
        existingProject.thumbnail = req.body.project.thumbnail
        existingProject.featured = req.body.project.featured
        existingProject.description = req.body.project.description
        existingProject.dateCreated = new Date(req.body.project.dateCreated)
        existingProject.technologies = req.body.project.technologies
        existingProject.links = req.body.project.links
        existingProject.images = req.body.project.images

        const dbSave = await existingProject.save();

        res.send({ message: "success", projects: dbSave });

    } else {
        res.send({ message: "Project does not exist." });
    }
}));


router.delete('/', asyncHandler(async(req, res) => {
    // TODO: ADD ADMIN ONLY AUTHORIZATION AND VALIDATION

    const project = await Project.findOne({ title: req.body.title });
    if (!project) return res.status(403).send('Project does not exist.');

    await Project.deleteOne({ title: req.body.title })

    res.send({ message: "success", project: project });
}));


module.exports = router;