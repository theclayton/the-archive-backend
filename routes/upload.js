const asyncHandler = require('express-async-handler')
const express = require('express');
const router = express.Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, admin, asyncHandler(async(req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({ message: 'No files were uploaded.' });
    }
    const file = req.files.file;
    let filename = file.name
    let path = `uploads/${filename}`

    ensureDirectoryExists()

    if (fs.existsSync(path)) {
        filename = giveFileUniqueName(1, file.name)
        path = `uploads/${filename}`
    }

    file.mv(path, function(err) {
        if (err) return res.status(500).send(err);

        res.send({ message: "success", filename: filename });
    });
}));


function ensureDirectoryExists() {
    let uploadsDir = `./uploads`;
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }
}

function giveFileUniqueName(count, filename) {
    let newName = filename.substring(0, filename.lastIndexOf(".")) + `_${count}` + filename.substring(filename.lastIndexOf("."));
    let path = `./uploads/${newName}`

    if (fs.existsSync(path)) {
        return giveFileUniqueName(count + 1, filename)
    } else {
        return newName
    }
}

module.exports = router;