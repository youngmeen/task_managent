import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSessionStorage, setSessionStorage, removeSessionStorage } from '../utils/storageUtils';

/**
 * 인증 관리를 위한 커스텀 훅
 * @returns {Object} 인증 관련 상태 및 함수들
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // 초기화: 세션 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const storedUser = getSessionStorage('user');
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);
  
  /**
   * 로그인 함수
   * @param {Object} userData - 사용자 데이터
   * @param {boolean} [rememberMe=false] - 로그인 유지 여부
   */
  const login = (userData, rememberMe = false) => {
    setUser(userData);
    setSessionStorage('user', userData);
    
    // 로그인 유지 옵션 처리 가능
    if (rememberMe) {
      // localStorage 등을 이용한 추가 처리
    }
    
    navigate('/dashboard');
  };
  
  /**
   * 로그아웃 함수
   */
  const logout = () => {
    setUser(null);
    removeSessionStorage('user');
    navigate('/login');
  };
  
  /**
   * 사용자 정보 업데이트 함수
   * @param {Object} userData - 업데이트할 사용자 데이터
   */
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    setSessionStorage('user', updatedUser);
  };
  
  /**
   * 인증 여부 확인 함수
   * @returns {boolean} 인증 여부
   */
  const isAuthenticated = () => {
    return !!user;
  };
  
  /**
   * 인증이 필요한 경로 접근 시 인증 여부 확인 후 리다이렉트
   * @param {string} [redirectPath='/login'] - 리다이렉트 경로
   */
  const requireAuth = (redirectPath = '/login') => {
    if (!isAuthenticated() && !isLoading) {
      navigate(redirectPath);
    }
  };
  
  return {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated,
    requireAuth
  };
};

export default useAuth;