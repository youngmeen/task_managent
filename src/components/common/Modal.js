/**
 * Modal.js - 범용 모달 컴포넌트
 * 
 * 팝업 형태로 콘텐츠를 보여주는 모달 컴포넌트입니다.
 * 헤더, 본문, 푸터 영역을 지정할 수 있으며, 백드롭 클릭, ESC 키 등으로 닫을 수 있습니다.
 * 
 * @component
 * 
 * @example
 * // 기본 사용법
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
 * 
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   title="알림"
 * >
 *   <p>모달 내용입니다.</p>
 * </Modal>
 *
 * @example
 * // 푸터가 있는 확인 모달
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   title="작업 확인"
 *   footer={
 *     <>
 *       <Button variant="text" onClick={() => setIsOpen(false)}>취소</Button>
 *       <Button variant="contained" onClick={handleConfirm}>확인</Button>
 *     </>
 *   }
 * >
 *   <p>이 작업을 진행하시겠습니까?</p>
 * </Modal>
 */

import React, { useEffect, useRef, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '../../../styles/Modal.css';

/**
 * Modal 컴포넌트 - 팝업 형태로 콘텐츠를 표시
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 핸들러
 * @param {string} [props.title] - 모달 제목
 * @param {React.ReactNode} props.children - 모달 내부 콘텐츠
 * @param {React.ReactNode} [props.footer] - 모달 하단 영역 (버튼 등)
 * @param {string} [props.size='md'] - 모달 크기 ('sm', 'md', 'lg', 'xl', 'full')
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @param {boolean} [props.closeOnBackdrop=true] - 백드롭 클릭 시 닫기 여부
 * @param {boolean} [props.closeOnEsc=true] - ESC 키 누름 시 닫기 여부
 * @param {boolean} [props.showCloseButton=true] - 닫기 버튼 표시 여부
 * @returns {React.ReactPortal|null} Modal 컴포넌트
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
  closeOnBackdrop = true,
  closeOnEsc = true,
  showCloseButton = true,
  ...restProps
}) => {
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // ESC 키 핸들러
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && closeOnEsc) {
      onClose();
    }

    // 포커스 트래핑 - Tab 키로 모달 내부의 포커스 가능 요소들만 탐색하도록 제한
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab: 첫 요소에서 마지막 요소로 포커스 이동
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        // Tab: 마지막 요소에서 첫 요소로 포커스 이동
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    }
  }, [closeOnEsc, onClose]);

  // 백드롭 클릭 핸들러
  const handleBackdropClick = useCallback((e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);

  // 포커스 가능한 요소들 찾기
  const setFocusableElements = useCallback(() => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      firstFocusableRef.current.focus();
    } else {
      // 포커스 가능한 요소가 없다면 모달 자체에 포커스
      modalRef.current.focus();
    }
  }, []);

  // 모달 열림/닫힘 효과
  useEffect(() => {
    if (isOpen) {
      // 모달 열릴 때 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 포커스 설정 (약간의 지연을 두어 DOM이 모두 렌더링된 후에 적용)
      const timer = setTimeout(() => {
        setFocusableElements();
      }, 50);
      
      // 키보드 이벤트 리스너 등록
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // 모달 닫힐 때 스크롤 복원
      document.body.style.overflow = '';
    }
  }, [isOpen, handleKeyDown, setFocusableElements]);

  // 클래스명 생성 함수
  const getModalClassNames = () => {
    return [
      'modal',
      `modal--size-${size}`,
      isOpen && 'modal--visible',
      className
    ].filter(Boolean).join(' ');
  };

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className={`modal-overlay ${isOpen ? 'modal-overlay--visible' : ''}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={getModalClassNames()}
        ref={modalRef}
        tabIndex={-1}
        {...restProps}
      >
        {(title || showCloseButton) && (
          <header className="modal__header">
            {title && <h2 className="modal__title">{title}</h2>}
            {showCloseButton && (
              <button 
                type="button" 
                className="modal__close" 
                onClick={onClose}
                aria-label="닫기"
              >
                ×
              </button>
            )}
          </header>
        )}
        
        <div className="modal__content">
          {children}
        </div>
        
        {footer && (
          <footer className="modal__footer">
            {footer}
          </footer>
        )}
      </div>
    </div>,
    document.body
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  className: PropTypes.string,
  closeOnBackdrop: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  showCloseButton: PropTypes.bool
};

// memo를 사용하여 불필요한 리렌더링 방지
export default memo(Modal);
