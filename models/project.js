const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    featured: { type: String, required: true },
    description: { type: String, required: true },
    dateCreated: { type: Date, required: false },
    technologies: [{
        name: { type: String, required: false },
        src: { type: String, required: false }
    }],
    links: [{
        name: { type: String, required: false },
        type: { type: String, required: false },
        url: { type: String, required: false }
    }],
    images: [{
        name: { type: String, required: false },
        src: { type: String, required: false },
        caption: { type: String, required: false },
        width: { type: Number, required: false },
        height: { type: Number, required: false }
    }]
});

const Project = mongoose.model('Project', projectSchema);

function createProject(title) {
    const projectFromReqBody = new Project({
        title: title,
        subtitle: " ",
        category: " ",
        thumbnail: " ",
        featured: "no",
        description: " ",
        dateCreated: new Date(),
        technologies: [],
        links: [],
        images: [],
    });
    return projectFromReqBody
}

function validateProject(project) {
    let error

    if (!project.title) {
        error = { status: 400, message: 'Title is required.' }
    }
    if (!project.subtitle) {
        error = { status: 400, message: 'Subtitle is required.' }
    }
    if (!project.category) {
        error = { status: 400, message: 'Category is required.' }
    }
    if (!project.thumbnail) {
        error = { status: 400, message: 'Thumbnail is required.' }
    }
    if (!project.description) {
        error = { status: 400, message: 'Description is required.' }
    }
    if (!project.featured) {
        error = { status: 400, message: 'Featured status is required.' }
    }
    if (!project.dateCreated) {
        error = { status: 400, message: 'Date Created is required.' }
    }
    if (!project.technologies) {
        error = { status: 400, message: 'Technologies is required.' }
    }
    if (!project.links) {
        error = { status: 400, message: 'Links is required. Send empty array if no items present.' }
    }
    if (!project.images) {
        error = { status: 400, message: 'Images is required. Send empty array if no items present.' }
    }

    return error
}

exports.Project = Project;
exports.validate = validateProject;
exports.create = createProject;