import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  return (
    <button
      onClick={toggleTheme}
      className={`fixed z-50 bottom-4 right-4 p-2 rounded-full transition-all duration-300 ease-in-out 
      ${theme === 'dark' 
        ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-600'} 
      shadow-lg ${className}`}
      aria-label="테마 변경"
      title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
    >
      {theme === 'light' ? (
        <Moon className={sizeClasses[size]} />
      ) : (
        <Sun className={sizeClasses[size]} />
      )}
    </button>
  );
};

export default ThemeToggle;