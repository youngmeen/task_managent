/**
 * Card.js - 범용 카드 컴포넌트
 * 
 * 다양한 콘텐츠를 포함할 수 있는 기본 카드 레이아웃 컴포넌트입니다.
 * 제목, 본문, 푸터 영역을 지정할 수 있으며, 다양한 스타일 옵션을 지원합니다.
 * 
 * @component
 * 
 * @example
 * // 기본 사용법
 * <Card title="카드 제목">
 *   <p>카드 내용</p>
 * </Card>
 *
 * @example
 * // 모든 옵션 사용
 * <Card 
 *   title="카드 제목" 
 *   subtitle="부제목"
 *   headerRight={<Button size="small">액션</Button>} 
 *   footer={<div>푸터 영역</div>}
 *   padding="lg"
 *   variant="outlined"
 *   elevation={2}
 *   className="custom-class" 
 * >
 *   <p>카드 내용</p>
 * </Card>
 */

import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/Card.css'; // 스타일 디렉토리에서 불러오기

/**
 * Card 컴포넌트 - 다양한 콘텐츠를 담을 수 있는 컨테이너
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.title] - 카드 제목
 * @param {string} [props.subtitle] - 카드 부제목
 * @param {React.ReactNode} [props.headerRight] - 헤더 우측에 배치될 요소 (예: 버튼, 아이콘 등)
 * @param {React.ReactNode} props.children - 카드 내부 콘텐츠
 * @param {React.ReactNode} [props.footer] - 카드 하단 영역
 * @param {string} [props.className] - 추가 CSS 클래스명
 * @param {string} [props.padding='md'] - 내부 여백 크기 ('none', 'sm', 'md', 'lg')
 * @param {string} [props.variant='default'] - 카드 스타일 변형 ('default', 'outlined', 'flat')
 * @param {number} [props.elevation=1] - 그림자 깊이 (0-5)
 * @param {boolean} [props.hoverable=false] - 호버 효과 적용 여부
 * @param {Function} [props.onClick] - 카드 클릭 핸들러 (설정 시 카드가 클릭 가능해짐)
 * @returns {React.ReactElement} Card 컴포넌트
 */
const Card = ({
  title,
  subtitle,
  headerRight,
  children,
  footer,
  className = '',
  padding = 'md',
  variant = 'default',
  elevation = 1,
  hoverable = false,
  onClick
}) => {
  // 카드 기본 클래스와 추가 클래스, 옵션 기반 클래스를 결합
  const cardClasses = [
    'card',
    `card--padding-${padding}`,
    `card--variant-${variant}`,
    `card--elevation-${elevation}`,
    hoverable ? 'card--hoverable' : '',
    onClick ? 'card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  /**
   * 조건부 헤더 렌더링 - 제목, 부제목 또는 우측 요소가 있을 때만 헤더 표시
   * @returns {React.ReactElement|null} 카드 헤더 요소 또는 null
   */
  const renderHeader = () => {
    if (!title && !subtitle && !headerRight) return null;

    return (
      <div className="card__header">
        <div className="card__header-content">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <h4 className="card__subtitle">{subtitle}</h4>}
        </div>
        {headerRight && <div className="card__header-right">{headerRight}</div>}
      </div>
    );
  };

  /**
   * 조건부 푸터 렌더링 - 푸터 콘텐츠가 있을 때만 표시
   * @returns {React.ReactElement|null} 카드 푸터 요소 또는 null
   */
  const renderFooter = () => {
    if (!footer) return null;
    return <div className="card__footer">{footer}</div>;
  };

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? 'button' : undefined}>
      {renderHeader()}
      <div className="card__content">{children}</div>
      {renderFooter()}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerRight: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'outlined', 'flat']),
  elevation: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  hoverable: PropTypes.bool,
  onClick: PropTypes.func
};

export default Card;