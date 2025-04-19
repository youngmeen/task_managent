/**
 * 스토리지 유틸리티 모듈
 * 
 * 이 모듈은 웹 스토리지(localStorage, sessionStorage)를 일관된 방식으로 사용하기 위한
 * 유틸리티 함수들을 제공합니다. 주요 기능은 다음과 같습니다:
 * 
 * - 데이터 직렬화/역직렬화 자동 처리
 * - 오류 처리 및 로깅 통합
 * - SSR/CSR 환경 호환성 보장
 * - 기본값 처리
 * - 타입 안전성 향상
 */

/**
 * 브라우저 환경 여부 확인
 * @returns {boolean} 브라우저 환경(window 객체 존재)인지 여부
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * 스토리지 액세스 오류 처리 함수
 * @param {string} action - 수행한 작업 (get, set, remove, clear)
 * @param {string} storageType - 스토리지 유형 (local, session)
 * @param {Error} error - 발생한 오류
 * @param {string} [key] - 관련 키 (선택적)
 */
const handleStorageError = (action, storageType, error, key = '') => {
  const keyInfo = key ? ` (키: ${key})` : '';
  console.error(`${storageType}Storage ${action} 작업 오류${keyInfo}:`, error);
};

/**
 * 스토리지 값 설정 함수 (내부 사용)
 * @param {Storage} storage - 사용할 스토리지 객체 (localStorage 또는 sessionStorage)
 * @param {string} storageType - 스토리지 유형 명칭 ('local' 또는 'session')
 * @param {string} key - 저장 키
 * @param {any} value - 저장할 값
 * @returns {boolean} 성공 여부
 */
const setValue = (storage, storageType, key, value) => {
  if (!isBrowser()) return false;
  
  try {
    const serializedValue = JSON.stringify(value);
    storage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    handleStorageError('set', storageType, error, key);
    return false;
  }
};

/**
 * 스토리지 값 조회 함수 (내부 사용)
 * @param {Storage} storage - 사용할 스토리지 객체 (localStorage 또는 sessionStorage)
 * @param {string} storageType - 스토리지 유형 명칭 ('local' 또는 'session')
 * @param {string} key - 불러올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
const getValue = (storage, storageType, key, defaultValue = null) => {
  if (!isBrowser()) return defaultValue;
  
  try {
    const serializedValue = storage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    handleStorageError('get', storageType, error, key);
    return defaultValue;
  }
};

/**
 * 스토리지 값 삭제 함수 (내부 사용)
 * @param {Storage} storage - 사용할 스토리지 객체 (localStorage 또는 sessionStorage)
 * @param {string} storageType - 스토리지 유형 명칭 ('local' 또는 'session')
 * @param {string} key - 삭제할 키
 * @returns {boolean} 성공 여부
 */
const removeValue = (storage, storageType, key) => {
  if (!isBrowser()) return false;
  
  try {
    storage.removeItem(key);
    return true;
  } catch (error) {
    handleStorageError('remove', storageType, error, key);
    return false;
  }
};

/**
 * 스토리지 초기화 함수 (내부 사용)
 * @param {Storage} storage - 사용할 스토리지 객체 (localStorage 또는 sessionStorage)
 * @param {string} storageType - 스토리지 유형 명칭 ('local' 또는 'session')
 * @returns {boolean} 성공 여부
 */
const clearValues = (storage, storageType) => {
  if (!isBrowser()) return false;
  
  try {
    storage.clear();
    return true;
  } catch (error) {
    handleStorageError('clear', storageType, error);
    return false;
  }
};

/**
 * 스토리지 키 존재 여부 확인 함수 (내부 사용)
 * @param {Storage} storage - 사용할 스토리지 객체 (localStorage 또는 sessionStorage)
 * @param {string} storageType - 스토리지 유형 명칭 ('local' 또는 'session')
 * @param {string} key - 확인할 키
 * @returns {boolean} 키 존재 여부
 */
const hasKey = (storage, storageType, key) => {
  if (!isBrowser()) return false;
  
  try {
    return storage.getItem(key) !== null;
  } catch (error) {
    handleStorageError('check', storageType, error, key);
    return false;
  }
};

/**************************************
 * LOCAL STORAGE API
 **************************************/

/**
 * localStorage에 데이터 저장
 * @param {string} key - 저장 키
 * @param {any} value - 저장할 값
 * @returns {boolean} 성공 여부
 */
