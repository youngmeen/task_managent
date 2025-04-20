import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Calendar, ChevronLeft} from 'lucide-react';
import Header from '../../components/Header';
import {ThemeContext} from '../../contexts/ThemeContext';
import {statusOptions, priorityOptions, tagOptions} from '../../data/tasksData';

const CreateTask = () => {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
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
		// 로그인 상태 확인
		const userString = sessionStorage.getItem('user');
		if (!userString) {
			navigate('/login');
		}
	}, [navigate]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	const handleTagToggle = (tag) => {
		setFormData(prev => {
			const newTags = prev.tags.includes(tag)
				? prev.tags.filter(t => t !== tag)
				: [...prev.tags, tag];
			return {...prev, tags: newTags};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// 실제 구현에서는 API 호출로 데이터 저장
		console.log('Task data saved:', {
			...formData,
			id: Date.now(),
			assignee: '김영민', // 현재 로그인한 사용자로 설정 (임시)
			createdAt: new Date().toISOString().split('T')[0],
			updatedAt: new Date().toISOString().split('T')[0],
		});

		// 업무 페이지로 이동
		navigate('/tasks');
	};

	return (
		<div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-primary' : 'bg-gray-50'}`}>
			<Header/>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
				<div className="mb-4 sm:mb-6 flex items-center">
					<button
						onClick={() => navigate(-1)}
						className={`mr-4 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-dark-secondary text-dark-text-primary' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
					>
						<ChevronLeft className="h-5 w-5"/>
					</button>
					<h1 className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'} font-baemin`}>
						새 업무 추가
					</h1>
				</div>

				<div className={`${theme === 'dark' ? 'bg-dark-secondary shadow-dark' : 'bg-white shadow'} overflow-hidden sm:rounded-lg`}>
					<form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
						{/* 업무명 */}
						<div>
							<label htmlFor="title" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>업무명</label>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								required
								className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary placeholder-gray-500' : 'border-gray-300 text-gray-900'}`}
							/>
						</div>

						{/* 설명 */}
						<div>
							<label htmlFor="description" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>설명</label>
							<textarea
								id="description"
								name="description"
								rows="4"
								value={formData.description}
								onChange={handleChange}
								className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
							></textarea>
						</div>

						{/* 상태 및 우선순위 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
							<div>
								<label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>상태</label>
								<select
									id="status"
									name="status"
									value={formData.status}
									onChange={handleChange}
									className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								>
									{statusOptions.map(option => (
										<option key={option.id} value={option.name}>{option.name}</option>
									))}
								</select>
							</div>

							<div>
								<label htmlFor="priority"
								       className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>우선순위</label>
								<select
									id="priority"
									name="priority"
									value={formData.priority}
									onChange={handleChange}
									className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								>
									{priorityOptions.map(option => (
										<option key={option.id} value={option.name}>{option.name}</option>
									))}
								</select>
							</div>
						</div>

						{/* 마감일 */}
						<div>
							<label htmlFor="dueDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>마감일</label>
							<div className="mt-1 relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}/>
								</div>
								<input
									type="date"
									id="dueDate"
									name="dueDate"
									value={formData.dueDate}
									onChange={handleChange}
									className={`block w-full pl-10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								/>
							</div>
						</div>

						{/* 태그 */}
						<div>
							<label className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>태그</label>
							<div className="mt-1 relative">
								<div
									className={`min-h-[38px] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer flex flex-wrap gap-1 ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
									onClick={() => setShowTagSelector(!showTagSelector)}
								>
									{formData.tags.length > 0 ? (
										formData.tags.map((tag, index) => (
											<span
												key={index}
												className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
											>
                        {tag}
                      </span>
										))
									) : (
										<span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>태그 선택...</span>
									)}
								</div>

								{showTagSelector && (
									<div
										className={`absolute z-10 mt-1 w-full shadow-lg rounded-md py-1 max-h-60 overflow-y-auto ${theme === 'dark' ? 'bg-dark-secondary border-dark-border shadow-dark' : 'bg-white border border-gray-200'}`}>
										{tagOptions.map((tag) => (
											<div
												key={tag}
												className={`px-4 py-2 cursor-pointer flex items-center ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${
													formData.tags.includes(tag) ? (theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50') : ''
												}`}
												onClick={(e) => {
													e.stopPropagation();
													handleTagToggle(tag);
												}}
											>
												<input
													type="checkbox"
													checked={formData.tags.includes(tag)}
													className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
													onChange={() => {}}
												/>
												<span className={`ml-2 text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}`}>{tag}</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* 버튼 */}
						<div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-5">
							<button
								type="button"
								onClick={() => navigate('/tasks')}
								className={`w-full sm:w-auto sm:mr-3 px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'border-gray-600 text-dark-text-primary bg-dark-secondary shadow-dark-sm hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white shadow-sm hover:bg-gray-50'}`}
							>
								취소
							</button>
							<button
								type="submit"
								className={`w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 shadow-dark-sm' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
							>
								저장
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTask;