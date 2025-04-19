import React from 'react';

/**
 * 재사용 가능한 카드 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {ReactNode} props.children - 카드 내용
 * @param {string} [props.className] - 추가 클래스
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 */
const Card = ({ 
  children, 
  className = '',
  onClick,
  ...props 
}) => {
  const baseStyles = 'bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden';
  const cursorStyles = onClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : '';
  
  return (
    <div
      className={`${baseStyles} ${cursorStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * 카드 헤더 컴포넌트
 */
Card.Header = ({ children, className = '', ...props }) => (
  <div 
    className={`px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * 카드 바디 컴포넌트
 */
Card.Body = ({ children, className = '', ...props }) => (
  <div 
    className={`px-4 py-5 sm:p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

/**
 * 카드 푸터 컴포넌트
 */
Card.Footer = ({ children, className = '', ...props }) => (
  <div 
    className={`px-4 py-4 sm:px-6 border-t border-gray-200 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;