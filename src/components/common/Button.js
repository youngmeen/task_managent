/**
 * @file Button.js
 * @description 재사용 가능한 버튼 컴포넌트
 *
 * 이 버튼 컴포넌트는 다양한 스타일, 크기, 상태를 지원하며 시스템 전반에서
 * 일관된 UI 경험을 제공하기 위해 설계되었습니다. 애플리케이션의 모든 버튼 요소는
 * 이 컴포넌트를 사용하여 구현해야 합니다.
 *
 * @example
 * // 기본 사용법
 * import Button from '../components/common/Button';
 *
 * function MyComponent() {
 *   return (
 *     <Button variant="primary" onClick={() => console.log('클릭됨!')}>
 *       버튼 텍스트
 *     </Button>
 *   );
 * }
 *
 * @example
 * // 아이콘과 함께 사용
 * import Button from '../components/common/Button';
 * import { Save, ArrowRight } from 'lucide-react';
 *
 * function IconButtons() {
 *   return (
 *     <div className="space-x-4">
 *       <Button variant="primary" leftIcon={<Save size={16} />}>
 *         저장하기
 *       </Button>
 *
 *       <Button variant="success" rightIcon={<ArrowRight size={16} />}>
 *         다음으로
 *       </Button>
 *
 *       <Button variant="secondary" iconButton={true}>
 *         <ArrowRight size={16} />
 *       </Button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // 로딩 상태 버튼
 * import Button from '../components/common/Button';
 * import { useState } from 'react';
 *
 * function LoadingButton() {
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleClick = () => {
 *     setIsLoading(true);
 *     // 비동기 작업 예시
 *     setTimeout(() => {
 *       setIsLoading(false);
 *     }, 2000);
 *   };
 *
 *   return (
 *     <Button
 *       variant="primary"
 *       onClick={handleClick}
 *       isLoading={isLoading}
 *       loadingText="처리중..."
 *     >
 *       데이터 저장
 *     </Button>
 *   );
 * }
 *
 * @example
 * // 다양한 스타일 예시
 * import Button from '../components/common/Button';
 *
 * function ButtonVariants() {
 *   return (
 *     <div className="space-y-4">
 *       <div className="space-x-2">
 *         <Button variant="primary">Primary</Button>
 *         <Button variant="secondary">Secondary</Button>
 *         <Button variant="outline">Outline</Button>
 *       </div>
 *
 *       <div className="space-x-2">
 *         <Button variant="danger">Danger</Button>
 *         <Button variant="success">Success</Button>
 *         <Button variant="warning">Warning</Button>
 *       </div>
 *
 *       <div className="space-x-2">
 *         <Button variant="info">Info</Button>
 *         <Button variant="light">Light</Button>
 *         <Button variant="dark">Dark</Button>
 *       </div>
 *
 *       <div className="space-x-2">
 *         <Button variant="primary" size="xs">Extra Small</Button>
 *         <Button variant="primary" size="sm">Small</Button>
 *         <Button variant="primary" size="md">Medium</Button>
 *         <Button variant="primary" size="lg">Large</Button>
 *         <Button variant="primary" size="xl">Extra Large</Button>
 *       </div>
 *
 *       <div className="space-x-2">
 *         <Button variant="primary" rounded={true}>Rounded</Button>
 *         <Button variant="success" elevated={true}>Elevated</Button>
 *         <Button variant="warning" disabled={true}>Disabled</Button>
 *         <Button variant="primary" fullWidth={true}>Full Width</Button>
 *       </div>
 *     </div>
 *   );
 * }
 *
 * @example
 * // 이벤트 핸들링 예시
 * import Button from '../components/common/Button';
 *
 * function EventHandling() {
 *   // 단순 클릭 이벤트
 *   const handleClick = () => {
 *     console.log('버튼이 클릭되었습니다!');
 *   };
 *
 *   // 이벤트 객체 사용
 *   const handleEventClick = (event) => {
 *     event.preventDefault(); // 기본 동작 방지
 *     console.log('클릭 위치:', event.clientX, event.clientY);
 *   };
 *
 *   // 추가 데이터 전달
 *   const handleItemClick = (itemId) => () => {
 *     console.log(`아이템 ${itemId} 클릭됨`);
 *     // 해당 아이템 처리 로직
 *   };
 *
 *   return (
 *     <div className="space-y-4">
 *       <Button onClick={handleClick}>기본 클릭</Button>
 *       <Button onClick={handleEventClick}>이벤트 객체 사용</Button>
 *       <Button onClick={handleItemClick(123)}>아이템 123 처리</Button>
 *     </div>
 *   );
 * }
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 다양한 유형과 크기를 지원하는 Button 컴포넌트
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {string} [props.variant='primary'] - 버튼 스타일 (primary, secondary, outline, danger, success, warning, info, light, dark)
 * @param {string} [props.size='md'] - 버튼 크기 (xs, sm, md, lg, xl)
 * @param {boolean} [props.fullWidth=false] - 가로 전체 너비 적용 여부
 * @param {boolean} [props.rounded=false] - 둥근 모서리 적용 여부 (기본값 rounded-md, true일 경우 rounded-full)
 * @param {boolean} [props.elevated=false] - 그림자 효과 적용 여부
 * @param {boolean} [props.iconButton=false] - 아이콘 전용 버튼 여부 (padding 조정)
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {Function} [props.onClick] - 클릭 이벤트 핸들러
 *        예시: onClick={() => console.log('클릭됨')}
 *        예시: onClick={(e) => handleClickWithEvent(e)}
 *        예시: onClick={handleClick}
 *        예시: onClick={handleItemClick(id)}
 * @param {string} [props.type='button'] - 버튼 타입 (button, submit, reset)
 * @param {boolean} [props.disabled=false] - 비활성화 여부
 * @param {string} [props.className] - 추가 클래스명
 * @param {React.ReactNode} [props.leftIcon] - 버튼 왼쪽에 표시할 아이콘
 * @param {React.ReactNode} [props.rightIcon] - 버튼 오른쪽에 표시할 아이콘
 * @param {boolean} [props.isLoading=false] - 로딩 상태 표시 여부
 * @param {string} [props.loadingText] - 로딩 중 표시할 텍스트 (없으면 기존 children 사용)
 * @returns {React.ReactElement} Button 컴포넌트
 */
