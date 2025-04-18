import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, Users, Calendar, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { projects, projectStatusOptions, projectPriorityOptions, teamMembers } from '../data/projectsData';
import ProjectModal from '../components/modals/ProjectModal';

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // 로그인 상태 확인
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    // 필터링 적용
    filterProjects();
    
    // URL 파라미터에서 '프로젝트 추가' 모달을 열도록 요청하는 경우
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('newProject') === 'true') {
      openAddProjectModal();
      // 파라미터 제거 (history 조작)
      window.history.replaceState({}, document.title, '/projects');
    }
  }, [searchTerm, statusFilter, priorityFilter, navigate]);
  
  const filterProjects = () => {
    let result = [...projects];
    
    // 검색어 필터링
    if (searchTerm) {
      result = result.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 상태 필터링
    if (statusFilter) {
      result = result.filter(project => project.status === statusFilter);
    }
    
    // 우선순위 필터링
    if (priorityFilter) {
      result = result.filter(project => project.priority === priorityFilter);
    }
    
    setFilteredProjects(result);
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
  
  const getStatusColor = (status) => {
    const statusOption = projectStatusOptions.find(option => option.name === status);
    return statusOption ? statusOption.color : '#6b7280';
  };
  
  const openAddProjectModal = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };
  
  const openEditProjectModal = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };
  
  const handleProjectSave = (projectData) => {
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log('Project data saved:', projectData);
    
    // 임시 로직: 클라이언트 사이드에서만 상태 업데이트
    let updatedProjects = [...projects];
    
    if (selectedProject) {
      // 기존 프로젝트 수정
      const index = updatedProjects.findIndex(p => p.id === projectData.id);
      if (index !== -1) {
        updatedProjects[index] = projectData;
      }
    } else {
      // 새 프로젝트 추가
      updatedProjects.push(projectData);
    }
    
    // 필터링 적용
    filterProjects();
  };
  
  const getPriorityColor = (priority) => {
    const priorityOption = projectPriorityOptions.find(option => option.name === priority);
    return priorityOption ? priorityOption.color : '#6b7280';
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-baemin">
            프로젝트
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            프로젝트 현황을 한눈에 확인하고 관리하세요
          </p>
        </div>
        
        {/* 검색 및 필터 */}
        <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="프로젝트 검색"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex space-x-2">
            {/* 상태 필터 */}
            <div className="relative">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${statusFilter ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                상태
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isStatusDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {projectStatusOptions.map((option) => (
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
            <div className="relative">
              <button
                onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${priorityFilter ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                우선순위
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isPriorityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {projectPriorityOptions.map((option) => (
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
            
            {/* 새 프로젝트 추가 버튼 */}
            <button 
              onClick={() => navigate('/projects/create')}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 프로젝트
            </button>
          </div>
        </div>
        
        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => openEditProjectModal(project)}>
              <div className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 font-baemin">{project.name}</h3>
                  <span
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={{ 
                      backgroundColor: `${getStatusColor(project.status)}20`, 
                      color: getStatusColor(project.status) 
                    }}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="flex items-center mb-2">
                  <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(project.startDate)} - {formatDate(project.endDate)}
                  </span>
                </div>
                
                <div className="flex items-center mb-3">
                  <span
                    className="px-2 py-1 text-xs font-semibold rounded-full mr-2"
                    style={{ 
                      backgroundColor: `${getPriorityColor(project.priority)}20`, 
                      color: getPriorityColor(project.priority) 
                    }}
                  >
                    {project.priority}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    예산: {project.budget.toLocaleString()}원
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">진행률</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">팀원 {project.team.length}명</span>
                  </div>
                  <button className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center hover:text-indigo-500 dark:hover:text-indigo-300">
                    상세보기
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              {searchTerm || statusFilter || priorityFilter ? (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">검색 결과가 없습니다</p>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">다른 검색어나 필터를 시도해보세요</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">등록된 프로젝트가 없습니다</p>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">새 프로젝트를 추가해보세요</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 프로젝트 추가/수정 모달 */}
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
        onSave={handleProjectSave}
        initialData={selectedProject}
      />
    </div>
  );
};

export default Projects;