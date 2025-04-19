import React, { useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * 재사용 가능한 드롭다운 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.isOpen - 드롭다운 열림 상태
 * @param {Function} props.setIsOpen - 드롭다운 상태 변경 함수
 * @param {ReactNode} props.trigger - 드롭다운 트리거 요소
 * @param {ReactNode} props.children - 드롭다운 내용
 * @param {string} [props.position='bottom-left'] - 드롭다운 위치 (bottom-left, bottom-right, top-left, top-right)
 * @param {string} [props.width='48'] - 드롭다운 너비 (Tailwind 너비 클래스)
 * @param {string} [props.className] - 추가 클래스
 */
const Dropdown = ({ 
  isOpen, 
  setIsOpen, 
  trigger, 
  children, 
  position = 'bottom-left',
  width = '48',
  className = '',
  ...props 
}) => {
  const dropdownRef = useRef(null);
  
  // 위치 클래스 매핑
  const positionClasses = {
    'bottom-left': 'left-0 mt-2 origin-top-left',
    'bottom-right': 'right-0 mt-2 origin-top-right',
    'top-left': 'left-0 bottom-full mb-2 origin-bottom-left',
    'top-right': 'right-0 bottom-full mb-2 origin-bottom-right'
  };
  
  // 너비 클래스 매핑
  const widthClass = `w-${width}`;
  
  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  
  return (
    <div ref={dropdownRef} className={`relative ${className}`} {...props}>
      {trigger}
      
      {isOpen && (
        <div 
          className={`absolute z-20 ${positionClasses[position]} ${widthClass} rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 드롭다운 트리거 버튼 컴포넌트
 */
Dropdown.Button = ({ 
  children, 
  onClick, 
  active = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const activeStyles = active 
    ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' 
    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600';
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 ml-1" />
    </button>
  );
};

/**
 * 드롭다운 항목 컴포넌트
 */
Dropdown.Item = ({ 
  children, 
  onClick, 
  active = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'block w-full text-left px-4 py-2 text-sm cursor-pointer';
  const activeStyles = active 
    ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' 
    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Dropdown;