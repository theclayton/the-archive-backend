const { Project, validate, create } = require('../models/project');
const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', asyncHandler(async(req, res) => {
    const projects = await Project.find();

    res.send({ message: "success", projects: projects });
}));


router.get('/:name', asyncHandler(async(req, res) => {
    const title = decodeURI(req.params.name)
    const project = await Project.findOne({ title: title });

    res.send({ message: "success", project: project });
}));


router.get('/unique/technologies', asyncHandler(async(req, res) => {
    const techs = await Project.distinct("technologies")
    if (!techs) return res.send({ message: "No technologies found." });

    let clean = techs.map(tech => {
        return { name: tech.name, src: tech.src }
    })

    let unique = clean.filter((thing, index, self) =>
        index === self.findIndex((t) => (
            t.name === thing.name && t.src === thing.src
        ))
    )
    res.send({ message: "success", techs: unique });
}));


router.get('/recent/projects', asyncHandler(async(req, res) => {
    const projects = await Project.find()
    if (!projects) return res.send({ message: "No Projects found." });

    let recent = projects.sort((a, b) => b.dateCreated - a.dateCreated).slice(0, 10)

    res.send({ message: "success", projects: recent });
}));


router.get('/featured/:type', asyncHandler(async(req, res) => {
    const type = String(decodeURI(req.params.type));
    const projects = await Project.find({ featured: type });

    res.send({ message: "success", projects: projects });
}));


router.post('/featured/:type', auth, admin, asyncHandler(async(req, res) => {
    const type = String(decodeURI(req.params.type));
    const projects = req.body;

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


router.post('/create', auth, admin, asyncHandler(async(req, res) => {
    const existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) return res.send({ message: "Project with that name already exists." });

    const project = create(req.body.title);
    const dbSave = await project.save();

    res.send({ message: "success", project: dbSave });
}));


router.put('/', auth, admin, asyncHandler(async(req, res) => {
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

        res.send({ message: "success", project: dbSave });

    } else {
        res.send({ message: "Project does not exist." });
    }
}));


router.delete('/delete/:title', auth, admin, asyncHandler(async(req, res) => {
    const title = String(decodeURI(req.params.title));

    const project = await Project.findOne({ title: title });
    if (!project) return res.status(403).send({ message: 'Project does not exist.' });

    await Project.deleteOne({ title: title });

    res.send({ message: "success" });
}));


module.exports = router;