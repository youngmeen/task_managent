/**
 * useSort.js - 데이터 정렬을 위한 커스텀 훅
 * 
 * 배열 데이터를 다양한 기준과 방향으로 정렬하는 기능을 제공하는 커스텀 훅입니다.
 * 
 * @example
 * // 기본 사용법
 * const tasks = [...];
 * const { 
 *   sortedData, 
 *   sortBy, 
 *   sortDirection, 
 *   setSortBy, 
 *   toggleSortDirection 
 * } = useSort(tasks, 'dueDate', 'asc');
 * 
 * // 정렬 기준 변경하기
 * setSortBy('priority');
 * 
 * // 정렬 방향 토글하기
 * toggleSortDirection();
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * 데이터 정렬을 위한 커스텀 훅
 * 
 * @param {Array} data - 정렬할 원본 데이터 배열
 * @param {string} initialSortBy - 초기 정렬 기준 필드 (기본값: '')
 * @param {string} initialDirection - 초기 정렬 방향 ('asc' 또는 'desc', 기본값: 'asc')
 * @returns {Object} 정렬 상태와 컨트롤 함수들을 포함한 객체
 * @returns {Array} object.sortedData - 정렬된 데이터 배열
 * @returns {string} object.sortBy - 현재 정렬 기준 필드
 * @returns {string} object.sortDirection - 현재 정렬 방향 ('asc' 또는 'desc')
 * @returns {Function} object.setSortBy - 정렬 기준 필드를 설정하는 함수
 * @returns {Function} object.setSortDirection - 정렬 방향을 설정하는 함수
 * @returns {Function} object.toggleSortDirection - 정렬 방향을 토글하는 함수
 * @returns {Function} object.resetSort - 정렬을 초기 상태로 재설정하는 함수
 */
const useSort = (data = [], initialSortBy = '', initialDirection = 'asc') => {
  // 정렬 기준 필드
  const [sortBy, setSortBy] = useState(initialSortBy);
  
  // 정렬 방향
  const [sortDirection, setSortDirection] = useState(initialDirection);
  
  // 정렬된 데이터
  const [sortedData, setSortedData] = useState(data);
  
  // 정렬 방향 토글 함수
  const toggleSortDirection = useCallback(() => {
    setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
  }, []);
  
  // 정렬 초기화 함수
  const resetSort = useCallback(() => {
    setSortBy(initialSortBy);
    setSortDirection(initialDirection);
  }, [initialSortBy, initialDirection]);
  
  // 정렬 기준 변경 핸들러
  const handleSort = useCallback((field) => {
    // 이미 같은 필드로 정렬 중인 경우 방향만 토글
    if (sortBy === field) {
      toggleSortDirection();
    } else {
      // 새 필드로 정렬 시 기본 오름차순
      setSortBy(field);
      setSortDirection('asc');
    }
  }, [sortBy, toggleSortDirection]);
  
  // 비교 함수 생성
  const compareFunction = useCallback((a, b) => {
    // 정렬 기준이 없는 경우
    if (!sortBy) return 0;
    
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // null, undefined 처리
    if (valueA === null || valueA === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (valueB === null || valueB === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    // 날짜 비교
    if (valueA instanceof Date && valueB instanceof Date) {
      return sortDirection === 'asc' 
        ? valueA.getTime() - valueB.getTime() 
        : valueB.getTime() - valueA.getTime();
    }
    
    // 날짜 문자열 비교
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      // ISO 날짜 형식인지 확인
      const dateA = new Date(valueA);
      const dateB = new Date(valueB);
      
      if (!isNaN(dateA) && !isNaN(dateB)) {
        return sortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      
      // 일반 문자열 비교
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    // 숫자 비교
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    // 기본 비교
    return sortDirection === 'asc' 
      ? String(valueA).localeCompare(String(valueB)) 
      : String(valueB).localeCompare(String(valueA));
  }, [sortBy, sortDirection]);
  
  // 데이터 또는 정렬 설정이 변경되면 정렬 수행
  useEffect(() => {
    if (!data || !data.length) {
      setSortedData([]);
      return;
    }
    
    if (!sortBy) {
      setSortedData([...data]);
      return;
    }
    
    const sorted = [...data].sort(compareFunction);
    setSortedData(sorted);
  }, [data, sortBy, sortDirection, compareFunction]);
  
  return {
    sortedData,
    sortBy,
    sortDirection,
    setSortBy: handleSort,
    setSortDirection,
    toggleSortDirection,
    resetSort
  };
};

export default useSort;
