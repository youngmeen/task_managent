import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Calendar, ChevronLeft} from 'lucide-react';
import Header from '../../components/Header';
import {ThemeContext} from '../../contexts/ThemeContext';
import {projectStatusOptions, projectPriorityOptions, teamMembers} from '../../data/projectsData';

const CreateProject = () => {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		startDate: new Date().toISOString().split('T')[0],
		endDate: '',
		status: '계획 중',
		priority: '중간',
		budget: 0,
		progress: 0,
		team: [],
	});

	const [showTeamSelector, setShowTeamSelector] = useState(false);

	useEffect(() => {
		// 로그인 상태 확인
		const userString = sessionStorage.getItem('user');
		if (!userString) {
			navigate('/login');
			return;
		}

		// 종료일 기본값 설정 (시작일로부터 1달 후)
		const nextMonth = new Date(formData.startDate);
		nextMonth.setMonth(nextMonth.getMonth() + 1);
		setFormData(prev => ({
			...prev,
			endDate: nextMonth.toISOString().split('T')[0]
		}));
	}, [navigate]);

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData(prev => ({...prev, [name]: value}));
	};

	const handleTeamToggle = (memberId) => {
		setFormData(prev => {
			const newTeam = prev.team.includes(memberId)
				? prev.team.filter(id => id !== memberId)
				: [...prev.team, memberId];
			return {...prev, team: newTeam};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// 실제 구현에서는 API 호출로 데이터 저장
		console.log('Project data saved:', {
			...formData,
			id: Date.now(),
			manager: '김영민', // 현재 로그인한 사용자로 설정 (임시)
			createdAt: new Date().toISOString().split('T')[0],
			updatedAt: new Date().toISOString().split('T')[0],
		});

		// 프로젝트 페이지로 이동
		navigate('/projects');
	};

	return (
		<div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-primary' : 'bg-gray-50'}`}>
			<Header/>

			<div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
				<div className="mb-6 flex items-center">
					<button
						onClick={() => navigate(-1)}
						className={`mr-4 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-dark-secondary text-dark-text-primary' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
					>
						<ChevronLeft className="h-5 w-5"/>
					</button>
					<h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'} font-baemin`}>
						새 프로젝트 생성
					</h1>
				</div>

				<div className={`${theme === 'dark' ? 'bg-dark-secondary shadow-dark' : 'bg-white shadow'} overflow-hidden sm:rounded-lg`}>
					<form onSubmit={handleSubmit} className="p-6 space-y-6">
						{/* 프로젝트명 */}
						<div>
							<label htmlFor="name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>프로젝트명</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
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

						{/* 시작일, 종료일 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="startDate"
								       className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>시작일</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div
										className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}/>
									</div>
									<input
										type="date"
										id="startDate"
										name="startDate"
										value={formData.startDate}
										onChange={handleChange}
										className={`block w-full pl-10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
									/>
								</div>
							</div>

							<div>
								<label htmlFor="endDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>종료일</label>
								<div className="mt-1 relative rounded-md shadow-sm">
									<div
										className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Calendar className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}/>
									</div>
									<input
										type="date"
										id="endDate"
										name="endDate"
										value={formData.endDate}
										onChange={handleChange}
										min={formData.startDate}
										className={`block w-full pl-10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
									/>
								</div>
							</div>
						</div>

						{/* 상태 및 우선순위 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="status" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>상태</label>
								<select
									id="status"
									name="status"
									value={formData.status}
									onChange={handleChange}
									className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								>
									{projectStatusOptions.map(option => (
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
									{projectPriorityOptions.map(option => (
										<option key={option.id} value={option.name}>{option.name}</option>
									))}
								</select>
							</div>
						</div>

						{/* 예산, 진행률 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="budget" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>예산
									(원)</label>
								<input
									type="number"
									id="budget"
									name="budget"
									value={formData.budget}
									onChange={handleChange}
									min="0"
									className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								/>
							</div>

							<div>
								<label htmlFor="progress" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>진행률
									(%)</label>
								<input
									type="number"
									id="progress"
									name="progress"
									value={formData.progress}
									onChange={handleChange}
									min="0"
									max="100"
									className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
								/>
							</div>
						</div>

						{/* 팀원 */}
						<div>
							<label className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>팀원</label>
							<div className="mt-1 relative">
								<div
									className={`min-h-[38px] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer flex flex-wrap gap-1 ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
									onClick={() => setShowTeamSelector(!showTeamSelector)}
								>
									{formData.team.length > 0 ? (
										formData.team.map((memberId) => {
											const member = teamMembers.find(m => m.id === memberId);
											return (
												<span
													key={memberId}
													className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
												>
                          {member?.name || '알 수 없음'}
                        </span>
											);
										})
									) : (
										<span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>팀원 선택...</span>
									)}
								</div>

								{showTeamSelector && (
									<div
										className={`absolute z-10 mt-1 w-full shadow-lg rounded-md py-1 max-h-60 overflow-y-auto ${theme === 'dark' ? 'bg-dark-secondary border-dark-border shadow-dark' : 'bg-white border border-gray-200'}`}>
										{teamMembers.map((member) => (
											<div
												key={member.id}
												className={`px-4 py-2 cursor-pointer flex items-center ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${
													formData.team.includes(member.id) ? (theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50') : ''
												}`}
												onClick={(e) => {
													e.stopPropagation();
													handleTeamToggle(member.id);
												}}
											>
												<input
													type="checkbox"
													checked={formData.team.includes(member.id)}
													className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
													onChange={() => {}}
												/>
												<span className={`ml-2 text-sm ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-700'}`}>{member.name}</span>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* 버튼 */}
						<div className="flex justify-end pt-5">
							<button
								type="button"
								onClick={() => navigate('/projects')}
								className={`mr-3 px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'border-gray-600 text-dark-text-primary bg-dark-secondary shadow-dark-sm hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white shadow-sm hover:bg-gray-50'}`}
							>
								취소
							</button>
							<button
								type="submit"
								className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-indigo-700 hover:bg-indigo-800 shadow-dark-sm' : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm'}`}
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

export default CreateProject;