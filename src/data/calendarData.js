// 캘린더 이벤트 샘플 데이터
export const calendarEvents = [
    {
        id: 1,
        title: '주간 팀 회의',
        start: '2025-04-17T10:00:00',
        end: '2025-04-17T11:30:00',
        description: '팀 주간 업무 보고 및 논의',
        location: '회의실 A',
        type: '회의',
        color: '#3b82f6'
    },
    {
        id: 2,
        title: '프로젝트 기획서 마감',
        start: '2025-04-18T17:00:00',
        end: '2025-04-18T17:00:00',
        description: '웹사이트 리뉴얼 프로젝트 기획서 제출 마감',
        type: '마감일',
        color: '#ef4444'
    },
    {
        id: 3,
        title: '클라이언트 미팅',
        start: '2025-04-19T14:00:00',
        end: '2025-04-19T15:30:00',
        description: 'ABC 회사와 모바일 앱 개발 관련 미팅',
        location: '회의실 C',
        type: '미팅',
        color: '#8b5cf6'
    },
    {
        id: 4,
        title: 'UX/UI 디자인 워크샵',
        start: '2025-04-20T09:00:00',
        end: '2025-04-20T17:00:00',
        description: '디자인팀 UX/UI 역량 강화 워크샵',
        location: '교육장',
        type: '교육',
        color: '#10b981'
    },
    {
        id: 5,
        title: '인보이스 처리',
        start: '2025-04-21T14:00:00',
        end: '2025-04-21T16:00:00',
        description: '지난 달 인보이스 정리 및 회계팀 제출',
        type: '업무',
        color: '#f59e0b'
    },
    {
        id: 6,
        title: '코드 리뷰',
        start: '2025-04-22T11:00:00',
        end: '2025-04-22T12:30:00',
        description: '신규 기능 코드 리뷰 세션',
        location: '회의실 B',
        type: '회의',
        color: '#3b82f6'
    },
    {
        id: 7,
        title: '보안 점검',
        start: '2025-04-23T09:00:00',
        end: '2025-04-23T18:00:00',
        description: '분기별 시스템 보안 점검',
        type: '업무',
        color: '#f59e0b'
    },
    {
        id: 8,
        title: '마케팅 전략 회의',
        start: '2025-04-24T13:00:00',
        end: '2025-04-24T15:00:00',
        description: '2분기 마케팅 전략 수립 회의',
        location: '회의실 A',
        type: '회의',
        color: '#3b82f6'
    },
    {
        id: 9,
        title: '서버 유지보수',
        start: '2025-04-25T22:00:00',
        end: '2025-04-26T02:00:00',
        description: '정기 서버 유지보수 및 업데이트',
        type: '업무',
        color: '#f59e0b'
    },
    {
        id: 10,
        title: '팀 빌딩 활동',
        start: '2025-04-26T14:00:00',
        end: '2025-04-26T18:00:00',
        description: '팀 단합을 위한 야외 활동',
        location: '시민공원',
        type: '기타',
        color: '#8b5cf6'
    },
    {
        id: 11,
        title: '제품 출시 준비',
        start: '2025-04-17T09:00:00',
        end: '2025-04-17T18:00:00',
        description: '신규 제품 출시 전 최종 점검',
        type: '업무',
        color: '#f59e0b'
    },
    {
        id: 12,
        title: '웹 서비스 점검',
        start: '2025-04-19T00:00:00',
        end: '2025-04-19T06:00:00',
        description: '웹 서비스 안정성 점검 및 최적화',
        type: '업무',
        color: '#f59e0b'
    },
    {
        id: 13,
        title: '휴가',
        start: '2025-04-27',
        end: '2025-04-29',
        description: '연차 휴가',
        type: '휴가',
        color: '#ec4899'
    },
    {
        id: 14,
        title: '월간 보고서 마감',
        start: '2025-04-30T17:00:00',
        end: '2025-04-30T17:00:00',
        description: '4월 월간 업무 보고서 제출 마감',
        type: '마감일',
        color: '#ef4444'
    },
    {
        id: 15,
        title: '신입 사원 오리엔테이션',
        start: '2025-05-01T10:00:00',
        end: '2025-05-01T16:00:00',
        description: '5월 입사자 오리엔테이션',
        location: '교육장',
        type: '교육',
        color: '#10b981'
    }
];

// 이벤트 유형 옵션
export const eventTypeOptions = [
    {id: 'meeting', name: '회의', color: '#3b82f6'},
    {id: 'task', name: '업무', color: '#f59e0b'},
    {id: 'deadline', name: '마감일', color: '#ef4444'},
    {id: 'training', name: '교육', color: '#10b981'},
    {id: 'vacation', name: '휴가', color: '#ec4899'},
    {id: 'other', name: '기타', color: '#8b5cf6'}
];