const router            = require('express').Router();
const mongoose          = require('mongoose');
const Folder            = require('../models/Folder');
const User              = require('../models/User');

router.post('/add', async (req, res) => {
    const email = req.body.email;
    const movie = req.body.movie;
    const folderName = req.body.file_name;

    const user = await User.findOne({ email: email });
    const folder = await Folder.findOne({ email: email, name: folderName });

    if (!folder.movies.includes(movie)) {
        folder.movies.push(movie);
    }

    try {
        const saved = await folder.save();
        res.send(folder);
    } catch(err) {
        res.send(err);
    }

});

router.post('/get_folders', async (req, res) => {
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    const email = user.email;


    const folder = await Folder.find({ email: email });
    res.send(folder);
})

module.exports = router;