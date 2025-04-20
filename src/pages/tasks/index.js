import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, Calendar, Tag, Clock } from 'lucide-react';
import Header from '../../components/layouts/Header';
import { tasks, statusOptions, priorityOptions, tagOptions } from '../../data/tasksData';
import TaskModal from '../../components/tasks/TaskModal';
import Button from '../../components/common/Button';

const Tasks = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('dueDate'); // 기본 정렬 기준
  const [sortDirection, setSortDirection] = useState('asc'); // 기본 정렬 방향
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // 로그인 상태 확인
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    // 초기 필터링 및 정렬 적용
    filterAndSortTasks();
    
    // URL 파라미터에서 '업무 추가' 모달을 열도록 요청하는 경우
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('newTask') === 'true') {
      openAddTaskModal();
      // 파라미터 제거 (history 조작)
      window.history.replaceState({}, document.title, '/tasks');
    }
  }, [searchTerm, statusFilter, priorityFilter, tagFilter, sortBy, sortDirection, navigate]);
  
  // 드롭다운 외부 클릭 감지를 위한 이벤트 핸들러
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isStatusDropdownOpen || isPriorityDropdownOpen || isTagDropdownOpen) {
        // 드롭다운 외부 클릭 시 모든 드롭다운 닫기
        setIsStatusDropdownOpen(false);
        setIsPriorityDropdownOpen(false);
        setIsTagDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStatusDropdownOpen, isPriorityDropdownOpen, isTagDropdownOpen]);
  
  const filterAndSortTasks = () => {
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
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    setFilteredTasks(result);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? '' : status);
    setIsStatusDropdownOpen(false);
  };
  
  const handlePriorityFilter = (priority) => {
    setPriorityFilter(priority === priorityFilter ? '' : priority);
    setIsPriorityDropdownOpen(false);
  };
  
  const handleTagFilter = (tag) => {
    setTagFilter(tag === tagFilter ? '' : tag);
    setIsTagDropdownOpen(false);
  };
  
  const openAddTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };
  
  const openEditTaskModal = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };
  
  const handleTaskSave = (taskData) => {
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log('Task data saved:', taskData);
    
    // 임시 로직: 클라이언트 사이드에서만 상태 업데이트
    let updatedTasks = [...tasks];
    
    if (selectedTask) {
      // 기존 업무 수정
      const index = updatedTasks.findIndex(t => t.id === taskData.id);
      if (index !== -1) {
        updatedTasks[index] = taskData;
      }
    } else {
      // 새 업무 추가
      updatedTasks.push(taskData);
    }
    
    // 필터링 및 정렬 적용
    filterAndSortTasks();
  };
  
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
  
  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(option => option.name === status);
    return statusOption ? statusOption.color : '#6b7280';
  };
  
  const getPriorityColor = (priority) => {
    const priorityOption = priorityOptions.find(option => option.name === priority);
    return priorityOption ? priorityOption.color : '#6b7280';
  };
  
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', weekday: 'short' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-baemin">
            업무 관리
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
            모든 업무를 효율적으로 관리하고 추적하세요
          </p>
        </div>
        
        {/* 검색 및 필터 */}
        <div className="mb-6 flex flex-col space-y-4">
          {/* 검색 입력 */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="업무 검색"
              className="block w-full pl-10 pr-4 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* 필터 버튼 그룹 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* 상태 필터 */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsStatusDropdownOpen(!isStatusDropdownOpen);
                  setIsPriorityDropdownOpen(false);
                  setIsTagDropdownOpen(false);
                }}
                className={`flex items-center w-full justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${statusFilter ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
              >
                <Filter className="h-4 w-4 mr-1" />
                <span className="truncate">상태</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isStatusDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    {statusOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleStatusFilter(option.name)}
                        className={`block w-full text-left px-4 py-2 text-sm ${statusFilter === option.name ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: option.color }}
                          ></span>
                          {option.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 우선순위 필터 */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
                  setIsStatusDropdownOpen(false);
                  setIsTagDropdownOpen(false);
                }}
                className={`flex items-center w-full justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${priorityFilter ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
              >
                <Clock className="h-4 w-4 mr-1" />
                <span className="truncate">우선순위</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isPriorityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handlePriorityFilter(option.name)}
                        className={`block w-full text-left px-4 py-2 text-sm ${priorityFilter === option.name ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: option.color }}
                          ></span>
                          {option.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 태그 필터 */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsTagDropdownOpen(!isTagDropdownOpen);
                  setIsStatusDropdownOpen(false);
                  setIsPriorityDropdownOpen(false);
                }}
                className={`flex items-center w-full justify-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${tagFilter ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
              >
                <Tag className="h-4 w-4 mr-1" />
                <span className="truncate">태그</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isTagDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {tagOptions.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                        className={`block w-full text-left px-4 py-2 text-sm ${tagFilter === tag ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 새 업무 추가 버튼 */}
            <Button 
              onClick={() => navigate('/tasks/create')}
              variant="primary"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              <span className="truncate">새 업무</span>
            </Button>
          </div>
        </div>
        
        {/* 업무 목록 */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          {/* 모바일 카드 뷰 (sm 이하에서만 보임) */}
          <div className="block sm:hidden">
            {filteredTasks.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => openEditTaskModal(task)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h3>
                      <div className="flex space-x-1">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{ 
                            backgroundColor: `${getStatusColor(task.status)}20`, 
                            color: getStatusColor(task.status) 
                          }}
                        >
                          {task.status}
                        </span>
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{ 
                            backgroundColor: `${getPriorityColor(task.priority)}20`, 
                            color: getPriorityColor(task.priority) 
                          }}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">{task.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(task.dueDate)}
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{task.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                {searchTerm || statusFilter || priorityFilter || tagFilter ? (
                  <div>
                    <p className="text-lg font-medium">검색 결과가 없습니다</p>
                    <p className="text-sm mt-1">다른 검색어나 필터를 시도해보세요</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium">등록된 업무가 없습니다</p>
                    <p className="text-sm mt-1">새 업무를 추가해보세요</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* 태블릿/데스크탑 테이블 뷰 (sm 이상에서만 보임) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center">
                      업무명
                      {sortBy === 'title' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      상태
                      {sortBy === 'status' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('priority')}
                  >
                    <div className="flex items-center">
                      우선순위
                      {sortBy === 'priority' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('dueDate')}
                  >
                    <div className="flex items-center">
                      마감일
                      {sortBy === 'dueDate' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transform ${sortDirection === 'desc' ? 'rotate-180' : ''}`} 
                        />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    태그
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => openEditTaskModal(task)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{ 
                            backgroundColor: `${getStatusColor(task.status)}20`, 
                            color: getStatusColor(task.status) 
                          }}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          style={{ 
                            backgroundColor: `${getPriorityColor(task.priority)}20`, 
                            color: getPriorityColor(task.priority) 
                          }}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(task.dueDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                      {searchTerm || statusFilter || priorityFilter || tagFilter ? (
                        <div>
                          <p className="text-lg font-medium">검색 결과가 없습니다</p>
                          <p className="text-sm mt-1">다른 검색어나 필터를 시도해보세요</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-lg font-medium">등록된 업무가 없습니다</p>
                          <p className="text-sm mt-1">새 업무를 추가해보세요</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* 업무 추가/수정 모달 */}
        <TaskModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)} 
          onSave={handleTaskSave}
          initialData={selectedTask}
        />
      </div>
    </div>
  );
};

export default Tasks;