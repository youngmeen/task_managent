const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// 설정 파일 로드
let config;
try {
  const configData = fs.readFileSync('./config.json', 'utf8');
  config = JSON.parse(configData);
  console.log('설정 파일을 성공적으로 로드했습니다.');
} catch (err) {
  console.error('설정 파일 로드 오류:', err);
  config = {
    useDatabase: false,
    useSampleData: true,
    serverPort: 3000,
    apiBasePath: '/api'
  };
  console.log('기본 설정을 사용합니다.');
}

const app = express();
const PORT = process.env.PORT || config.serverPort || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 데이터베이스 연결 또는 샘플 데이터 사용
if (config.useDatabase) {
  // MongoDB 연결
  const dbUri = process.env.MONGODB_URI || config.databaseConfig.uri;
  mongoose.connect(dbUri, config.databaseConfig.options)
    .then(() => console.log('MongoDB 연결 성공'))
    .catch(err => console.error('MongoDB 연결 실패:', err));
  
  // API 라우트 설정
  app.use(`${config.apiBasePath}/tasks`, require('./routes/tasks'));
} else {
  console.log('샘플 데이터를 사용합니다.');
  
  // 샘플 데이터 API 라우트 - JSON 파일 직접 사용
  app.get(`${config.apiBasePath}/tasks`, (req, res) => {
    try {
      const tasksData = fs.readFileSync(path.join(__dirname, 'src/data/tasks.json'), 'utf8');
      const tasks = JSON.parse(tasksData);
      res.json(tasks);
    } catch (err) {
      console.error('샘플 데이터 로드 오류:', err);
      res.status(500).json({ error: '샘플 데이터를 로드할 수 없습니다.' });
    }
  });
  
  app.get(`${config.apiBasePath}/projects`, (req, res) => {
    try {
      const projectsData = fs.readFileSync(path.join(__dirname, 'src/data/projects.json'), 'utf8');
      const projects = JSON.parse(projectsData);
      res.json(projects);
    } catch (err) {
      console.error('샘플 데이터 로드 오류:', err);
      res.status(500).json({ error: '샘플 데이터를 로드할 수 없습니다.' });
    }
  });
  
  app.get(`${config.apiBasePath}/calendar`, (req, res) => {
    try {
      const calendarData = fs.readFileSync(path.join(__dirname, 'src/data/calendar.json'), 'utf8');
      const events = JSON.parse(calendarData);
      res.json(events);
    } catch (err) {
      console.error('샘플 데이터 로드 오류:', err);
      res.status(500).json({ error: '샘플 데이터를 로드할 수 없습니다.' });
    }
  });
  
  // 사용자 샘플 데이터
  app.get(`${config.apiBasePath}/user`, (req, res) => {
    res.json({
      id: 1,
      username: 'test',
      name: '김영민',
      email: 'test@example.com',
      position: '프로젝트 매니저',
      department: '개발팀',
      joinDate: '2023-01-15',
      profileImage: '/assets/profile.jpg'
    });
  });
  
  // 간단한 CRUD 기능 제공
  let nextId = 16; // 샘플 데이터의 마지막 ID 다음부터 시작
  
  // 태스크 생성
  app.post(`${config.apiBasePath}/tasks`, (req, res) => {
    try {
      const tasksData = fs.readFileSync(path.join(__dirname, 'src/data/tasks.json'), 'utf8');
      const tasks = JSON.parse(tasksData);
      
      const newTask = {
        id: nextId++,
        ...req.body,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      tasks.push(newTask);
      
      fs.writeFileSync(path.join(__dirname, 'src/data/tasks.json'), JSON.stringify(tasks, null, 2));
      
      res.status(201).json(newTask);
    } catch (err) {
      console.error('태스크 생성 오류:', err);
      res.status(500).json({ error: '태스크를 생성할 수 없습니다.' });
    }
  });
  
  // 태스크 수정
  app.put(`${config.apiBasePath}/tasks/:id`, (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const tasksData = fs.readFileSync(path.join(__dirname, 'src/data/tasks.json'), 'utf8');
      const tasks = JSON.parse(tasksData);
      
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      
      if (taskIndex === -1) {
        return res.status(404).json({ error: '태스크를 찾을 수 없습니다.' });
      }
      
      const updatedTask = {
        ...tasks[taskIndex],
        ...req.body,
        id: taskId, // ID는 변경되지 않도록 보장
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      tasks[taskIndex] = updatedTask;
      
      fs.writeFileSync(path.join(__dirname, 'src/data/tasks.json'), JSON.stringify(tasks, null, 2));
      
      res.json(updatedTask);
    } catch (err) {
      console.error('태스크 수정 오류:', err);
      res.status(500).json({ error: '태스크를 수정할 수 없습니다.' });
    }
  });
  
  // 태스크 삭제
  app.delete(`${config.apiBasePath}/tasks/:id`, (req, res) => {
    try {
      const taskId = parseInt(req.params.id);
      const tasksData = fs.readFileSync(path.join(__dirname, 'src/data/tasks.json'), 'utf8');
      const tasks = JSON.parse(tasksData);
      
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      
      if (filteredTasks.length === tasks.length) {
        return res.status(404).json({ error: '태스크를 찾을 수 없습니다.' });
      }
      
      fs.writeFileSync(path.join(__dirname, 'src/data/tasks.json'), JSON.stringify(filteredTasks, null, 2));
      
      res.json({ message: '태스크가 삭제되었습니다.' });
    } catch (err) {
      console.error('태스크 삭제 오류:', err);
      res.status(500).json({ error: '태스크를 삭제할 수 없습니다.' });
    }
  });
}

// 개발 환경에서는 React 개발 서버에서 처리
if (process.env.NODE_ENV === 'production') {
  // 정적 파일 제공
  app.use(express.static('build'));

  // 모든 라우트를 React 앱으로 리디렉션
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
} else {
  // 개발 환경에서는 API 라우트만 처리하고, 나머지는 React 개발 서버가 처리
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Task Management API Server is running',
      mode: config.useDatabase ? 'MongoDB' : 'Sample Data',
      endpoints: [
        `${config.apiBasePath}/tasks`,
        `${config.apiBasePath}/projects`,
        `${config.apiBasePath}/calendar`,
        `${config.apiBasePath}/user`
      ]
    });
  });
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`데이터 모드: ${config.useDatabase ? 'MongoDB' : '샘플 데이터'}`);
});
