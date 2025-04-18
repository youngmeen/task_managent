// 업무 목록 샘플 데이터
export const tasks = [
	{
		id: 1,
		title: '프로젝트 기획서 완성',
		description: '신규 프로젝트에 대한 기획서 작성 및 검토',
		status: '진행중',
		priority: '높음',
		dueDate: '2025-04-18',
		assignee: '김영민',
		tags: ['기획', '문서'],
		projectId: 1,
		createdAt: '2025-04-10',
		updatedAt: '2025-04-14'
	},
	{
		id: 2,
		title: '주간 회의 준비',
		description: '팀 주간 회의를 위한 자료 준비 및 의제 정리',
		status: '대기중',
		priority: '중간',
		dueDate: '2025-04-19',
		assignee: '김영민',
		tags: ['회의', '준비'],
		projectId: 2,
		createdAt: '2025-04-12',
		updatedAt: '2025-04-12'
	},
	{
		id: 3,
		title: 'UI 디자인 검토',
		description: '디자인팀에서 전달받은 UI 디자인 검토 및 피드백 제공',
		status: '대기중',
		priority: '높음',
		dueDate: '2025-04-20',
		assignee: '김영민',
		tags: ['디자인', '검토'],
		projectId: 1,
		createdAt: '2025-04-13',
		updatedAt: '2025-04-13'
	},
	{
		id: 4,
		title: '인보이스 정리',
		description: '지난 달 인보이스 정리 및 회계팀 전달',
		status: '대기중',
		priority: '낮음',
		dueDate: '2025-04-21',
		assignee: '김영민',
		tags: ['재무', '정산'],
		projectId: 3,
		createdAt: '2025-04-14',
		updatedAt: '2025-04-14'
	},
	{
		id: 5,
		title: '코드 리팩토링',
		description: '레거시 코드 개선 및 리팩토링 작업',
		status: '진행중',
		priority: '중간',
		dueDate: '2025-04-22',
		assignee: '김영민',
		tags: ['개발', '코드'],
		projectId: 1,
		createdAt: '2025-04-10',
		updatedAt: '2025-04-15'
	},
	{
		id: 6,
		title: '사용자 매뉴얼 작성',
		description: '신규 기능에 대한 사용자 매뉴얼 작성',
		status: '완료',
		priority: '중간',
		dueDate: '2025-04-15',
		assignee: '김영민',
		tags: ['문서', '매뉴얼'],
		projectId: 2,
		createdAt: '2025-04-08',
		updatedAt: '2025-04-15'
	},
	{
		id: 7,
		title: '클라이언트 미팅',
		description: '주요 클라이언트와의 프로젝트 진행 상황 미팅',
		status: '완료',
		priority: '높음',
		dueDate: '2025-04-16',
		assignee: '김영민',
		tags: ['미팅', '클라이언트'],
		projectId: 3,
		createdAt: '2025-04-10',
		updatedAt: '2025-04-16'
	},
	{
		id: 8,
		title: '테스트 케이스 작성',
		description: '신규 기능에 대한 테스트 케이스 작성',
		status: '완료',
		priority: '중간',
		dueDate: '2025-04-14',
		assignee: '김영민',
		tags: ['테스트', '품질'],
		projectId: 1,
		createdAt: '2025-04-07',
		updatedAt: '2025-04-14'
	},
	{
		id: 9,
		title: '디자인 가이드라인 업데이트',
		description: '회사 디자인 가이드라인 문서 업데이트',
		status: '대기중',
		priority: '낮음',
		dueDate: '2025-04-23',
		assignee: '김영민',
		tags: ['디자인', '문서'],
		projectId: 2,
		createdAt: '2025-04-15',
		updatedAt: '2025-04-15'
	},
	{
		id: 10,
		title: '성능 최적화',
		description: '애플리케이션 성능 모니터링 및 최적화 작업',
		status: '진행중',
		priority: '높음',
		dueDate: '2025-04-21',
		assignee: '김영민',
		tags: ['개발', '최적화'],
		projectId: 1,
		createdAt: '2025-04-12',
		updatedAt: '2025-04-16'
	},
	{
		id: 11,
		title: '신규 직원 교육 자료 준비',
		description: '신규 입사자를 위한 온보딩 교육 자료 준비',
		status: '완료',
		priority: '중간',
		dueDate: '2025-04-12',
		assignee: '김영민',
		tags: ['교육', '인사'],
		projectId: 3,
		createdAt: '2025-04-05',
		updatedAt: '2025-04-12'
	},
	{
		id: 12,
		title: '월간 보고서 작성',
		description: '4월 월간 업무 보고서 작성',
		status: '대기중',
		priority: '중간',
		dueDate: '2025-04-30',
		assignee: '김영민',
		tags: ['보고서', '월간'],
		projectId: 3,
		createdAt: '2025-04-16',
		updatedAt: '2025-04-16'
	},
	{
		id: 13,
		title: '서버 모니터링 시스템 구축',
		description: '실시간 서버 모니터링 시스템 설계 및 구축',
		status: '진행중',
		priority: '높음',
		dueDate: '2025-04-25',
		assignee: '김영민',
		tags: ['개발', '서버'],
		projectId: 2,
		createdAt: '2025-04-08',
		updatedAt: '2025-04-15'
	},
	{
		id: 14,
		title: '보안 취약점 점검',
		description: '시스템 보안 취약점 점검 및 조치',
		status: '대기중',
		priority: '높음',
		dueDate: '2025-04-26',
		assignee: '김영민',
		tags: ['보안', '점검'],
		projectId: 1,
		createdAt: '2025-04-15',
		updatedAt: '2025-04-15'
	},
	{
		id: 15,
		title: '마케팅 전략 회의',
		description: '2분기 마케팅 전략 수립을 위한 회의',
		status: '완료',
		priority: '중간',
		dueDate: '2025-04-11',
		assignee: '김영민',
		tags: ['마케팅', '회의'],
		projectId: 3,
		createdAt: '2025-04-08',
		updatedAt: '2025-04-11'
	},
];

// 업무 상태 옵션
export const statusOptions = [
	{id: 'waiting', name: '대기중', color: '#e11d48'},
	{id: 'inProgress', name: '진행중', color: '#3b82f6'},
	{id: 'completed', name: '완료', color: '#22c55e'},
];

// 우선순위 옵션
export const priorityOptions = [
	{id: 'high', name: '높음', color: '#ef4444'},
	{id: 'medium', name: '중간', color: '#f59e0b'},
	{id: 'low', name: '낮음', color: '#10b981'},
];

// 태그 옵션
export const tagOptions = [
	'개발', '디자인', '마케팅', '기획', '문서', '회의', '테스트',
	'보안', '교육', '인사', '재무', '정산', '보고서', '미팅', '품질', '최적화'
];