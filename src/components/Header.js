import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, Menu, X, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import { getSessionStorage, removeSessionStorage } from '../utils/storageUtils';

const Header = () => {
	const [user, setUser] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { theme, toggleTheme } = useContext(ThemeContext);

	useEffect(() => {
		const userFromSession = getSessionStorage('user');
		if (userFromSession) {
			setUser(userFromSession);
		}

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleLogout = () => {
		removeSessionStorage('user');
		navigate('/login');
	};

	const getNavLinkClasses = (path) => {
		const isActive = location.pathname === path;
		return `${
			isActive
				? 'text-indigo-600 dark:text-indigo-300 font-semibold'
				: 'text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-200'
		} block px-4 py-3 text-base font-baemin`;
	};

	const handleCloseMenu = () => setIsMenuOpen(false);

	return (
		<header className={`sticky top-0 z-40 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} shadow`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex items-center">
						<Link to="/dashboard" className="text-xl font-bold text-indigo-600 font-baemin">업무 관리</Link>
					</div>

					{/* 데스크탑 네비게이션 */}
					<nav className="hidden md:flex md:space-x-8">
						<Link to="/dashboard" className={getNavLinkClasses('/dashboard')}>대시보드</Link>
						<Link to="/tasks" className={getNavLinkClasses('/tasks')}>업무</Link>
						<Link to="/projects" className={getNavLinkClasses('/projects')}>프로젝트</Link>
						<Link to="/calendar" className={getNavLinkClasses('/calendar')}>캘린더</Link>
						<Link to="/members" className={getNavLinkClasses('/members')}>구성원</Link>
					</nav>

					{/* 모바일 메뉴 버튼 */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						>
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			{/* 모바일 전체화면 메뉴 */}
			{isMenuOpen && (
				<div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 overflow-y-auto md:hidden transition-transform animate-slide-in" onClick={handleCloseMenu}>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-bold text-indigo-600 font-baemin">메뉴</h2>
						<button onClick={handleCloseMenu} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white">
							<X className="h-6 w-6" />
						</button>
					</div>

					<nav className="space-y-2">
						<Link to="/dashboard" onClick={handleCloseMenu} className={getNavLinkClasses('/dashboard')}>대시보드</Link>
						<Link to="/tasks" onClick={handleCloseMenu} className={getNavLinkClasses('/tasks')}>업무</Link>
						<Link to="/projects" onClick={handleCloseMenu} className={getNavLinkClasses('/projects')}>프로젝트</Link>
						<Link to="/calendar" onClick={handleCloseMenu} className={getNavLinkClasses('/calendar')}>캘린더</Link>
						<Link to="/members" onClick={handleCloseMenu} className={getNavLinkClasses('/members')}>구성원</Link>
					</nav>

					<div className="mt-8 space-y-4">
						{user ? (
							<>
								<div className="text-sm text-gray-800 dark:text-gray-200 font-semibold">{user.name}</div>
								<Link to="/profile" onClick={handleCloseMenu} className="block text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300">프로필</Link>
								<button
									onClick={() => {
										handleLogout();
										handleCloseMenu();
									}}
									className="block text-sm text-left text-red-500 hover:text-red-700"
								>
									로그아웃
								</button>
							</>
						) : (
							<Link to="/login" onClick={handleCloseMenu} className="block text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
								로그인
							</Link>
						)}

						<button
							onClick={toggleTheme}
							className="w-10 h-10 p-2 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
						>
							{theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
