const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['할 일', '진행 중', '완료'],
    default: '할 일'
  },
  priority: {
    type: String,
    enum: ['낮음', '보통', '높음'],
    default: '보통'
  },
  dueDate: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', TaskSchema);
