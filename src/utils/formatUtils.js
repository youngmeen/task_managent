/**
 * 포맷 유틸리티 모듈
 * 
 * 이 모듈은 다양한 데이터 유형의 포맷팅을 위한 함수들을 제공합니다.
 * 텍스트, 숫자, 날짜, 파일 크기 등의 포맷팅을 지원합니다.
 * 
 * 주요 사용 사례:
 * - 텍스트 길이 제한 및 말줄임표 처리
 * - 숫자 및 금액 포맷팅
 * - 전화번호, 이메일, 주소 등의 마스킹
 * - 파일 크기 단위 변환
 * - 퍼센트 변환 및 포맷팅
 */

/**
 * 텍스트 길이 제한 (말줄임표 처리)
 * 
 * 지정된 최대 길이를 초과하는 텍스트를 자르고 말줄임표를 추가합니다.
 * 
 * @param {string} text - 원본 텍스트
 * @param {number} maxLength - 최대 길이 (기본값: 50)
 * @param {string} ellipsis - 말줄임표 문자 (기본값: '...')
 * @returns {string} 제한된 텍스트
 * 
 * @example
 * // '이것은 긴 텍스트입니다...'
 * truncateText('이것은 긴 텍스트입니다. 이 텍스트는 최대 길이를 초과합니다.', 15);
 */
export const truncateText = (text, maxLength = 50, ellipsis = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + ellipsis;
};

/**
 * 숫자에 천 단위 구분자 추가
 * 
 * 숫자를 천 단위 구분자가 포함된 문자열로 변환합니다.
 * 
 * @param {number|string} num - 포맷팅할 숫자 또는 숫자 문자열
 * @param {string} locale - 사용할 로캘 (기본값: 'ko-KR')
 * @returns {string} 포맷팅된 숫자 문자열
 * 
 * @example
 * // '1,234,567'
 * formatNumber(1234567);
 */
export const formatNumber = (num, locale = 'ko-KR') => {
  if (num === undefined || num === null) return '';
  
  // 문자열을 숫자로 변환 시도
  const numValue = typeof num === 'string' ? parseFloat(num) : num;
  
  // 유효한 숫자가 아니면 원래 값 반환
  if (isNaN(numValue)) return num.toString();
  
  // Intl.NumberFormat을 사용해 로캘 기반 포맷팅 적용
  try {
    return new Intl.NumberFormat(locale).format(numValue);
  } catch (error) {
    // 폴백: 정규식을 사용한 포맷팅
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

/**
 * 통화 포맷팅
 * 
 * 금액을 통화 단위와 함께 표시합니다.
 * 
 * @param {number|string} amount - 포맷팅할 금액
 * @param {string} currency - 통화 코드 (기본값: 'KRW')
 * @param {string} locale - 사용할 로캘 (기본값: 'ko-KR')
 * @returns {string} 포맷팅된 통화 문자열
 * 
 * @example
 * // '₩1,234,567'
 * formatCurrency(1234567);
 * 
 * // '$1,234.57'
 * formatCurrency(1234.567, 'USD', 'en-US');
 */
export const formatCurrency = (amount, currency = 'KRW', locale = 'ko-KR') => {
  if (amount === undefined || amount === null) return '';
  
  // 문자열을 숫자로 변환 시도
  const numValue = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // 유효한 숫자가 아니면 원래 값 반환
  if (isNaN(numValue)) return amount.toString();
  
  // Intl.NumberFormat을 사용해 통화 포맷팅 적용
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      maximumFractionDigits: currency === 'KRW' ? 0 : 2
    }).format(numValue);
  } catch (error) {
    // 폴백: 간단한 포맷팅
    const formatter = {
      'KRW': (v) => `₩${formatNumber(v)}`,
      'USD': (v) => `$${formatNumber(v)}`,
      'EUR': (v) => `€${formatNumber(v)}`,
      'JPY': (v) => `¥${formatNumber(v)}`
    };
    
    return (formatter[currency] || formatter['KRW'])(numValue);
  }
};

/**
 * 퍼센트 포맷팅
 * 
 * 숫자를 퍼센트 형식으로 변환합니다.
 * 
 * @param {number|string} value - 포맷팅할 값 (0-1 사이 비율 또는 0-100 사이 퍼센트)
 * @param {boolean} isRatio - 값이 0-1 사이의 비율인지 여부 (기본값: true)
 * @param {number} fractionDigits - 소수점 자릿수 (기본값: 0)
 * @returns {string} 포맷팅된 퍼센트 문자열
 * 
 * @example
 * // '75%'
 * formatPercent(0.75);
 * 
 * // '75.5%'
 * formatPercent(0.755, true, 1);
 * 
 * // '75%'
 * formatPercent(75, false);
 */
