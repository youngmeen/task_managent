const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// 모든 태스크 가져오기
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 특정 태스크 가져오기
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: '태스크를 찾을 수 없습니다.' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 태스크 생성하기
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 태스크 업데이트하기
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: '태스크를 찾을 수 없습니다.' });

    if (req.body.title) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.priority) task.priority = req.body.priority;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 태스크 삭제하기
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: '태스크를 찾을 수 없습니다.' });

    await task.remove();
    res.json({ message: '태스크가 삭제되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
