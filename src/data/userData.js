// 사용자 프로필 샘플 데이터
export const userProfile = {
  id: 1,
  username: 'test',
  password: '1234', // 실제 애플리케이션에서는 암호화된 형태로 저장해야 함
  name: '김태호',
  email: 'test@example.com',
  position: '프로젝트 매니저',
  department: '개발팀',
  phoneNumber: '010-1234-5678',
  joinDate: '2022-03-15',
  profileImage: null, // 프로필 이미지 URL
  bio: '웹 개발 및 프로젝트 관리를 담당하고 있습니다.',
  skills: ['Project Management', 'Web Development', 'UI/UX Design', 'Team Leadership'],
  notifications: {
    email: true,
    desktop: true,
    mobile: false
  },
  theme: 'light',
  language: 'ko',
  timezone: 'Asia/Seoul'
};

// 사용자 알림 샘플 데이터
export const userNotifications = [
  {
    id: 1,
    type: 'task',
    title: '새로운 업무가 할당되었습니다',
    message: '"웹사이트 리뉴얼" 프로젝트에 새로운 업무가 할당되었습니다.',
    date: '2025-04-17T09:30:00',
    read: false
  },
  {
    id: 2,
    type: 'reminder',
    title: '업무 마감일 임박',
    message: '"프로젝트 기획서 완성" 업무의 마감일이 내일입니다.',
    date: '2025-04-17T10:15:00',
    read: false
  },
  {
    id: 3,
    type: 'mention',
    title: '댓글에서 언급되었습니다',
    message: '박지영님이 "UI 디자인 검토" 업무의 댓글에서 회원님을 언급했습니다.',
    date: '2025-04-16T14:22:00',
    read: true
  },
  {
    id: 4,
    type: 'update',
    title: '프로젝트 상태 업데이트',
    message: '"마케팅 캠페인" 프로젝트의 상태가 "진행중"으로 변경되었습니다.',
    date: '2025-04-16T11:05:00',
    read: true
  },
  {
    id: 5,
    type: 'system',
    title: '시스템 유지보수 안내',
    message: '금일 오후 10시부터 다음날 오전 2시까지 시스템 유지보수가 예정되어 있습니다.',
    date: '2025-04-15T09:00:00',
    read: true
  }
];

// 사용자 활동 내역 샘플 데이터
export const userActivities = [
  {
    id: 1,
    type: 'task_created',
    description: '새로운 업무 "서버 모니터링 시스템 구축"을 생성했습니다.',
    date: '2025-04-16T15:30:00'
  },
  {
    id: 2,
    type: 'task_completed',
    description: '"사용자 매뉴얼 작성" 업무를 완료했습니다.',
    date: '2025-04-15T17:45:00'
  },
  {
    id: 3,
    type: 'comment_added',
    description: '"UI 디자인 검토" 업무에 새로운 댓글을 작성했습니다.',
    date: '2025-04-15T14:20:00'
  },
  {
    id: 4,
    type: 'project_updated',
    description: '"웹사이트 리뉴얼" 프로젝트의 진행 상황을 75%로 업데이트했습니다.',
    date: '2025-04-14T11:10:00'
  },
  {
    id: 5,
    type: 'meeting_attended',
    description: '"주간 팀 회의"에 참석했습니다.',
    date: '2025-04-14T10:30:00'
  },
  {
    id: 6,
    type: 'file_uploaded',
    description: '"프로젝트 기획서 완성" 업무에 새로운 파일을 업로드했습니다.',
    date: '2025-04-14T09:15:00'
  },
  {
    id: 7,
    type: 'task_assigned',
    description: '박지영님에게 "디자인 가이드라인 업데이트" 업무를 할당했습니다.',
    date: '2025-04-13T16:40:00'
  },
  {
    id: 8,
    type: 'login',
    description: '시스템에 로그인했습니다.',
    date: '2025-04-13T09:00:00'
  }
];