export const formatPercent = (value, isRatio = true, fractionDigits = 0) => {
  if (value === undefined || value === null) return '';
  
  // 문자열을 숫자로 변환 시도
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // 유효한 숫자가 아니면 원래 값 반환
  if (isNaN(numValue)) return value.toString();
  
  // 0-1 사이의 비율 값이면 100을 곱해 퍼센트로 변환
  const percentValue = isRatio ? numValue * 100 : numValue;
  
  // 지정된 소수점 자릿수로 포맷팅
  return percentValue.toFixed(fractionDigits) + '%';
};

/**
 * 이메일 주소 마스킹
 * 
 * 이메일 주소의 일부를 '*' 문자로 가려 개인정보를 보호합니다.
 * 
 * @param {string} email - 마스킹할 이메일 주소
 * @returns {string} 마스킹된 이메일 주소
 * 
 * @example
 * // 'jo***@example.com'
 * maskEmail('john@example.com');
 */
export const maskEmail = (email) => {
  if (!email) return '';
  
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return email; // 유효하지 않은 이메일 형식
  
  const [name, domain] = [email.substring(0, atIndex), email.substring(atIndex)];
  let maskedName;
  
  if (name.length <= 2) {
    // 짧은 이름은 마지막 문자만 마스킹
    maskedName = name.substring(0, 1) + '*';
  } else if (name.length <= 5) {
    // 중간 길이 이름은 처음과 마지막 문자를 제외하고 마스킹
    maskedName = name.substring(0, 1) + '*'.repeat(name.length - 2) + name.substring(name.length - 1);
  } else {
    // 긴 이름은 처음 2글자와 마지막 1글자만 표시
    maskedName = name.substring(0, 2) + '*'.repeat(name.length - 3) + name.substring(name.length - 1);
  }
  
  return maskedName + domain;
};

/**
 * 전화번호 포맷팅
 * 
 * 전화번호를 읽기 쉬운 형식으로 포맷팅합니다.
 * 
 * @param {string} phone - 포맷팅할 전화번호 (숫자만 또는 하이픈 포함)
 * @param {string} format - 적용할 포맷 (기본값: '000-0000-0000')
 * @returns {string} 포맷팅된 전화번호
 * 
 * @example
 * // '010-1234-5678'
 * formatPhoneNumber('01012345678');
 * 
 * // '02-123-4567'
 * formatPhoneNumber('0212345678', '00-000-0000');
 */
export const formatPhoneNumber = (phone, format = '000-0000-0000') => {
  if (!phone) return '';
  
  // 전화번호에서 숫자만 추출
  const cleaned = phone.toString().replace(/\D/g, '');
  
  // format 문자열의 '0'을 숫자로 대체
  // 숫자가 부족하면 형식 문자열을 잘라서 사용
  let result = format;
  let digitIndex = 0;
  
  for (let i = 0; i < format.length && digitIndex < cleaned.length; i++) {
    if (format[i] === '0') {
      result = result.substring(0, i) + cleaned[digitIndex] + result.substring(i + 1);
      digitIndex++;
    }
  }
  
  // 남은 형식 문자열에서 사용되지 않은 '0' 제거
  result = result.replace(/0/g, '');
  
  // 만약 숫자가 더 남아있다면 끝에 추가
  if (digitIndex < cleaned.length) {
    result += '-' + cleaned.substring(digitIndex);
  }
  
  // 하이픈으로 끝나는 경우 제거
  return result.replace(/-+$/, '');
};

/**
 * 주소 마스킹
 * 
 * 주소의 일부를 마스킹하여 개인정보를 보호합니다.
 * 
 * @param {string} address - 마스킹할 주소
 * @param {number} visibleParts - 표시할 주소 부분 수 (기본값: 1)
 * @returns {string} 마스킹된 주소
 * 
 * @example
 * // '서울시 ***'
 * maskAddress('서울시 강남구 테헤란로');
 * 
 * // '서울시 강남구 ***'
 * maskAddress('서울시 강남구 테헤란로', 2);
 */
export const maskAddress = (address, visibleParts = 1) => {
  if (!address) return '';
  
  const parts = address.split(' ');
  
  if (parts.length <= visibleParts) {
    return address;
  }
  
  const visibleSection = parts.slice(0, visibleParts).join(' ');
  return visibleSection + ' ***';
};

