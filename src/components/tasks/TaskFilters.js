// TaskFilters.js - 모바일 반응형 필터 바 + 드롭다운 구현 + Tasks.js 연동을 위한 상태 연결 예시 포함
import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const TaskFilters = ({ statusFilter, priorityFilter, tagFilter, onStatusChange, onPriorityChange, onTagChange }) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [isTagOpen, setIsTagOpen] = useState(false);

    const statuses = ['전체', '진행중', '완료', '대기'];
    const priorities = ['전체', '높음', '중간', '낮음'];
    const tags = ['전체', '디자인', '개발', '기획'];

    const handleSelect = (value, setter) => {
        setter(value === '전체' ? '' : value);
    };

    return (
        <div className="mb-4 overflow-x-auto whitespace-nowrap flex sm:space-x-2 space-x-3 py-2 relative">
            {/* 상태 필터 */}
            <div className="relative inline-block">
                <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="flex items-center px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                    <Filter className="w-4 h-4 mr-1" /> 상태 <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isStatusOpen && (
                    <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <ul className="py-1">
                            {statuses.map(status => (
                                <li
                                    key={status}
                                    onClick={() => {
                                        handleSelect(status, onStatusChange);
                                        setIsStatusOpen(false);
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${statusFilter === status || (status === '전체' && statusFilter === '') ? 'font-bold text-indigo-600' : ''}`}
                                >
                                    {status}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 우선순위 필터 */}
            <div className="relative inline-block">
                <button
                    onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                    className="flex items-center px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                    우선순위 <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isPriorityOpen && (
                    <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <ul className="py-1">
                            {priorities.map(priority => (
                                <li
                                    key={priority}
                                    onClick={() => {
                                        handleSelect(priority, onPriorityChange);
                                        setIsPriorityOpen(false);
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${priorityFilter === priority || (priority === '전체' && priorityFilter === '') ? 'font-bold text-indigo-600' : ''}`}
                                >
                                    {priority}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* 태그 필터 */}
            <div className="relative inline-block">
                <button
                    onClick={() => setIsTagOpen(!isTagOpen)}
                    className="flex items-center px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                    태그 <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {isTagOpen && (
                    <div className="absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <ul className="py-1">
                            {tags.map(tag => (
                                <li
                                    key={tag}
                                    onClick={() => {
                                        handleSelect(tag, onTagChange);
                                        setIsTagOpen(false);
                                    }}
                                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${tagFilter === tag || (tag === '전체' && tagFilter === '') ? 'font-bold text-indigo-600' : ''}`}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskFilters;