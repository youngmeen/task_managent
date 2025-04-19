import React from 'react';
import { Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import { formatDate } from '../../utils/dateUtils';
import { truncateText } from '../../utils/formatUtils';

/**
 * 모바일용 업무 카드 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.tasks - 업무 목록
 * @param {Function} props.onTaskClick - 업무 클릭 핸들러
 * @param {Function} props.getStatusColor - 상태 색상 가져오는 함수
 * @param {Function} props.getPriorityColor - 우선순위 색상 가져오는 함수
 * @param {boolean} props.isFiltered - 필터링 여부
 */
export const TaskCardList = ({ 
  tasks, 
  onTaskClick, 
  getStatusColor, 
  getPriorityColor,
  isFiltered = false
}) => {
  if (tasks.length === 0) {
    return <EmptyTaskMessage isFiltered={isFiltered} />;
  }
  
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => onTaskClick(task)}
        >
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</h3>
            <div className="flex space-x-1">
              <Badge 
                text={task.status} 
                color={getStatusColor(task.status)}
              />
              <Badge 
                text={task.priority} 
                color={getPriorityColor(task.priority)}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
            {truncateText(task.description, 60)}
          </p>
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
  );
};

/**
 * 테이블 헤더 셀 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.label - 헤더 라벨
 * @param {string} props.field - 정렬 필드
 * @param {string} props.currentSortBy - 현재 정렬 기준
 * @param {string} props.currentSortDirection - 현재 정렬 방향
 * @param {Function} props.onSort - 정렬 이벤트 핸들러
 */
export const TableHeaderCell = ({ 
  label, 
  field, 
  currentSortBy, 
  currentSortDirection, 
  onSort 
}) => {
  const isSorted = currentSortBy === field;
  
  return (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        {label}
        {isSorted && (
          <svg 
            className={`h-4 w-4 ml-1 transform ${currentSortDirection === 'desc' ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </th>
  );
};

/**
 * 데스크탑용 테이블 형식 업무 목록 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array} props.tasks - 업무 목록
 * @param {Function} props.onTaskClick - 업무 클릭 핸들러
 * @param {Function} props.getStatusColor - 상태 색상 가져오는 함수
 * @param {Function} props.getPriorityColor - 우선순위 색상 가져오는 함수
 * @param {string} props.sortBy - 정렬 기준
 * @param {string} props.sortDirection - 정렬 방향
 * @param {Function} props.onSort - 정렬 핸들러
 * @param {boolean} props.isFiltered - 필터링 여부
 */
export const TaskTableList = ({ 
  tasks, 
  onTaskClick, 
  getStatusColor, 
  getPriorityColor,
  sortBy,
  sortDirection,
  onSort,
  isFiltered = false
}) => {
  if (tasks.length === 0) {
    return <EmptyTaskMessage isFiltered={isFiltered} />;
  }
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <TableHeaderCell 
            label="업무명" 
            field="title" 
            currentSortBy={sortBy} 
            currentSortDirection={sortDirection} 
            onSort={onSort}
          />
          <TableHeaderCell 
            label="상태" 
            field="status" 
            currentSortBy={sortBy} 
            currentSortDirection={sortDirection} 
            onSort={onSort}
          />
          <TableHeaderCell 
            label="우선순위" 
            field="priority" 
            currentSortBy={sortBy} 
            currentSortDirection={sortDirection} 
            onSort={onSort}
          />
          <TableHeaderCell 
            label="마감일" 
            field="dueDate" 
            currentSortBy={sortBy} 
            currentSortDirection={sortDirection} 
            onSort={onSort}
          />
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            태그
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => onTaskClick(task)}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{task.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Badge 
                text={task.status} 
                color={getStatusColor(task.status)}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <Badge 
                text={task.priority} 
                color={getPriorityColor(task.priority)}
              />
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
        ))}
      </tbody>
    </table>
  );
};

/**
 * 업무가 없을 때 표시하는 메시지 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} [props.isFiltered=false] - 필터링 여부
 */
export const EmptyTaskMessage = ({ isFiltered = false }) => (
  <div className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
    {isFiltered ? (
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
);