export const setLocalStorage = (key, value) => {
  return setValue(localStorage, 'local', key, value);
};

/**
 * localStorage에서 데이터 불러오기
 * @param {string} key - 불러올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export const getLocalStorage = (key, defaultValue = null) => {
  return getValue(localStorage, 'local', key, defaultValue);
};

/**
 * localStorage에서 데이터 삭제
 * @param {string} key - 삭제할 키
 * @returns {boolean} 성공 여부
 */
export const removeLocalStorage = (key) => {
  return removeValue(localStorage, 'local', key);
};

/**
 * localStorage 모두 비우기
 * @returns {boolean} 성공 여부
 */
export const clearLocalStorage = () => {
  return clearValues(localStorage, 'local');
};

/**
 * localStorage에 키가 존재하는지 확인
 * @param {string} key - 확인할 키
 * @returns {boolean} 키 존재 여부
 */
export const hasLocalStorage = (key) => {
  return hasKey(localStorage, 'local', key);
};

/**************************************
 * SESSION STORAGE API
 **************************************/

/**
 * sessionStorage에 데이터 저장
 * @param {string} key - 저장 키
 * @param {any} value - 저장할 값
 * @returns {boolean} 성공 여부
 */
export const setSessionStorage = (key, value) => {
  return setValue(sessionStorage, 'session', key, value);
};

/**
 * sessionStorage에서 데이터 불러오기
 * @param {string} key - 불러올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export const getSessionStorage = (key, defaultValue = null) => {
  return getValue(sessionStorage, 'session', key, defaultValue);
};

/**
 * sessionStorage에서 데이터 삭제
 * @param {string} key - 삭제할 키
 * @returns {boolean} 성공 여부
 */
export const removeSessionStorage = (key) => {
  return removeValue(sessionStorage, 'session', key);
};

/**
 * sessionStorage 모두 비우기
 * @returns {boolean} 성공 여부
 */
export const clearSessionStorage = () => {
  return clearValues(sessionStorage, 'session');
};

/**
 * sessionStorage에 키가 존재하는지 확인
 * @param {string} key - 확인할 키
 * @returns {boolean} 키 존재 여부
 */
export const hasSessionStorage = (key) => {
  return hasKey(sessionStorage, 'session', key);
};

/**************************************
 * 스토리지 유틸리티 유닛 객체
 **************************************/

/**
 * 로컬 스토리지 작업을 위한 유틸리티 객체
 * 관련 함수들을 그룹화하여 제공
 */
export const localStorageUtils = {
  get: getLocalStorage,
  set: setLocalStorage,
  remove: removeLocalStorage,
  clear: clearLocalStorage,
  has: hasLocalStorage
};

/**
 * 세션 스토리지 작업을 위한 유틸리티 객체
 * 관련 함수들을 그룹화하여 제공
 */
export const sessionStorageUtils = {
  get: getSessionStorage,
  set: setSessionStorage,
  remove: removeSessionStorage,
  clear: clearSessionStorage,
  has: hasSessionStorage
};

/**
 * 로컬 스토리지에 객체의 특정 속성만 업데이트
 * @param {string} key - 저장 키
 * @param {Object} updates - 업데이트할 속성과 값
 * @returns {Object|null} 업데이트된 객체 또는 실패 시 null
 */
export const updateLocalStorageObject = (key, updates) => {
  const currentValue = getLocalStorage(key, {});
  if (typeof currentValue !== 'object' || currentValue === null) {
    return null;
  }
  
  const updatedValue = { ...currentValue, ...updates };
  const success = setLocalStorage(key, updatedValue);
  return success ? updatedValue : null;
};

/**
 * 세션 스토리지에 객체의 특정 속성만 업데이트
 * @param {string} key - 저장 키
 * @param {Object} updates - 업데이트할 속성과 값
 * @returns {Object|null} 업데이트된 객체 또는 실패 시 null
 */
export const updateSessionStorageObject = (key, updates) => {
  const currentValue = getSessionStorage(key, {});
  if (typeof currentValue !== 'object' || currentValue === null) {
    return null;
  }
  
  const updatedValue = { ...currentValue, ...updates };
  const success = setSessionStorage(key, updatedValue);
  return success ? updatedValue : null;
};
