/**
 * Badge.js - 범용 뱃지 컴포넌트
 * 
 * 상태, 알림, 카운터 등을 표시하기 위한 작은 UI 요소입니다.
 * 독립적으로 사용하거나, 다른 컴포넌트의 우측 상단에 배치하여 사용할 수 있습니다.
 * 
 * @component
 * 
 * @example
 * // 독립형 뱃지
 * <Badge content="New" color="primary" />
 *
 * @example
 * // 컴포넌트에 부착된 뱃지
 * <Badge content={5} color="error">
 *   <Button>메시지</Button>
 * </Badge>
 * 
 * @example
 * // 최대값 설정 뱃지
 * <Badge content={100} max={99} color="error">
 *   <IconButton>
 *     <NotificationIcon />
 *   </IconButton>
 * </Badge>
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/Badge.css';

/**
 * Badge 컴포넌트 - 상태나 알림을 표시하는 작은 마커
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {React.ReactNode} [props.children] - 뱃지가 부착될 자식 요소
 * @param {React.ReactNode} [props.content] - 뱃지에 표시될 내용 (숫자 또는 텍스트)
 * @param {string} [props.color='default'] - 뱃지 색상 ('default', 'primary', 'secondary', 'success', 'error', 'warning', 'info')
 * @param {boolean} [props.dot=false] - 내용 없이 점으로만 표시할지 여부
 * @param {number} [props.max] - 내용이 숫자일 때 최대값 (초과 시 'max+' 형태로 표시)
 * @param {boolean} [props.showZero=false] - 내용이 0일 때도 표시할지 여부
 * @param {boolean} [props.outlined=false] - 외곽선 스타일 적용 여부
 * @param {boolean} [props.pulse=false] - 펄스 애니메이션 적용 여부
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @returns {React.ReactElement} Badge 컴포넌트
 */
const Badge = ({
  children,
  content,
  color = 'default',
  dot = false,
  max,
  showZero = false,
  outlined = false,
  pulse = false,
  className = '',
  ...restProps
}) => {
  // 배지 내용 표시 여부 확인
  const shouldShowBadge = () => {
    if (dot) return true;
    if (content === 0) return showZero;
    return content !== undefined && content !== null;
  };

  // 표시할 텍스트 결정
  const getDisplayContent = () => {
    if (dot) return null;
    
    if (typeof content === 'number' && max !== undefined && content > max) {
      return `${max}+`;
    }
    
    return content;
  };

  // 클래스명 생성
  const getBadgeClassNames = () => {
    return [
      'badge',
      color !== 'default' && `badge--${color}`,
      dot && 'badge--dot',
      outlined && 'badge--outlined',
      pulse && 'badge--pulse',
      max !== undefined && 'badge--max',
      !children && 'badge--standalone',
      children && 'badge--positioned',
      className
    ].filter(Boolean).join(' ');
  };

  // 배지가 표시되지 않아야 하면 자식만 반환
  if (!shouldShowBadge()) {
    return children || null;
  }

  // 독립형 배지 (자식 없음)
  if (!children) {
    return (
      <span className={getBadgeClassNames()} {...restProps}>
        {getDisplayContent()}
      </span>
    );
  }

  // 자식에 부착된 배지
  return (
    <span className="badge-wrapper">
      {children}
      <span className={getBadgeClassNames()} {...restProps}>
        {getDisplayContent()}
      </span>
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info']),
  dot: PropTypes.bool,
  max: PropTypes.number,
  showZero: PropTypes.bool,
  outlined: PropTypes.bool,
  pulse: PropTypes.bool,
  className: PropTypes.string
};

// memo를 사용하여 불필요한 리렌더링 방지
export default memo(Badge);
