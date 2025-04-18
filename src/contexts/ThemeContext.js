import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 로컬 스토리지에서 테마 설정 불러오기 (기본값: light)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 테마 변경 함수
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // 테마에 따라 HTML 요소의 클래스를 업데이트
  useEffect(() => {
    // 부드러운 전환을 위한 transition 설정
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#111827'; // gray-900
      document.documentElement.style.color = '#f9fafb'; // gray-50
    } else {
      document.documentElement.style.backgroundColor = '';
      document.documentElement.style.color = '';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
