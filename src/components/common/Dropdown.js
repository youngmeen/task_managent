/**
 * Dropdown.js - 범용 드롭다운 컴포넌트
 * 
 * 클릭 시 하위 메뉴를 표시하는 컴포넌트입니다.
 * 버튼, 링크, 메뉴 항목 등 다양한 형태로 사용할 수 있습니다.
 * 
 * @component
 * 
 * @example
 * // 기본 사용법
 * <Dropdown 
 *   trigger={<Button>메뉴 열기</Button>}
 *   items={[
 *     { id: 'edit', label: '수정하기' },
 *     { id: 'delete', label: '삭제하기' }
 *   ]}
 *   onSelect={(item) => console.log('Selected:', item)}
 * />
 *
 * @example
 * // 다양한 옵션 사용
 * <Dropdown 
 *   trigger={<Button iconRight={<ArrowDownIcon />}>더보기</Button>}
 *   items={[
 *     { id: 'header', type: 'header', label: '작업 선택' },
 *     { id: 'view', label: '상세 보기', icon: <ViewIcon /> },
 *     { id: 'edit', label: '수정하기', icon: <EditIcon /> },
 *     { id: 'divider1', type: 'divider' },
 *     { id: 'delete', label: '삭제하기', icon: <DeleteIcon />, disabled: true }
 *   ]}
 *   position="bottom-right"
 *   onSelect={handleMenuSelect}
 * />
 */

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/Dropdown.css';

/**
 * Dropdown 컴포넌트 - 클릭 시 하위 메뉴를 표시
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} props.trigger - 드롭다운을 열기 위한 트리거 요소
 * @param {Array} props.items - 드롭다운 메뉴 항목 배열
 * @param {Function} [props.onSelect] - 항목 선택 시 호출되는 콜백 함수
 * @param {string} [props.position='bottom-left'] - 드롭다운 메뉴 위치 ('top-left', 'top-right', 'bottom-left', 'bottom-right')
 * @param {boolean} [props.closeOnSelect=true] - 항목 선택 시 드롭다운 메뉴 닫기 여부
 * @param {boolean} [props.closeOnClickOutside=true] - 외부 클릭 시 드롭다운 메뉴 닫기 여부
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @param {string} [props.menuClassName] - 메뉴 요소에 적용할 추가 CSS 클래스명
 * @returns {React.ReactElement} Dropdown 컴포넌트
 */
const Dropdown = ({
  trigger,
  items,
  onSelect,
  position = 'bottom-left',
  closeOnSelect = true,
  closeOnClickOutside = true,
  className = '',
  menuClassName = '',
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 드롭다운 토글 함수
  const toggleDropdown = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);
  
  // 드롭다운 닫기 함수
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  // 항목 선택 핸들러
  const handleItemSelect = useCallback((item) => {
    // 헤더나 구분선은 선택 불가
    if (item.type === 'header' || item.type === 'divider') return;
    // 비활성화된 항목은 선택 불가
    if (item.disabled) return;
    
    if (onSelect) {
      onSelect(item);
    }
    
    if (closeOnSelect) {
      closeDropdown();
    }
  }, [onSelect, closeOnSelect, closeDropdown]);
  
  // 외부 클릭 감지
  useEffect(() => {
    if (!closeOnClickOutside) return;
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside, closeDropdown]);

  // ESC 키 감지
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeDropdown]);
  
  // 드롭다운 메뉴 위치 클래스 생성
  const getPositionClasses = () => {
    const [vertical, horizontal] = position.split('-');
    return [
      `dropdown__menu--${vertical}`,
      `dropdown__menu--${horizontal}`
    ].join(' ');
  };
  
  // 드롭다운 메뉴 클래스 생성
  const getMenuClassNames = () => {
    return [
      'dropdown__menu',
      isOpen && 'dropdown__menu--open',
      getPositionClasses(),
      menuClassName
    ].filter(Boolean).join(' ');
  };
  
  // 드롭다운 항목 렌더링
  const renderItems = () => {
    return items.map((item, index) => {
      // 구분선
      if (item.type === 'divider') {
        return <div key={`divider-${index}`} className="dropdown__divider" />;
      }
      
      // 헤더
      if (item.type === 'header') {
        return <div key={`header-${index}`} className="dropdown__header">{item.label}</div>;
      }
      
      // 일반 항목
      const itemClasses = [
        'dropdown__item',
        item.active && 'dropdown__item--active',
        item.disabled && 'dropdown__item--disabled'
      ].filter(Boolean).join(' ');
      
      return (
        <div
          key={item.id || `item-${index}`}
          className={itemClasses}
          onClick={() => handleItemSelect(item)}
          role="menuitem"
          tabIndex={item.disabled ? -1 : 0}
        >
          {item.icon && <span className="dropdown__item-icon">{item.icon}</span>}
          {item.label}
        </div>
      );
    });
  };

  return (
    <div 
      className={`dropdown ${className}`}
      ref={dropdownRef}
      {...restProps}
    >
      <div className="dropdown__trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      
      <div 
        className={getMenuClassNames()}
        aria-hidden={!isOpen}
        role="menu"
      >
        {renderItems()}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node,
      icon: PropTypes.node,
      type: PropTypes.oneOf(['item', 'header', 'divider']),
      active: PropTypes.bool,
      disabled: PropTypes.bool
    })
  ).isRequired,
  onSelect: PropTypes.func,
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  closeOnSelect: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  className: PropTypes.string,
  menuClassName: PropTypes.string
};

// memo를 사용하여 불필요한 리렌더링 방지
export default memo(Dropdown);
