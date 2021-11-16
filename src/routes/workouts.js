const router = require('express').Router();
const Workout = require('../models/workout.model');
const registerSchema = require('../schemas/register.schema');
const verify = require('./verify');

// current - used now
// previous - already increased
// potential - let's see some more if it really needs to increse
// increase - will increase at the next session

router.route('/').get(verify, (req, res) => {
    res.json({
        name: 'Workout 1',
        active: true,
        workoutId: '1',
        days: [
            {
                name: 'Monday',
                groups: [
                    {
                        name: 'Chest',
                        groupId: '12',
                        exerises: [
                            {
                                name: 'Chest dumbbell press',
                                reps: '14-12-10',
                                weights: [
                                    { value: 15.00, status: 'current | previous | potential | increase' },
                                    { value: 17.50, status: 'current | previous | potential | increase' },
                                    { value: 20.00, status: 'current' },
                                ],
                                equipment: [''],
                                muscleGroup: '',
                                exerciseId: ''
                            }
                        ]
                    }
                ]
            }
        ]
    })
});

module.exports = router;