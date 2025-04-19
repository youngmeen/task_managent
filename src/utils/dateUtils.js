/**
 * 날짜 관련 유틸리티 함수 모음
 * 
 * 이 모듈은 업무 관리 시스템에서 사용되는 날짜 관련 유틸리티 함수들을 제공합니다.
 */

/**
 * 날짜 포맷팅 함수
 * @param {string} dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 * @param {Object} options - Intl.DateTimeFormat 옵션
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (dateString, options = { month: '2-digit', day: '2-digit', weekday: 'short' }) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ko-KR', options);
};

/**
 * 오늘 날짜 ISO 형식으로 반환
 * @returns {string} 오늘 날짜 (YYYY-MM-DD)
 */
export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * 현재 타임스탬프 ISO 형식으로 반환
 * @returns {string} 현재 시간 ISO 문자열
 */
export const getCurrentISOTimestamp = () => {
  return new Date().toISOString();
};

/**
 * 날짜가 오늘인지 확인
 * @param {string} dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 * @returns {boolean} 오늘 날짜인지 여부
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  const compareDate = new Date(dateString);
  
  return today.getFullYear() === compareDate.getFullYear() 
    && today.getMonth() === compareDate.getMonth() 
    && today.getDate() === compareDate.getDate();
};

/**
 * 지정한 날짜가 지정 기간(일) 내에 있는지 확인
 * @param {string} dateString - ISO 형식 날짜 문자열 (YYYY-MM-DD)
 * @param {number} days - 향후 몇 일 이내인지 체크할 기간
 * @returns {boolean} 지정 기간 이내인지 여부
 */
export const isWithinDays = (dateString, days = 7) => {
  if (!dateString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);
  
  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);
  
  return targetDate >= today && targetDate <= futureDate;
};

/**
 * 두 날짜 사이의 기간 계산 함수
 * @param {string} startDate - 시작 날짜 (ISO 형식)
 * @param {string} endDate - 종료 날짜 (ISO 형식)
 * @returns {number} 기간 (일)
 */
export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

/**
 * 날짜 비교 함수
 * @param {string} dateA - 비교할 첫 번째 날짜 (ISO 형식)
 * @param {string} dateB - 비교할 두 번째 날짜 (ISO 형식)
 * @returns {number} dateA가 dateB보다 이전이면 -1, 같으면 0, 이후면 1
 */
export const compareDates = (dateA, dateB) => {
  if (!dateA || !dateB) return 0;
  
  const a = new Date(dateA);
  const b = new Date(dateB);
  
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * 날짜의 마감 상태 확인 (오늘/7일 이내/지남/정상)
 * @param {string} dateString - 날짜 문자열 (ISO 형식)
 * @param {string} status - 상태 (상태가 '완료'인 경우 'completed' 반환)
 * @returns {string} 마감 상태 ('due', 'upcoming', 'overdue', 'normal', 'completed')
 */
export const getDueStatus = (dateString, status) => {
  if (!dateString) return 'normal';
  
  // 이미 완료된 항목
  if (status === '완료') {
    return 'completed';
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(dateString);
  dueDate.setHours(0, 0, 0, 0);
  
  // 마감일 초과
  if (dueDate < today) {
    return 'overdue';
  }
  
  // 마감일이 오늘
  if (dueDate.getTime() === today.getTime()) {
    return 'due';
  }
  
  // 마감일이 7일 이내
  const sevenDaysLater = new Date(today);
  sevenDaysLater.setDate(today.getDate() + 7);
  
  if (dueDate <= sevenDaysLater) {
    return 'upcoming';
  }
  
  // 그 외 정상
  return 'normal';
};

/**
 * 마감 임박 항목 필터링
 * @param {Array} items - 항목 목록 (각 항목은 dueDate와 status 속성 필요)
 * @param {number} days - 기준 일 수 (기본 7일)
 * @returns {Array} 마감 임박 항목 목록
 */
export const getUpcomingDeadlines = (items, days = 7) => {
  if (!items || !Array.isArray(items)) return [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);
  
  const filtered = items.filter(item => {
    // 이미 완료된 항목은 제외
    if (item.status === '완료') return false;
    if (!item.dueDate) return false;
    
    const dueDate = new Date(item.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    // 마감일이 오늘부터 지정된 일 수 이내인 항목만 반환
    return dueDate >= today && dueDate <= futureDate;
  });
  
  // 마감일이 빠른 순으로 정렬
  return filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

/**
 * 상대적 날짜 표시 (예: '3일 전', '방금 전')
 * @param {string} dateString - ISO 형식 날짜 문자열
 * @returns {string} 상대적 날짜 문자열
 */
export const getRelativeTimeString = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  
  // 초 단위
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return '방금 전';
  
  // 분 단위
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분 전`;
  
  // 시간 단위
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  
  // 일 단위
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay}일 전`;
  
  // 월 단위
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}개월 전`;
  
  // 년 단위
  const diffYear = Math.floor(diffMonth / 12);
  return `${diffYear}년 전`;
};

/**
 * 날짜에 지정된 일수를 더한 날짜 반환
 * @param {string} dateString - ISO 형식 날짜 문자열
 * @param {number} days - 더할 일수
 * @returns {string} 계산된 날짜의 ISO 문자열
 */
export const addDays = (dateString, days) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

/**
 * 현재 월의 첫 날짜 반환
 * @returns {string} 이번 달 1일 (YYYY-MM-DD)
 */
export const getFirstDayOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return date.toISOString().split('T')[0];
};

/**
 * 현재 월의 마지막 날짜 반환
 * @returns {string} 이번 달 마지막 날 (YYYY-MM-DD)
 */
export const getLastDayOfMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.toISOString().split('T')[0];
};

/**
 * 주어진 날짜가 과거인지 확인
 * @param {string} dateString - ISO 형식 날짜 문자열
 * @returns {boolean} 과거 날짜인지 여부
 */
export const isPastDate = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  
  return date < today;
};
