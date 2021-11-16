const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const workoutsRouter = require('./routes/workouts');

app.use('/api/exercises', exercisesRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/workouts', workoutsRouter);

// ----- DB setup -------------
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});
// ----- End of DB setup ------

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});