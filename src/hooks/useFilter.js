/**
 * useFilter.js - 데이터 필터링을 위한 커스텀 훅
 * 
 * 다양한 조건으로 데이터를 필터링하는 기능을 제공하는 커스텀 훅입니다.
 * 배열 형태의 데이터에 여러 필터 조건을 적용하여 필터링된 결과를 반환합니다.
 * 
 * @example
 * // 기본 사용법
 * const tasks = [...];
 * const { 
 *   filteredData, 
 *   filters, 
 *   setFilter, 
 *   resetFilters 
 * } = useFilter(tasks);
 * 
 * // 필터 설정하기
 * setFilter('status', '진행중');
 * setFilter('priority', '높음');
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * 데이터 필터링을 위한 커스텀 훅
 * 
 * @param {Array} data - 필터링할 원본 데이터 배열
 * @param {Object} initialFilters - 초기 필터 상태 (기본값: {})
 * @returns {Object} 필터링 상태와 컨트롤 함수들을 포함한 객체
 * @returns {Array} object.filteredData - 필터링된 데이터 배열
 * @returns {Object} object.filters - 현재 적용된 필터 객체
 * @returns {Function} object.setFilter - 특정 필터 값을 설정하는 함수
 * @returns {Function} object.removeFilter - 특정 필터를 제거하는 함수
 * @returns {Function} object.resetFilters - 모든 필터를 초기화하는 함수
 * @returns {boolean} object.hasActiveFilters - 활성화된 필터가 있는지 여부
 */
const useFilter = (data = [], initialFilters = {}) => {
  // 필터 상태
  const [filters, setFilters] = useState(initialFilters);
  
  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState(data);
  
  // 특정 필터 설정 함수
  const setFilter = useCallback((key, value) => {
    setFilters(prevFilters => {
      // 이미 같은 값으로 필터링되어 있다면 해당 필터 제거
      if (prevFilters[key] === value) {
        const newFilters = { ...prevFilters };
        delete newFilters[key];
        return newFilters;
      }
      
      // 새 필터 값 설정
      return {
        ...prevFilters,
        [key]: value
      };
    });
  }, []);
  
  // 특정 필터 제거 함수
  const removeFilter = useCallback((key) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  }, []);
  
  // 모든 필터 초기화 함수
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);
  
  // 활성화된 필터가 있는지 여부
  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [filters]);
  
  // 데이터가 변경되면 필터링 수행
  useEffect(() => {
    if (!data || !data.length) {
      setFilteredData([]);
      return;
    }
    
    if (!hasActiveFilters) {
      setFilteredData(data);
      return;
    }
    
    // 필터링 로직
    const filtered = data.filter(item => {
      // 모든 필터 조건을 만족해야 함 (AND 조건)
      return Object.entries(filters).every(([key, value]) => {
        // 필터 값이 없거나 빈 문자열이면 해당 필터 무시
        if (value === undefined || value === null || value === '') {
          return true;
        }
        
        // 배열 필드 필터링 (예: tags)
        if (Array.isArray(item[key])) {
          return item[key].includes(value);
        }
        
        // 문자열 필드 필터링 (부분 일치)
        if (typeof item[key] === 'string' && typeof value === 'string') {
          return item[key].toLowerCase().includes(value.toLowerCase());
        }
        
        // 정확히 일치하는 경우
        return item[key] === value;
      });
    });
    
    setFilteredData(filtered);
  }, [data, filters, hasActiveFilters]);
  
  return {
    filteredData,
    filters,
    setFilter,
    removeFilter,
    resetFilters,
    hasActiveFilters
  };
};

export default useFilter;
