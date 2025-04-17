// 프로젝트 샘플 데이터
export const projects = [
  {
    id: 1,
    name: '웹사이트 리뉴얼',
    description: '회사 웹사이트 디자인 및 기능 개선 프로젝트',
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    status: '진행중',
    progress: 75,
    manager: '김태호',
    team: ['김태호', '박지영', '이민수'],
    priority: '높음',
    budget: 15000000,
    createdAt: '2025-02-15',
    updatedAt: '2025-04-16'
  },
  {
    id: 2,
    name: '마케팅 캠페인',
    description: '2분기 제품 마케팅 전략 수립 및 캠페인 실행',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    status: '진행중',
    progress: 45,
    manager: '박지영',
    team: ['김태호', '박지영', '최수진'],
    priority: '중간',
    budget: 10000000,
    createdAt: '2025-03-01',
    updatedAt: '2025-04-14'
  },
  {
    id: 3,
    name: '모바일 앱 개발',
    description: '신규 모바일 애플리케이션 설계 및 개발',
    startDate: '2025-04-01',
    endDate: '2025-08-31',
    status: '진행중',
    progress: 30,
    manager: '이민수',
    team: ['김태호', '이민수', '정다은', '한지훈'],
    priority: '높음',
    budget: 25000000,
    createdAt: '2025-03-15',
    updatedAt: '2025-04-15'
  },
  {
    id: 4,
    name: '고객 만족도 조사',
    description: '분기별 고객 만족도 조사 및 분석',
    startDate: '2025-04-10',
    endDate: '2025-05-10',
    status: '대기중',
    progress: 0,
    manager: '최수진',
    team: ['김태호', '최수진'],
    priority: '낮음',
    budget: 5000000,
    createdAt: '2025-04-01',
    updatedAt: '2025-04-01'
  },
  {
    id: 5,
    name: '서버 인프라 업그레이드',
    description: '서버 인프라 성능 및 보안 강화 프로젝트',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    status: '대기중',
    progress: 0,
    manager: '한지훈',
    team: ['김태호', '이민수', '한지훈'],
    priority: '높음',
    budget: 18000000,
    createdAt: '2025-04-10',
    updatedAt: '2025-04-10'
  },
  {
    id: 6,
    name: '내부 교육 프로그램',
    description: '직원 역량 강화를 위한 교육 프로그램 개발',
    startDate: '2025-02-01',
    endDate: '2025-04-15',
    status: '완료',
    progress: 100,
    manager: '정다은',
    team: ['김태호', '정다은', '최수진'],
    priority: '중간',
    budget: 8000000,
    createdAt: '2025-01-15',
    updatedAt: '2025-04-15'
  }
];

// 프로젝트 상태 옵션
export const projectStatusOptions = [
  { id: 'waiting', name: '대기중', color: '#e11d48' },
  { id: 'inProgress', name: '진행중', color: '#3b82f6' },
  { id: 'completed', name: '완료', color: '#22c55e' },
  { id: 'onHold', name: '보류', color: '#f59e0b' },
  { id: 'canceled', name: '취소', color: '#6b7280' }
];

// 우선순위 옵션
export const projectPriorityOptions = [
  { id: 'high', name: '높음', color: '#ef4444' },
  { id: 'medium', name: '중간', color: '#f59e0b' },
  { id: 'low', name: '낮음', color: '#10b981' },
];

// 팀원 목록
export const teamMembers = [
  { id: 1, name: '김태호', position: '프로젝트 매니저', email: 'kimth@example.com' },
  { id: 2, name: '박지영', position: '마케팅 전문가', email: 'parkjy@example.com' },
  { id: 3, name: '이민수', position: '개발자', email: 'leems@example.com' },
  { id: 4, name: '최수진', position: '분석가', email: 'choisj@example.com' },
  { id: 5, name: '정다은', position: '디자이너', email: 'jungde@example.com' },
  { id: 6, name: '한지훈', position: '시스템 엔지니어', email: 'hanjh@example.com' }
];