const Button = ({
	                variant = 'primary',
	                size = 'md',
	                fullWidth = false,
	                rounded = false,
	                elevated = false,
	                iconButton = false,
	                children,
	                onClick,
	                type = 'button',
	                disabled = false,
	                className = '',
	                leftIcon = null,
	                rightIcon = null,
	                isLoading = false,
	                loadingText = '',
	                ...props
                }) => {
	/**
	 * 버튼의 기본 스타일을 정의합니다.
	 * - 모든 버튼에 공통으로 적용되는 스타일입니다.
	 * - 포커스, 트랜지션 등의 기본 속성을 포함합니다.
	 */
	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

	/**
	 * 버튼 변형에 따른 스타일을 정의합니다.
	 * - primary: 기본 강조 버튼 (파란색/보라색)
	 * - secondary: 보조 버튼 (회색)
	 * - outline: 테두리만 있는 버튼
	 * - danger: 위험/삭제 작업용 버튼 (빨간색)
	 * - success: 성공/확인 작업용 버튼 (녹색)
	 * - warning: 주의가 필요한 작업용 버튼 (주황색)
	 * - info: 정보 제공 관련 버튼 (하늘색)
	 * - light: 밝은 배경색 버튼
	 * - dark: 어두운 배경색 버튼
	 */
	const variantStyles = {
		primary: 'text-white bg-indigo-600 hover:bg-indigo-700 border border-transparent focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800',
		secondary: 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:ring-gray-500',
		outline: 'text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 border border-indigo-500 dark:border-indigo-400 focus:ring-indigo-500',
		danger: 'text-white bg-red-600 hover:bg-red-700 border border-transparent focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800',
		success: 'text-white bg-green-600 hover:bg-green-700 border border-transparent focus:ring-green-500 dark:bg-green-700 dark:hover:bg-green-800',
		warning: 'text-white bg-yellow-600 hover:bg-yellow-700 border border-transparent focus:ring-yellow-500 dark:bg-yellow-700 dark:hover:bg-yellow-800',
		info: 'text-white bg-blue-500 hover:bg-blue-600 border border-transparent focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700',
		light: 'text-gray-800 bg-gray-100 hover:bg-gray-200 border border-gray-200 focus:ring-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700',
		dark: 'text-white bg-gray-800 hover:bg-gray-900 border border-transparent focus:ring-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800',
	};

	/**
	 * 버튼 크기에 따른 스타일을 정의합니다.
	 * 텍스트 크기와 패딩을 포함합니다.
	 */
	const sizeStyles = {
		xs: iconButton ? 'p-1 text-xs' : 'text-xs px-2 py-1',
		sm: iconButton ? 'p-1.5 text-sm' : 'text-xs px-2.5 py-1.5',
		md: iconButton ? 'p-2 text-base' : 'text-sm px-4 py-2',
		lg: iconButton ? 'p-2.5 text-lg' : 'text-base px-6 py-3',
		xl: iconButton ? 'p-3 text-xl' : 'text-lg px-8 py-4',
	};

	/**
	 * 버튼 모서리 반경을 정의합니다.
	 */
	const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';

	/**
	 * 그림자 효과를 정의합니다.
	 */
	const shadowStyles = elevated ? 'shadow-md hover:shadow-lg' : '';

	/**
	 * 너비 스타일을 정의합니다.
	 */
	const widthStyles = fullWidth ? 'w-full' : '';

	/**
	 * 비활성화 및 로딩 상태 스타일을 정의합니다.
	 */
	const stateStyles = (disabled || isLoading) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';

	/**
	 * 로딩 상태 표시를 위한 스피너 컴포넌트
	 * @returns {React.ReactElement} 로딩 스피너 SVG
	 */
	const LoadingSpinner = () => (<svg
			className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-25"
				cx="12" cy="12" r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>);

	/**
	 * 모든 스타일을 조합하여 최종 클래스명을 생성합니다.
	 */
	const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant] || variantStyles.primary} 
    ${sizeStyles[size] || sizeStyles.md} 
    ${roundedStyles} 
    ${shadowStyles} 
    ${widthStyles} 
    ${stateStyles} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

	/**
	 * ButtonProps.onClick 사용 예시:
	 *
	 * 1. 단순 함수 전달
	 * <Button onClick={handleClick}>...
	 *
	 * 2. 익명 화살표 함수
	 * <Button onClick={() => handleAction()}>
	 *
	 * 3. 이벤트 객체 사용
	 * <Button onClick={(e) => { e.preventDefault(); doSomething(); }}>
	 *
	 * 4. 추가 매개변수 전달
	 * <Button onClick={() => handleItemAction(itemId)}>
	 * - 또는 -
	 * <Button onClick={handleItemAction(itemId)}> // 클로저를 반환하는 함수
	 *
	 * 5. disabled/isLoading 상태에서는 onClick이 호출되지 않습니다
	 */
	return (<button
			type={type}
			className={buttonClasses}
			onClick={onClick}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading && <LoadingSpinner/>}

			{leftIcon && !isLoading && (<span className="mr-2">{leftIcon}</span>)}

			{isLoading && loadingText ? loadingText : children}

			{rightIcon && !isLoading && (<span className="ml-2">{rightIcon}</span>)}
		</button>);
};

