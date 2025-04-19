import React from 'react';

/**
 * 재사용 가능한 뱃지 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.text - 뱃지에 표시할 텍스트
 * @param {string} [props.color] - 뱃지 색상 (HEX 코드)
 * @param {string} [props.textColor] - 텍스트 색상 (기본값은 color와 동일)
 * @param {string} [props.className] - 추가 클래스
 */
const Badge = ({ 
  text, 
  color = '#6b7280', 
  textColor,
  className = '',
  ...props 
}) => {
  const badgeColor = color;
  const badgeTextColor = textColor || color;
  
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}
      style={{ 
        backgroundColor: `${badgeColor}20`, // 20% 투명도
        color: badgeTextColor 
      }}
      {...props}
    >
      {text}
    </span>
  );
};

export default Badge;