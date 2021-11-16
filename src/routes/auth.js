const router = require('express').Router();
const User = require('../models/user.model');
const registerSchema = require('../schemas/register.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verify');

router.route('/register').post(async (req, res) => {

    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details[0]);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        email: req.body.email,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        hash
    });

    user.save()
        .then(() => res.json({ success: true, userId: user._id }))
        .catch(error => res.status(400).json(error));
});

router.route('/login').post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({message: 'Invalid email or password'});
        
        const validPassword = await bcrypt.compare(password, user.hash);
        if (!validPassword) return res.status(400).json({message: 'Invalid password'});
        
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({ success: true, token });
    } catch (error) {
        res.status(400).json(error)
    }
});

router.route('/private').get(verify, (req, res) => {
    res.json({
        success: true,
        prop1: 'Successful access of a private route'
    })
});

module.exports = router;