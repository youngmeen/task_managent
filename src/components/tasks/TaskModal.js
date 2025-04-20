import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { statusOptions, priorityOptions, tagOptions } from '../../data/tasksData';

const TaskModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '대기중',
    priority: '중간',
    dueDate: new Date().toISOString().split('T')[0],
    tags: [],
    projectId: 1,
  });
  
  const [showTagSelector, setShowTagSelector] = useState(false);
  
  useEffect(() => {
    // 수정 모드일 경우 초기 데이터 설정
    if (initialData) {
      setFormData(initialData);
    } else {
      // 새 업무 생성 시 초기화
      setFormData({
        title: '',
        description: '',
        status: '대기중',
        priority: '중간',
        dueDate: new Date().toISOString().split('T')[0],
        tags: [],
        projectId: 1,
      });
    }
  }, [initialData, isOpen]);

  // 모달이 열렸을 때 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTagToggle = (tag) => {
    setFormData(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: newTags };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: initialData?.id || Date.now(),
      assignee: '김영민', // 현재 로그인한 사용자로 설정 (임시)
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };
  
  // 모달 외부 클릭 시 태그 선택기 닫기
  const handleOutsideClick = (e) => {
    if (showTagSelector) {
      setShowTagSelector(false);
    }
  };
  
  // 모달이 닫혀있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={handleOutsideClick}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className="inline-block w-full align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex justify-between items-center px-4 sm:px-6 pt-4 pb-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white font-baemin">
              {initialData ? '업무 수정' : '새 업무 추가'}
            </h3>
            <button
              type="button"
              className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 p-1"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 space-y-4">
              {/* 업무명 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">업무명</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
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
              
              {/* 상태 및 우선순위 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">상태</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">우선순위</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.id} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* 마감일 */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">마감일</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="block w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* 태그 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">태그</label>
                <div className="mt-1 relative">
                  <div
                    className="min-h-[38px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer flex flex-wrap gap-1 bg-white dark:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTagSelector(!showTagSelector);
                    }}
                  >
                    {formData.tags.length > 0 ? (
                      formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">태그 선택...</span>
                    )}
                  </div>
                  
                  {showTagSelector && (
                    <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 rounded-md py-1 max-h-40 overflow-y-auto">
                      {tagOptions.map((tag) => (
                        <div
                          key={tag}
                          className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                            formData.tags.includes(tag) ? 'bg-indigo-50 dark:bg-indigo-900' : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTagToggle(tag);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={formData.tags.includes(tag)}
                            className="h-4 w-4 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                            onChange={() => {}}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          
          {/* 버튼 - 하단 고정 */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;