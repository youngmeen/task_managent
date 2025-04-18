import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Moon, Settings, Globe, LogOut, Clock } from 'lucide-react';
import Header from '../components/Header';
import { userProfile, userNotifications, userActivities } from '../data/userData';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'notifications', 'activities', 'settings'
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // 로그인 상태 확인
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    // 프로필 데이터 로드
    setProfile(userProfile);
    setEditableProfile(userProfile);
    setNotifications(userNotifications);
    setActivities(userActivities);
  }, [navigate]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableProfile(profile);
  };
  
  const handleSaveProfile = () => {
    setProfile(editableProfile);
    setIsEditing(false);
    // 실제로는 여기서 API 호출로 저장해야 함
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({
      ...editableProfile,
      [name]: value
    });
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };
  
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };
  
  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '어제';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 프로필 정보 탭
  const renderProfileTab = () => {
    if (!profile) return null;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-baemin">프로필 정보</h2>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              프로필 수정
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                취소
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                저장
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                <User className="h-8 w-8" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 font-baemin">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editableProfile.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                    />
                  ) : (
                    profile.name
                  )}
                </h3>
                <p className="text-sm text-gray-500">
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={editableProfile.position}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.position
                  )}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">이름</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editableProfile.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.name
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">부서</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={editableProfile.department}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.department
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">직급</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={editableProfile.position}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.position
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">이메일</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editableProfile.email}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.email
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">전화번호</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editableProfile.phoneNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.phoneNumber
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">입사일</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="date"
                      name="joinDate"
                      value={editableProfile.joinDate}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    new Date(profile.joinDate).toLocaleDateString('ko-KR')
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">소개</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editableProfile.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  ) : (
                    profile.bio
                  )}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">기술 스택</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <div className="flex flex-wrap gap-2">
                      {editableProfile.skills.map((skill, index) => (
                        <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                          {skill}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-indigo-100 rounded-full px-3 py-1 text-sm font-medium text-indigo-800"
                      >
                        + 추가
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  };
  
  // 알림 탭
  const renderNotificationsTab = () => {
    const unreadCount = notifications.filter(notification => !notification.read).length;
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-baemin">알림</h2>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              모두 읽음으로 표시
            </button>
          )}
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {notifications.length === 0 ? (
            <div className="px-4 py-10 text-center text-gray-500">
              알림이 없습니다
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li 
                  key={notification.id}
                  className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-indigo-50'}`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      {notification.type === 'task' && (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-lg">T</span>
                        </div>
                      )}
                      {notification.type === 'reminder' && (
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <span className="text-yellow-600 text-lg">R</span>
                        </div>
                      )}
                      {notification.type === 'mention' && (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-lg">M</span>
                        </div>
                      )}
                      {notification.type === 'update' && (
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 text-lg">U</span>
                        </div>
                      )}
                      {notification.type === 'system' && (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-600 text-lg">S</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-indigo-600'}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(notification.date)} {formatTime(notification.date)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  // 활동 내역 탭
  const renderActivitiesTab = () => {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-baemin">활동 내역</h2>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {activities.length === 0 ? (
            <div className="px-4 py-10 text-center text-gray-500">
              활동 내역이 없습니다
            </div>
          ) : (
            <div className="flow-root px-4 py-4">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 && (
                        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      )}
                      <div className="relative flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center ring-8 ring-white">
                          <span className="text-indigo-600 text-lg">
                            {activity.type.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 py-1.5">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{activity.description}</span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {formatDate(activity.date)} {formatTime(activity.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // 설정 탭
  const renderSettingsTab = () => {
    if (!profile) return null;
    
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 font-baemin">설정</h2>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 font-baemin">알림 설정</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="email-notifications"
                  name="email-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked={profile.notifications.email}
                />
                <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                  이메일 알림
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="desktop-notifications"
                  name="desktop-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked={profile.notifications.desktop}
                />
                <label htmlFor="desktop-notifications" className="ml-3 text-sm text-gray-700">
                  데스크톱 알림
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mobile-notifications"
                  name="mobile-notifications"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked={profile.notifications.mobile}
                />
                <label htmlFor="mobile-notifications" className="ml-3 text-sm text-gray-700">
                  모바일 알림
                </label>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 font-baemin">디스플레이 설정</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                  테마
                </label>
                <select
                  id="theme"
                  name="theme"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={profile.theme}
                >
                  <option value="light">밝은 테마</option>
                  <option value="dark">어두운 테마</option>
                  <option value="system">시스템 설정에 따름</option>
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  언어
                </label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue={profile.language}
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 font-baemin">계정 설정</h3>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => alert('비밀번호 변경 기능은 준비 중입니다.')}
              >
                비밀번호 변경
              </button>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="spinner-border text-indigo-500" role="status">
            <span className="sr-only">로딩중...</span>
          </div>
          <p className="mt-2 text-gray-500">프로필 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-baemin">
            내 프로필
          </h1>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('profile')}
              className={`pb-3 px-1 border-b-2 font-baemin font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <User className="h-5 w-5 inline mr-1 -mt-0.5" />
              프로필 정보
            </button>
            <button
              onClick={() => handleTabChange('notifications')}
              className={`pb-3 px-1 border-b-2 font-baemin font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <Bell className="h-5 w-5 inline mr-1 -mt-0.5" />
              알림
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleTabChange('activities')}
              className={`pb-3 px-1 border-b-2 font-baemin font-medium text-sm ${
                activeTab === 'activities'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <Clock className="h-5 w-5 inline mr-1 -mt-0.5" />
              활동 내역
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`pb-3 px-1 border-b-2 font-baemin font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <Settings className="h-5 w-5 inline mr-1 -mt-0.5" />
              설정
            </button>
          </nav>
        </div>
        
        {/* 탭 내용 */}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'activities' && renderActivitiesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
    </div>
  );
};

export default Profile;