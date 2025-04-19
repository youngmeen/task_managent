import { statusOptions, priorityOptions } from '../data/tasksData';
import { getTodayISO, getDueStatus, getUpcomingDeadlines } from './dateUtils';

/**
 * 태스크 상태 색상 가져오기
 * @param {string} status - 상태명
 * @returns {string} 색상 코드
 */
export const getStatusColor = (status) => {
  const statusOption = statusOptions.find(option => option.name === status);
  return statusOption ? statusOption.color : '#6b7280';
};

/**
 * 우선순위 색상 가져오기
 * @param {string} priority - 우선순위명
 * @returns {string} 색상 코드
 */
export const getPriorityColor = (priority) => {
  const priorityOption = priorityOptions.find(option => option.name === priority);
  return priorityOption ? priorityOption.color : '#6b7280';
};

/**
 * 태스크 생성 함수
 * @param {Object} taskData - 태스크 데이터
 * @param {string} assignee - 담당자
 * @returns {Object} 생성된 태스크 객체
 */
export const createTask = (taskData, assignee) => {
  const now = getTodayISO();
  
  return {
    ...taskData,
    id: Date.now(),
    assignee: assignee || '김영민', // 현재 로그인한 사용자로 설정
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * 태스크 업데이트 함수
 * @param {Object} tasks - 모든 태스크 목록
 * @param {Object} updatedTask - 업데이트된 태스크 객체
 * @returns {Array} 업데이트된 태스크 목록
 */
export const updateTask = (tasks, updatedTask) => {
  return tasks.map(task => 
    task.id === updatedTask.id
      ? { ...updatedTask, updatedAt: getTodayISO() }
      : task
  );
};

/**
 * 태스크 상태별 개수 산출
 * @param {Array} tasks - 태스크 목록
 * @returns {Object} 상태별 개수
 */
export const getTaskCountsByStatus = (tasks) => {
  const counts = {
    total: tasks.length,
  };
  
  statusOptions.forEach(status => {
    counts[status.id] = tasks.filter(task => task.status === status.name).length;
  });
  
  return counts;
};

/**
 * 우선순위별 태스크 개수 산출
 * @param {Array} tasks - 태스크 목록
 * @returns {Object} 우선순위별 개수
 */
export const getTaskCountsByPriority = (tasks) => {
  const counts = {};
  
  priorityOptions.forEach(priority => {
    counts[priority.id] = tasks.filter(task => task.priority === priority.name).length;
  });
  
  return counts;
};

/**
 * 태그별 태스크 개수 산출
 * @param {Array} tasks - 태스크 목록
 * @param {Array} tagOptions - 태그 옵션 목록
 * @returns {Object} 태그별 개수
 */
export const getTaskCountsByTag = (tasks, tagOptions) => {
  const counts = {};
  
  tagOptions.forEach(tag => {
    counts[tag] = tasks.filter(task => task.tags.includes(tag)).length;
  });
  
  return counts;
};

// 마감 임박 태스크 필터링 함수는 dateUtils.js로 이동하였습니다.

/**
 * 태스크 마감 상태 확인
 * @param {Object} task - 태스크 객체
 * @returns {string} 마감 상태 ('due', 'upcoming', 'overdue', 'completed', 'normal')
 */
export const getTaskDueStatus = (task) => {
  if (!task || !task.dueDate) return 'normal';
  return getDueStatus(task.dueDate, task.status);
};