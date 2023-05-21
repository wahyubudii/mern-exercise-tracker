const router = require('express').Router()
let User = require('./../models/user.model')

// get all data
router.route('/').get((req, res) => {
    User.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// add new data
router.route('/add').post((req, res) => {
    const { username } = req.body

    const newuser = new User({username})

    newuser.save()
    .then(() => res.status(200).json('successfully add new users'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router