// PropTypes 정의
Button.propTypes = {
	/** 버튼 스타일 변형 */
	variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success', 'warning', 'info', 'light', 'dark']),
	/** 버튼 크기 */
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	/** 가로 전체 너비 적용 여부 */
	fullWidth: PropTypes.bool,
	/** 둥근 모서리 적용 여부 */
	rounded: PropTypes.bool,
	/** 그림자 효과 적용 여부 */
	elevated: PropTypes.bool,
	/** 아이콘 전용 버튼 여부 */
	iconButton: PropTypes.bool,
	/** 버튼 내용 */
	children: PropTypes.node.isRequired,
	/** 클릭 이벤트 핸들러 */
	onClick: PropTypes.func,
	/** 버튼 타입 */
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	/** 비활성화 여부 */
	disabled: PropTypes.bool,
	/** 추가 클래스명 */
	className: PropTypes.string,
	/** 버튼 왼쪽에 표시할 아이콘 */
	leftIcon: PropTypes.node,
	/** 버튼 오른쪽에 표시할 아이콘 */
	rightIcon: PropTypes.node,
	/** 로딩 상태 표시 여부 */
	isLoading: PropTypes.bool,
	/** 로딩 중 표시할 텍스트 */
	loadingText: PropTypes.string,
};

export default Button;
