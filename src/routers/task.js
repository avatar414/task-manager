const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    //    const task= new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id,

    })

    try {
        await task.save();
        res.status(201).send(task);

    } catch (e) {
        res.status(400).send(e);
    }
    (typeof DEBUG !== 'undefined') ? console.log(`Debug: Create Task: ${task}`) : () => { };
});

router.get('/tasks', auth, async (req, res) => {

    try {
        ////This works too:
        //        const tasks= await Task.find({ owner : req.user._id });
        //        res.send(tasks);
        await req.user.populate('tasks').execPopulate();
        (typeof DEBUG !== 'undefined') ? console.log(`Debug: Get Tasks: ${req.user.tasks}`) : () => { };
        res.send(req.user.tasks)
    }
    catch (e) {
        res.status(500).send();
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        //        const task= await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task) {
            return res.status(404).send();
        }
        (typeof DEBUG !== 'undefined') ? console.log(`Debug: Get Task: ${task}`) : () => {};        
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid Update field' });
    }
    try {
        // const task= await Task.findByIdAndUpdate(req.params.id,req.body,
        //     { new : true, runValidators : true , useFindAndModify : false})

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        //    const task= await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save();
        (typeof DEBUG !== 'undefined') ? console.log(`Debug: Get Tasks: ${task}`) : () => { };
        res.send(task);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task= await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            return res.status(400).send({ error: "Record not found" });
        }
        (typeof DEBUG !== 'undefined') ? console.log(`Debug: Delete Task: ${task}`) : () => { };        
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;