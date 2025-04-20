import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { projectStatusOptions, projectPriorityOptions, teamMembers } from '../../data/projectsData';
import Button from '../common/Button';

const ProjectModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: '계획 중',
    priority: '중간',
    budget: 0,
    progress: 0,
    team: [],
  });
  
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  
  useEffect(() => {
    // 수정 모드일 경우 초기 데이터 설정
    if (initialData) {
      setFormData(initialData);
    } else {
      // 새 프로젝트 생성 시 초기화
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);
      
      setFormData({
        name: '',
        description: '',
        startDate: today.toISOString().split('T')[0],
        endDate: nextMonth.toISOString().split('T')[0],
        status: '계획 중',
        priority: '중간',
        budget: 0,
        progress: 0,
        team: [],
      });
    }
  }, [initialData, isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTeamToggle = (memberId) => {
    setFormData(prev => {
      const newTeam = prev.team.includes(memberId)
        ? prev.team.filter(id => id !== memberId)
        : [...prev.team, memberId];
      return { ...prev, team: newTeam };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id || Date.now(),
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };
  
  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 pt-5 pb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white font-baemin">
              {initialData ? '프로젝트 수정' : '새 프로젝트 추가'}
            </h3>
            <button
              type="button"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="space-y-4">
              {/* 프로젝트명 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">프로젝트명</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* 설명 */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">설명</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              
              {/* 기간 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">시작일</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">종료일</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={formData.startDate}
                      className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* 상태 */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">상태</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {projectStatusOptions.map(option => (
                    <option key={option.id} value={option.name}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              {/* 우선순위 */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">우선순위</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {projectPriorityOptions.map(option => (
                    <option key={option.id} value={option.name}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              {/* 예산 */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">예산 (원)</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* 진행률 */}
              <div>
                <label htmlFor="progress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">진행률 (%)</label>
                <input
                  type="number"
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* 팀원 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">팀원</label>
                <div className="mt-1 relative">
                  <div
                    className="min-h-[38px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer flex flex-wrap gap-1 bg-white dark:bg-gray-700"
                    onClick={() => setShowTeamSelector(!showTeamSelector)}
                  >
                    {formData.team.length > 0 ? (
                      formData.team.map((memberId) => {
                        const member = teamMembers.find(m => m.id === memberId);
                        return (
                          <span
                            key={memberId}
                            className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                          >
                            {member?.name || '알 수 없음'}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">팀원 선택...</span>
                    )}
                  </div>
                  
                  {showTeamSelector && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md py-1 max-h-60 overflow-y-auto">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                            formData.team.includes(member.id) ? 'bg-indigo-50 dark:bg-indigo-900' : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTeamToggle(member.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.team.includes(member.id)}
                            className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                            onChange={() => {}}
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* 버튼 */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="mr-2"
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  저장
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;