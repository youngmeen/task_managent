import { useState, useEffect } from 'react';

/**
 * 모달 상태 관리를 위한 커스텀 훅
 * @param {boolean} [initialState=false] - 초기 모달 열림 상태
 * @returns {Object} 모달 관련 상태 및 함수들
 */
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);
  
  // 모달 열림/닫힘 시 body 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 스크롤 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 모달 닫힐 때 스크롤 복원
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  /**
   * 모달 열기 함수
   * @param {any} modalData - 모달에 전달할 데이터
   */
  const open = (modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  };
  
  /**
   * 모달 닫기 함수
   */
  const close = () => {
    setIsOpen(false);
    // 닫을 때 데이터 초기화 (필요에 따라 주석 해제)
    // setData(null);
  };
  
  /**
   * 모달 토글 함수
   * @param {any} modalData - 모달에 전달할 데이터 (열 때만 사용)
   */
  const toggle = (modalData = null) => {
    if (!isOpen && modalData !== null) {
      setData(modalData);
    }
    setIsOpen(prevState => !prevState);
  };
  
  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setIsOpen,
    setData
  };
};

export default useModal;