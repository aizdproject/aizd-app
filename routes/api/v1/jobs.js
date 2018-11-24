//5bf3879ed887671f008c3195

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
}));

const Job = require('../../../models/Job');
const User = require('../../../models/User');

router.get('/', (req, res) => {
    Job.find()
        .sort({
            date: -1
        })
        .then(jobs => res.json(jobs));
});

router.get('/:id', (req, res) => {
    Job.findById(req.params.id)
        .then(job => res.json(job));
});

router.post('/', (req, res) => {
    const newJob = new Job({
        name: req.body.name,
        duration: req.body.duration
    });

    newJob.save().then(job => res.json(job));

    User.findById(req.body.user_id)
        .then(user => {
            user.jobs.push(newJob);
            user.save();
        });
})

router.delete('/:id', (req, res) => {
    Job.findById(req.params.id)
        .then(job => job.remove()
            .then(() => res.json({
                success: true
            })))
        .catch(err => res.status(404).json({
            success: false
        }))
})

module.exports = router;