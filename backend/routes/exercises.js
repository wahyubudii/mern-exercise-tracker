const router = require('express').Router()
let Exercise = require('../models/exercise.model')

// get all data
router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercise => res.status(200).json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})

// get spesific data
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then((exercise) => res.status(200).json(exercise))
    .catch(err => res.status(400).json('Error: ' + err))
})


// add new data
router.route('/add').post((req, res) => {
    const { username, description, duration, date } = req.body

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()
    .then(() => res.status(200).json('successfully add new users'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// delete data
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('delete successfully'))
    .catch(err => res.status(400).json('Error : ' + err))
})

// edit existing data
router.route('/update/:id').put((req, res) => {
    Exercise.findByIdAndUpdate(req.params.id)
    .then((exercise) => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = req.body.duration
        exercise.date = req.body.date

        exercise.save()
        .then((exercise) => res.status(200).json({ message: 'update successfully', data: exercise }))
        .catch(err => res.status(400).json('Error : ' + err))
    })
})


module.exports = router