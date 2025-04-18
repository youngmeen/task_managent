import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} shadow`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="text-xl font-bold text-indigo-600 font-baemin">업무 관리 시스템</Link>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-baemin`}>
                대시보드
              </Link>
              <Link to="/tasks" className={`${location.pathname === '/tasks' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-baemin`}>
                업무
              </Link>
              <Link to="/projects" className={`${location.pathname === '/projects' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-baemin`}>
                프로젝트
              </Link>
              <Link to="/calendar" className={`${location.pathname === '/calendar' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-baemin`}>
                캘린더
              </Link>
              <Link to="/members" className={`${location.pathname === '/members' ? 'border-indigo-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium font-baemin`}>
                구성원
              </Link>
            </nav>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">메뉴 열기</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center">
            {user ? (
              <div className="ml-3 relative flex items-center">
                <div className="text-sm mr-4 text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{user.name}</span>님 환영합니다
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleTheme}
                    className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="테마 변경"
                  >
                    {theme === 'light' ? (
                      <Moon className="h-6 w-6" />
                    ) : (
                      <Sun className="h-6 w-6" />
                    )}
                  </button>
                  <Link to="/profile" className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <User className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 dark:bg-gray-700 p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* 모바일 메뉴 */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
      <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
          <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            대시보드
          </Link>
          <Link to="/tasks" className={`${location.pathname === '/tasks' ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            업무
          </Link>
          <Link to="/projects" className={`${location.pathname === '/projects' ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            프로젝트
          </Link>
          <Link to="/calendar" className={`${location.pathname === '/calendar' ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            캘린더
          </Link>
          <Link to="/members" className={`${location.pathname === '/members' ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-500 text-indigo-700 dark:text-indigo-300' : 'border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
            구성원
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-3 flex space-x-2 items-center">
                  <button
                    onClick={toggleTheme}
                    className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white"
                    aria-label="테마 변경"
                  >
                    {theme === 'light' ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </button>
                  <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  프로필
                </Link>
                <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <div className="px-4">
              <Link to="/login" className="block text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                로그인
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;