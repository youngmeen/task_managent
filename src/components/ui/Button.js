import React from 'react';

/**
 * 재사용 가능한 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.variant='primary'] - 버튼 스타일 (primary, secondary, outline)
 * @param {string} [props.size='md'] - 버튼 크기 (sm, md, lg)
 * @param {boolean} [props.fullWidth=false] - 가로 전체 너비 적용 여부
 * @param {ReactNode} props.children - 버튼 내용
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 * @param {string} [props.type='button'] - 버튼 타입 (button, submit)
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.className] - 추가 클래스
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) => {
  // 버튼 스타일 설정
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors';
  
  // 버튼 변형에 따른 스타일
  const variantStyles = {
    primary: 'text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent shadow-sm dark:bg-indigo-700 dark:hover:bg-indigo-800',
    secondary: 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm',
    outline: 'text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 border border-indigo-500 dark:border-indigo-400',
    danger: 'text-white bg-red-600 hover:bg-red-700 border border-transparent shadow-sm dark:bg-red-700 dark:hover:bg-red-800',
  };
  
  // 버튼 크기에 따른 스타일
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  // 너비 스타일
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // 비활성화 스타일
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;