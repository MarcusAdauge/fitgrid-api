const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name:    { type: String, required: true },
    description: { type: String, required: false },
    active:    { type: Boolean, required: true },
    days: [{}]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
