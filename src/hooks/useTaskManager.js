import { useState, useCallback } from 'react';
import { tasks as initialTasks } from '../data/tasksData';
import { createTask, updateTask } from '../utils/taskUtils';
import { getSessionStorage, setSessionStorage } from '../utils/storageUtils';

/**
 * 업무 관리 로직을 위한 커스텀 훅
 * @returns {Object} 업무 관련 상태 및 함수들
 */
const useTaskManager = () => {
  // 로컬 스토리지에서 업무 목록 불러오기 (없으면 초기 데이터 사용)
  const [tasks, setTasks] = useState(() => {
    const storedTasks = getSessionStorage('tasks');
    return storedTasks || initialTasks;
  });
  
  // 현재 선택된 업무
  const [selectedTask, setSelectedTask] = useState(null);
  
  /**
   * 새 업무 추가
   * @param {Object} taskData - 추가할 업무 데이터
   * @param {string} assignee - 담당자
   * @returns {Object} 생성된 업무 객체
   */
  const addTask = useCallback((taskData, assignee) => {
    const newTask = createTask(taskData, assignee);
    const updatedTasks = [...tasks, newTask];
    
    setTasks(updatedTasks);
    setSessionStorage('tasks', updatedTasks);
    
    return newTask;
  }, [tasks]);
  
  /**
   * 업무 수정
   * @param {Object} taskData - 수정할 업무 데이터
   * @returns {Object} 수정된 업무 객체
   */
  const updateTaskData = useCallback((taskData) => {
    const updatedTask = {
      ...taskData, 
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedTasks = updateTask(tasks, updatedTask);
    
    setTasks(updatedTasks);
    setSessionStorage('tasks', updatedTasks);
    
    return updatedTask;
  }, [tasks]);
  
  /**
   * 업무 삭제
   * @param {number} taskId - 삭제할 업무 ID
   */
  const deleteTask = useCallback((taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    
    setTasks(updatedTasks);
    setSessionStorage('tasks', updatedTasks);
  }, [tasks]);
  
  /**
   * 업무 상태 변경
   * @param {number} taskId - 업무 ID
   * @param {string} newStatus - 새 상태
   */
  const changeTaskStatus = useCallback((taskId, newStatus) => {
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
      const updatedTask = {
        ...task,
        status: newStatus,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      
      const updatedTasks = updateTask(tasks, updatedTask);
      
      setTasks(updatedTasks);
      setSessionStorage('tasks', updatedTasks);
    }
  }, [tasks]);
  
  /**
   * 태스크 선택
   * @param {Object|null} task - 선택할 태스크 객체 또는 null
   */
  const selectTask = useCallback((task) => {
    setSelectedTask(task);
  }, []);
  
  /**
   * 태스크 저장 처리 (새 태스크 또는 수정)
   * @param {Object} taskData - 태스크 데이터
   * @returns {Object} 저장된 태스크 객체
   */
  const saveTask = useCallback((taskData) => {
    if (selectedTask) {
      // 기존 태스크 수정
      return updateTaskData(taskData);
    } else {
      // 새 태스크 추가
      return addTask(taskData);
    }
  }, [selectedTask, addTask, updateTaskData]);
  
  return {
    tasks,
    selectedTask,
    addTask,
    updateTaskData,
    deleteTask,
    changeTaskStatus,
    selectTask,
    saveTask
  };
};

export default useTaskManager;