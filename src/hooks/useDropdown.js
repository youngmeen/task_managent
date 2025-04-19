import { useState, useEffect, useRef } from 'react';

/**
 * 드롭다운 상태 관리를 위한 커스텀 훅
 * @param {boolean} [initialState=false] - 초기 열림 상태
 * @returns {Object} 드롭다운 관련 상태 및 함수들
 */
const useDropdown = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const dropdownRef = useRef(null);
  
  // 외부 클릭 감지 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
  
  /**
   * 드롭다운 토글 함수
   */
  const toggle = () => {
    setIsOpen(prevState => !prevState);
  };
  
  /**
   * 드롭다운 열기 함수
   */
  const open = () => {
    setIsOpen(true);
  };
  
  /**
   * 드롭다운 닫기 함수
   */
  const close = () => {
    setIsOpen(false);
  };
  
  return {
    isOpen,
    setIsOpen,
    toggle,
    open,
    close,
    dropdownRef
  };
};

export default useDropdown;