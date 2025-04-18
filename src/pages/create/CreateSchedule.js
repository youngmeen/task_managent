import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Calendar, Clock, ChevronLeft} from 'lucide-react';
import Header from '../../components/Header';
import {ThemeContext} from '../../contexts/ThemeContext';
import {projects} from '../../data/projectsData';

const CreateSchedule = () => {
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		startDate: new Date().toISOString().split('T')[0],
		startTime: '09:00',
		endDate: new Date().toISOString().split('T')[0],
		endTime: '10:00',
		location: '',
		isAllDay: false,
		participants: [],
		projectId: '',
		color: '#3b82f6', // 기본 파란색
	});

	const [showParticipantsSelector, setShowParticipantsSelector] = useState(false);

	// 임시 참가자 목록 (실제 구현에서는 API로 가져오기)
	const participantOptions = [
		{id: 1, name: '김영민', email: 'kimym@example.com'},
		{id: 2, name: '이수진', email: 'leesj@example.com'},
		{id: 3, name: '박준호', email: 'parkjh@example.com'},
		{id: 4, name: '최민지', email: 'choimj@example.com'},
		{id: 5, name: '정대현', email: 'jungdh@example.com'},
	];

	// 색상 옵션
	const colorOptions = [
		{id: 'blue', color: '#3b82f6', name: '파란색'},
		{id: 'red', color: '#ef4444', name: '빨간색'},
		{id: 'green', color: '#10b981', name: '초록색'},
		{id: 'yellow', color: '#f59e0b', name: '노란색'},
		{id: 'purple', color: '#8b5cf6', name: '보라색'},
		{id: 'pink', color: '#ec4899', name: '분홍색'},
		{id: 'indigo', color: '#6366f1', name: '남색'},
	];

	useEffect(() => {
		// 로그인 상태 확인
		const userString = sessionStorage.getItem('user');
		if (!userString) {
			navigate('/login');
			return;
		}
	}, [navigate]);

	const handleChange = (e) => {
		const {name, value, type, checked} = e.target;
		if (type === 'checkbox') {
			setFormData(prev => ({...prev, [name]: checked}));

			// 종일 체크박스 처리
			if (name === 'isAllDay' && checked) {
				setFormData(prev => ({
					...prev,
					startTime: '00:00',
					endTime: '23:59'
				}));
			}
		} else {
			setFormData(prev => ({...prev, [name]: value}));
		}
	};

	const handleParticipantToggle = (participantId) => {
		setFormData(prev => {
			const newParticipants = prev.participants.includes(participantId)
				? prev.participants.filter(id => id !== participantId)
				: [...prev.participants, participantId];
			return {...prev, participants: newParticipants};
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// 실제 구현에서는 API 호출로 데이터 저장
		console.log('Schedule data saved:', {
			...formData,
			id: Date.now(),
			createdBy: '김영민', // 현재 로그인한 사용자로 설정 (임시)
			createdAt: new Date().toISOString(),
		});

		// 캘린더 페이지로 이동
		navigate('/calendar');
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
						새 일정 추가
					</h1>
				</div>

				<div className={`${theme === 'dark' ? 'bg-dark-secondary shadow-dark' : 'bg-white shadow'} overflow-hidden sm:rounded-lg`}>
					<form onSubmit={handleSubmit} className="p-6 space-y-6">
						{/* 일정명 */}
						<div>
							<label htmlFor="title" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>일정명</label>
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
								rows="3"
								value={formData.description}
								onChange={handleChange}
								className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
							></textarea>
						</div>

						{/* 종일 일정 체크박스 */}
						<div className="flex items-center">
							<input
								id="isAllDay"
								name="isAllDay"
								type="checkbox"
								checked={formData.isAllDay}
								onChange={handleChange}
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label htmlFor="isAllDay" className={`ml-2 block text-sm ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-900'}`}>종일 일정</label>
						</div>

						{/* 시작일시/종료일시 */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="startDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>시작
									일자</label>
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

							{!formData.isAllDay && (
								<div>
									<label htmlFor="startTime" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>시작
										시간</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div
											className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Clock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}/>
										</div>
										<input
											type="time"
											id="startTime"
											name="startTime"
											value={formData.startTime}
											onChange={handleChange}
											className={`block w-full pl-10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
										/>
									</div>
								</div>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="endDate" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>종료
									일자</label>
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

							{!formData.isAllDay && (
								<div>
									<label htmlFor="endTime" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>종료
										시간</label>
									<div className="mt-1 relative rounded-md shadow-sm">
										<div
											className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Clock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}/>
										</div>
										<input
											type="time"
											id="endTime"
											name="endTime"
											value={formData.endTime}
											onChange={handleChange}
											className={`block w-full pl-10 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
										/>
									</div>
								</div>
							)}
						</div>

						{/* 장소 */}
						<div>
							<label htmlFor="location" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>장소</label>
							<input
								type="text"
								id="location"
								name="location"
								value={formData.location}
								onChange={handleChange}
								className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
							/>
						</div>

						{/* 참석자 */}
						<div>
							<label className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>참석자</label>
							<div className="mt-1 relative">
								<div
									className={`min-h-[38px] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer flex flex-wrap gap-1 ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
									onClick={() => setShowParticipantsSelector(!showParticipantsSelector)}
								>
									{formData.participants.length > 0 ? (
										formData.participants.map((participantId) => {
											const participant = participantOptions.find(p => p.id === participantId);
											return (
												<span
													key={participantId}
													className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
												>
                          {participant?.name || '알 수 없음'}
                        </span>
											);
										})
									) : (
										<span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>참석자 선택...</span>
									)}
								</div>

								{showParticipantsSelector && (
									<div
										className={`absolute z-10 mt-1 w-full shadow-lg rounded-md py-1 max-h-60 overflow-y-auto ${theme === 'dark' ? 'bg-dark-secondary border-dark-border shadow-dark' : 'bg-white border border-gray-200'}`}>
										{participantOptions.map((participant) => (
											<div
												key={participant.id}
												className={`px-4 py-2 cursor-pointer flex items-center ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${
													formData.participants.includes(participant.id) ? (theme === 'dark' ? 'bg-gray-800' : 'bg-indigo-50') : ''
												}`}
												onClick={(e) => {
													e.stopPropagation();
													handleParticipantToggle(participant.id);
												}}
											>
												<input
													type="checkbox"
													checked={formData.participants.includes(participant.id)}
													className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
													onChange={() => {}}
												/>
												<div className="ml-2">
													<div className={`text-sm ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>{participant.name}</div>
													<div className={`text-xs ${theme === 'dark' ? 'text-dark-text-secondary' : 'text-gray-500'}`}>{participant.email}</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>

						{/* 관련 프로젝트 */}
						<div>
							<label htmlFor="projectId" className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'}`}>관련
								프로젝트</label>
							<select
								id="projectId"
								name="projectId"
								value={formData.projectId}
								onChange={handleChange}
								className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${theme === 'dark' ? 'bg-dark-primary border-dark-border text-dark-text-primary' : 'border-gray-300 text-gray-900'}`}
							>
								<option value="">선택 안함</option>
								{projects.map(project => (
									<option key={project.id} value={project.id}>{project.name}</option>
								))}
							</select>
						</div>

						{/* 색상 */}
						<div>
							<label className={`block text-sm font-medium ${theme === 'dark' ? 'text-dark-text-primary' : 'text-gray-700'} mb-2`}>일정 색상</label>
							<div className="flex flex-wrap gap-2">
								{colorOptions.map((colorOption) => (
									<button
										key={colorOption.id}
										type="button"
										onClick={() => setFormData(prev => ({...prev, color: colorOption.color}))}
										className={`w-8 h-8 rounded-full ${formData.color === colorOption.color ? (theme === 'dark' ? 'border-2 border-gray-300' : 'border-2 border-gray-900') : 'border-2 border-transparent hover:border-gray-300'}`}
										style={{backgroundColor: colorOption.color}}
										title={colorOption.name}
									></button>
								))}
							</div>
						</div>

						{/* 버튼 */}
						<div className="flex justify-end pt-5">
							<button
								type="button"
								onClick={() => navigate('/calendar')}
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

export default CreateSchedule;