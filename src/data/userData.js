// 사용자 프로필 샘플 데이터
export const userProfile = {
  id: 1,
  username: 'test',
  name: '김태호',
  email: 'test@example.com',
  position: '프로젝트 매니저',
  department: '개발팀',
  phoneNumber: '010-1234-5678',
  joinDate: '2023-01-15',
  bio: '프로젝트 매니징 및 웹 개발을 담당하고 있습니다. 효율적인 업무 관리와 팀원들과의 협업을 중요시합니다.',
  skills: ['JavaScript', 'React', 'Node.js', 'Project Management', 'Agile'],
  theme: 'light',
  language: 'ko',
  notifications: {
    email: true,
    desktop: true,
    mobile: false
  }
};

// 알림 샘플 데이터
export const userNotifications = [
  {
    id: 1,
    type: 'task',
    title: '새 태스크가 할당되었습니다',
    message: '프로젝트 기획서 완성 태스크가 할당되었습니다.',
    read: false,
    date: '2025-04-16T09:30:00'
  },
  {
    id: 2,
    type: 'reminder',
    title: '태스크 마감일 알림',
    message: '주간 회의 준비 태스크의 마감일이 내일입니다.',
    read: false,
    date: '2025-04-16T14:00:00'
  },
  {
    id: 3,
    type: 'mention',
    title: '댓글에서 언급되었습니다',
    message: '박지영님이 UI 디자인 검토 태스크의 댓글에서 당신을 언급했습니다.',
    read: true,
    date: '2025-04-15T11:45:00'
  },
  {
    id: 4,
    type: 'update',
    title: '프로젝트가 업데이트되었습니다',
    message: '웹사이트 리뉴얼 프로젝트의 상태가 변경되었습니다.',
    read: true,
    date: '2025-04-14T16:20:00'
  },
  {
    id: 5,
    type: 'system',
    title: '시스템 점검 안내',
    message: '오늘 23:00 - 익일 02:00까지 시스템 점검이 예정되어 있습니다.',
    read: false,
    date: '2025-04-16T10:00:00'
  }
];

// 활동 내역 샘플 데이터
export const userActivities = [
  {
    id: 1,
    type: 'task',
    description: '태스크 완료: 사용자 매뉴얼 작성',
    date: '2025-04-15T14:30:00'
  },
  {
    id: 2,
    type: 'login',
    description: '로그인',
    date: '2025-04-15T09:00:00'
  },
  {
    id: 3,
    type: 'comment',
    description: '코드 리팩토링 태스크에 댓글 추가',
    date: '2025-04-14T16:45:00'
  },
  {
    id: 4,
    type: 'task',
    description: '태스크 상태 변경: 클라이언트 미팅 [진행중 → 완료]',
    date: '2025-04-14T15:20:00'
  },
  {
    id: 5,
    type: 'project',
    description: '프로젝트 참여: 모바일 앱 개발',
    date: '2025-04-13T11:00:00'
  },
  {
    id: 6,
    type: 'task',
    description: '태스크 생성: 보안 취약점 점검',
    date: '2025-04-13T10:30:00'
  },
  {
    id: 7,
    type: 'profile',
    description: '프로필 정보 업데이트',
    date: '2025-04-12T16:15:00'
  },
  {
    id: 8,
    type: 'login',
    description: '로그인',
    date: '2025-04-12T09:05:00'
  }
];
