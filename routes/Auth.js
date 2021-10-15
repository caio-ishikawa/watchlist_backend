const express           = require('express');
const router            = express.Router();
const User              = require('../models/User');
const Folder            = require('../models/Folder');
const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const cookieParser      = require('cookie-parser');


// REGISTER //
router.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // CHECKING FOR USERNAME AND EMAIL //
    const usernameExists = await User.findOne({ username: username});
    const emailExists = await User.findOne({ email: email });

    if ( usernameExists) {
        res.json({"message": "Username/Email already exists."});
    }

    // HASHING PASSWORD // 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // USER CREATION //
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    const folderName = username + "'s Folder";

    const userFolder = new Folder({
        email: email,
        name: folderName,
    })

    try {
        const savedUser = await user.save();
        const savedFolder = await userFolder.save();
        res.send(savedUser);
    } catch(err) {
        res.send(err);
    }

});

// LOGIN //
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });
    if (!user) {
        res.send("Username does not exist.");
    } else {
        console.log(user.password);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    const validUsername = await User.findOne({ username: username });

    if (!validPassword) {
        res.send("Invalid password.");
    }
    if (!validUsername) {
        res.send("Invalid username.")
    }

    const token = jwt.sign({_id: user._id}, 'testKey');
    res.cookie('jwtCookie', token, {
        httpOnly: true
    });

    res.send(user);


});


module.exports = router;