/**
 * 파일 크기 포맷팅
 * 
 * 바이트 단위의 파일 크기를 사람이 읽기 쉬운 형식으로 변환합니다.
 * 
 * @param {number} bytes - 바이트 단위 크기
 * @param {number} decimals - 소수점 자릿수 (기본값: 2)
 * @returns {string} 포맷팅된 파일 크기
 * 
 * @example
 * // '1.46 MB'
 * formatFileSize(1529000);
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes || isNaN(bytes)) return '';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * 이름 이니셜 생성
 * 
 * 주어진 이름에서 이니셜을 생성합니다.
 * 
 * @param {string} name - 이름
 * @param {number} maxInitials - 최대 이니셜 글자 수 (기본값: 2)
 * @returns {string} 이니셜
 * 
 * @example
 * // 'JD'
 * getInitials('John Doe');
 * 
 * // 'JDD'
 * getInitials('John David Doe', 3);
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, maxInitials);
};

/**
 * 객체를 쿼리 문자열로 변환
 * 
 * JavaScript 객체를 URL 쿼리 문자열로 변환합니다.
 * 
 * @param {Object} params - 변환할 매개변수 객체
 * @returns {string} 생성된 쿼리 문자열
 * 
 * @example
 * // '?name=John&age=30'
 * objectToQueryString({ name: 'John', age: 30 });
 */
export const objectToQueryString = (params) => {
  if (!params || typeof params !== 'object') return '';
  
  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      // 배열은 여러 개의 동일한 키로 처리
      if (Array.isArray(value)) {
        return value
          .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join('&');
      }
      
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');
  
  return queryParams ? `?${queryParams}` : '';
};

/**
 * 복수형 단어 생성
 * 
 * 수량에 따라 적절한 단수/복수형 문자열을 반환합니다.
 * 
 * @param {number} count - 수량
 * @param {string} singular - 단수형 단어
 * @param {string} plural - 복수형 단어 (기본값: singular + 's')
 * @returns {string} 수량과 함께 포맷팅된 문자열
 * 
 * @example
 * // '1 item'
 * pluralize(1, 'item');
 * 
 * // '2 items'
 * pluralize(2, 'item');
 * 
 * // '3 children'
 * pluralize(3, 'child', 'children');
 */
export const pluralize = (count, singular, plural) => {
  if (!plural) {
    plural = singular + 's';
  }
  
  return `${count} ${count === 1 ? singular : plural}`;
};

/**
 * 시간 간격 포맷팅
 * 
 * 시작 시간과 종료 시간 사이의 간격을 형식화합니다.
 * 
 * @param {Date|string|number} start - 시작 시간
 * @param {Date|string|number} end - 종료 시간
 * @param {Object} options - 포맷팅 옵션
 * @param {boolean} options.includeSeconds - 초 단위까지 포함할지 여부 (기본값: false)
 * @param {string} options.separator - 시간 단위 구분자 (기본값: ' ')
 * @returns {string} 형식화된 시간 간격 문자열
 * 
 * @example
 * // '2시간 30분'
 * formatTimeInterval('2023-01-01T10:00:00', '2023-01-01T12:30:00');
 * 
 * // '2시간 30분 15초'
 * formatTimeInterval('2023-01-01T10:00:00', '2023-01-01T12:30:15', { includeSeconds: true });
 */
export const formatTimeInterval = (start, end, options = {}) => {
  const { includeSeconds = false, separator = ' ' } = options;
  
  // 시작 및 종료 시간을 밀리초로 변환
  const startTime = typeof start === 'string' || typeof start === 'number' 
    ? new Date(start).getTime() 
    : start.getTime();
  
  const endTime = typeof end === 'string' || typeof end === 'number' 
    ? new Date(end).getTime() 
    : end.getTime();
  
  // 유효하지 않은 시간이면 빈 문자열 반환
  if (isNaN(startTime) || isNaN(endTime)) return '';
  
  // 시간 간격 계산 (밀리초)
  let diff = Math.abs(endTime - startTime);
  
  // 시, 분, 초 계산
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  
  const seconds = Math.floor(diff / 1000);
  
  // 결과 포맷팅
  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours}시간`);
  }
  
  if (minutes > 0 || (hours > 0 && seconds > 0)) {
    parts.push(`${minutes}분`);
  }
  
  if (includeSeconds && seconds > 0) {
    parts.push(`${seconds}초`);
  }
  
  return parts.join(separator);
};

// 모듈화된 기능 그룹들을 위한 네임스페이스 객체 제공
export const formatUtils = {
  text: {
    truncate: truncateText,
    getInitials,
    pluralize
  },
  number: {
    format: formatNumber,
    currency: formatCurrency,
    percent: formatPercent
  },
  mask: {
    email: maskEmail,
    phone: formatPhoneNumber,
    address: maskAddress
  },
  file: {
    size: formatFileSize
  },
  url: {
    queryString: objectToQueryString
  },
  time: {
    interval: formatTimeInterval
  }
};

// 기본 내보내기
export default formatUtils;
