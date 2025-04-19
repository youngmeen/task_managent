import { useState, useEffect, useCallback } from 'react';
import { compareDates } from '../utils/dateUtils';

/**
 * 업무 필터링 및 정렬을 위한 커스텀 훅
 * @param {Array} tasks - 업무 목록 데이터
 * @returns {Object} 필터링 및 정렬 관련 상태와 함수들
 */
const useTaskFilters = (tasks = []) => {
  // 필터 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  
  // 정렬 상태
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // 필터링된 결과
  const [filteredTasks, setFilteredTasks] = useState([]);
  
  /**
   * 검색어 변경 핸들러
   * @param {Object} e - 이벤트 객체
   */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  /**
   * 상태 필터 변경 핸들러
   * @param {string} status - 선택한 상태
   */
  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? '' : status);
  };
  
  /**
   * 우선순위 필터 변경 핸들러
   * @param {string} priority - 선택한 우선순위
   */
  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priority === priorityFilter ? '' : priority);
  };
  
  /**
   * 태그 필터 변경 핸들러
   * @param {string} tag - 선택한 태그
   */
  const handleTagFilter = (tag) => {
    setTagFilter(tag === tagFilter ? '' : tag);
  };
  
  /**
   * 정렬 필드 변경 핸들러
   * @param {string} field - 정렬 기준 필드
   */
  const handleSort = (field) => {
    if (sortBy === field) {
      // 같은 필드로 정렬할 경우 정렬 방향 전환
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // 새로운 필드로 정렬할 경우 기본 오름차순 정렬
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  /**
   * 필터링 및 정렬 로직
   */
  const filterAndSortTasks = useCallback(() => {
    let result = [...tasks];
    
    // 검색어 필터링
    if (searchTerm) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 상태 필터링
    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }
    
    // 우선순위 필터링
    if (priorityFilter) {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // 태그 필터링
    if (tagFilter) {
      result = result.filter(task => task.tags.includes(tagFilter));
    }
    
    // 정렬
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'priority':
          const priorityOrder = { '높음': 0, '중간': 1, '낮음': 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'dueDate':
          comparison = compareDates(a.dueDate, b.dueDate);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTasks(result);
  }, [
    tasks, 
    searchTerm, 
    statusFilter, 
    priorityFilter, 
    tagFilter, 
    sortBy, 
    sortDirection
  ]);
  
  // 필터나 정렬 변경 시 결과 업데이트
  useEffect(() => {
    filterAndSortTasks();
  }, [filterAndSortTasks]);
  
  /**
   * 모든 필터 초기화
   */
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPriorityFilter('');
    setTagFilter('');
    setSortBy('dueDate');
    setSortDirection('asc');
  };
  
  return {
    // 상태
    searchTerm,
    statusFilter,
    priorityFilter,
    tagFilter,
    sortBy,
    sortDirection,
    filteredTasks,
    
    // 핸들러
    handleSearch,
    handleStatusFilter,
    handlePriorityFilter,
    handleTagFilter,
    handleSort,
    resetFilters,
    
    // 상태 설정 함수
    setSearchTerm,
    setStatusFilter,
    setPriorityFilter,
    setTagFilter,
    setSortBy,
    setSortDirection
  };
};

export default useTaskFilters;