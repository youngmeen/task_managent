/**
 * useModal.js - 모달 상태 관리를 위한 커스텀 훅
 * 
 * 모달의 열림/닫힘 상태와 관련 기능을 제공하는 커스텀 훅입니다.
 * 컴포넌트에서 모달 상태 관리 로직을 분리하여 재사용성을 높입니다.
 * 
 * @example
 * // 기본 사용법
 * const { isOpen, openModal, closeModal, toggleModal } = useModal();
 * 
 * // 초기 상태 설정
 * const { isOpen, openModal, closeModal } = useModal(true);
 */

import { useState, useCallback } from 'react';

/**
 * 모달 상태 관리를 위한 커스텀 훅
 * 
 * @param {boolean} initialState - 모달의 초기 상태 (기본값: false)
 * @returns {Object} 모달 상태와 컨트롤 함수들을 포함한 객체
 * @returns {boolean} object.isOpen - 모달이 열려있는지 여부
 * @returns {Function} object.openModal - 모달을 여는 함수
 * @returns {Function} object.closeModal - 모달을 닫는 함수
 * @returns {Function} object.toggleModal - 모달 상태를 토글하는 함수
 */
const useModal = (initialState = false) => {
  // 모달 상태
  const [isOpen, setIsOpen] = useState(initialState);
  
  // 모달 열기 함수
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);
  
  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  // 모달 토글 함수
  const toggleModal = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

export default useModal;
