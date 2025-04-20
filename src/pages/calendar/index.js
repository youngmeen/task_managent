import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';
import Header from '../../components/layouts/Header';
import { calendarEvents, eventTypeOptions } from '../../data/calendarData';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  
  const navigate = useNavigate();
  
  // 로그인 상태 확인 및 이벤트 로드
  useEffect(() => {
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    // 이벤트 데이터 포맷팅
    const formattedEvents = calendarEvents.map(event => ({
      ...event,
      startDate: new Date(event.start),
      endDate: new Date(event.end),
      typeColor: getEventTypeColor(event.type)
    }));
    
    setEvents(formattedEvents);
  }, [navigate]);
  
  // 이벤트 타입에 따른 색상 반환
  const getEventTypeColor = (type) => {
    const eventType = eventTypeOptions.find(option => option.name === type);
    return eventType ? eventType.color : '#6b7280';
  };
  
  // 월 이동 핸들러
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  // 현재 날짜로 이동
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  // 뷰 변경 핸들러
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  // 이벤트 클릭 핸들러
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };
  
  // 이벤트 모달 닫기
  const handleCloseEventDetail = () => {
    setShowEventDetail(false);
    setSelectedEvent(null);
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 시간 포맷팅 함수
  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // 월 달력 생성
  const renderMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 이번 달의 첫날
    const firstDay = new Date(year, month, 1);
    // 이번 달의 마지막 날
    const lastDay = new Date(year, month + 1, 0);
    
    // 이번 달 달력에 표시할 첫째 날 (이전 달의 일부 포함)
    const startDay = new Date(firstDay);
    startDay.setDate(startDay.getDate() - startDay.getDay());
    
    // 이번 달 달력에 표시할 마지막 날 (다음 달의 일부 포함)
    const endDay = new Date(lastDay);
    const remainingDays = 6 - endDay.getDay();
    endDay.setDate(endDay.getDate() + remainingDays);
    
    const weeks = [];
    let days = [];
    
    // 날짜 목록 생성
    const currentDateCopy = new Date(startDay);
    while (currentDateCopy <= endDay) {
      const dayValue = new Date(currentDateCopy);
      
      // 해당 날짜의 이벤트 찾기
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate.getDate() === dayValue.getDate() &&
               eventDate.getMonth() === dayValue.getMonth() &&
               eventDate.getFullYear() === dayValue.getFullYear();
      });
      
      days.push({
        date: dayValue,
        isCurrentMonth: dayValue.getMonth() === month,
        isToday: dayValue.toDateString() === new Date().toDateString(),
        events: dayEvents
      });
      
      if (days.length === 7) {
        weeks.push([...days]);
        days = [];
      }
      
      currentDateCopy.setDate(currentDateCopy.getDate() + 1);
    }
    
    // 요일 헤더
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-7 gap-px border-b">
          {weekdays.map((day, index) => (
            <div 
              key={index} 
              className={`text-center py-2 font-medium text-sm ${index === 0 ? 'text-red-500 dark:text-red-400' : index === 6 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-gray-300'}`}
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div 
                  key={`${weekIndex}-${dayIndex}`} 
                  className={`min-h-32 bg-white dark:bg-gray-800 p-1 ${!day.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600' : ''}`}
                >
                  <div className="flex justify-between">
                    <span 
                      className={`text-sm font-medium inline-flex h-6 w-6 items-center justify-center rounded-full
                        ${day.isToday ? 'bg-indigo-600 text-white' : day.isCurrentMonth ? (dayIndex === 0 ? 'text-red-500 dark:text-red-400' : dayIndex === 6 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-900 dark:text-white') : 'text-gray-400 dark:text-gray-600'}`}
                    >
                      {day.date.getDate()}
                    </span>
                    {day.events.length > 0 && day.events.length <= 3 ? null : (
                      day.events.length > 3 ? (
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1 rounded">
                          +{day.events.length - 3}
                        </span>
                      ) : null
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1 max-h-24 overflow-hidden">
                    {day.events.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="px-1 py-0.5 text-xs rounded truncate cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        style={{ backgroundColor: `${event.typeColor}15`, borderLeft: `2px solid ${event.typeColor}` }}
                        onClick={() => handleEventClick(event)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  // 주간 뷰 렌더링 (간소화된 버전)
  const renderWeekCalendar = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    // 요일 헤더
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 시간 범위 (8시부터 19시까지)
    const hours = Array.from({ length: 12 }, (_, i) => i + 8);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-8 gap-px border-b">
          <div className="border-r bg-gray-50 dark:bg-gray-700"></div>
          {weekdays.map((day, index) => (
            <div 
              key={index} 
              className={`text-center py-2 font-medium text-sm ${index === 0 ? 'text-red-500 dark:text-red-400' : index === 6 ? 'text-blue-500 dark:text-blue-400' : 'text-gray-800 dark:text-gray-300'}`}
            >
              <div>{day}</div>
              <div className={`text-xs mt-1 ${days[index].toDateString() === new Date().toDateString() ? 'bg-indigo-600 text-white rounded-full h-5 w-5 mx-auto flex items-center justify-center' : ''}`}>
                {days[index].getDate()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-8 gap-px divide-x overflow-y-auto max-h-96 dark:divide-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700">
            {hours.map(hour => (
              <div key={hour} className="text-xs text-gray-500 dark:text-gray-400 text-right pr-2 h-12 pt-1">
                {hour}:00
              </div>
            ))}
          </div>
          
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {hours.map(hour => (
                <div key={hour} className="border-t border-gray-200 dark:border-gray-700 h-12"></div>
              ))}
              
              {/* 이벤트 렌더링 (간소화된 예시) */}
              {events
                .filter(event => {
                  const eventDate = new Date(event.startDate);
                  return eventDate.getDate() === day.getDate() &&
                         eventDate.getMonth() === day.getMonth() &&
                         eventDate.getFullYear() === day.getFullYear();
                })
                .map(event => {
                  const startHour = event.startDate.getHours();
                  const startMinute = event.startDate.getMinutes();
                  const eventHeight = 60; // 고정 높이 (간소화)
                  
                  const topPosition = (startHour - 8) * 48 + (startMinute / 60) * 48;
                  
                  return (
                    <div
                      key={event.id}
                      className="absolute left-0 right-0 mx-1 px-1 rounded text-xs overflow-hidden"
                      style={{
                        top: `${topPosition}px`,
                        height: `${eventHeight}px`,
                        backgroundColor: `${event.typeColor}15`,
                        borderLeft: `2px solid ${event.typeColor}`,
                        zIndex: 10
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="truncate font-medium" style={{ color: event.typeColor }}>
                        {event.title}
                      </div>
                      <div className="truncate text-xs text-gray-500">
                        {formatTime(event.startDate)}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-baemin">
            캘린더
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            일정과 이벤트를 관리하세요
          </p>
        </div>
        
        {/* 캘린더 헤더 */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrevMonth}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-baemin ml-2">
              {currentDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
            </h2>
            <button 
              onClick={handleToday}
              className="ml-4 px-3 py-1 text-sm rounded-md bg-indigo-100 dark:bg-indigo-900 dark:bg-opacity-40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
            >
              오늘
            </button>
          </div>
          
          <div className="flex space-x-4">
            <div className="inline-flex rounded-md shadow-sm">
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-l-md border ${currentView === 'month' ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => handleViewChange('month')}
              >
                월
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium border-t border-b ${currentView === 'week' ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => handleViewChange('week')}
              >
                주
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium rounded-r-md border ${currentView === 'day' ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => handleViewChange('day')}
              >
                일
              </button>
            </div>
            
            <button 
              onClick={() => navigate('/calendar/create')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              일정 추가
            </button>
          </div>
        </div>
        
        {/* 캘린더 본문 */}
        <div className="mb-6">
          {currentView === 'month' && renderMonthCalendar()}
          {currentView === 'week' && renderWeekCalendar()}
          {currentView === 'day' && <div>일간 뷰는 준비 중입니다.</div>}
        </div>
        
        {/* 이벤트 타입 범례 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 font-baemin">일정 유형</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {eventTypeOptions.map((type) => (
              <div key={type.id} className="flex items-center">
                <span
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: type.color }}
                ></span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 이벤트 상세 정보 모달 */}
      {showEventDetail && selectedEvent && (
        <>
          {/* 배경 오버레이 - 클릭 시 모달 닫힘 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={handleCloseEventDetail}
          ></div>
          
          {/* 팝업 모달 */}
          <div 
            className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full overflow-hidden"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white font-baemin">일정 상세</h3>
              <button
                onClick={handleCloseEventDetail}
                className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-white rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="sr-only">닫기</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 dark:text-gray-300">
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{selectedEvent.title}</h4>
                <span
                  className="px-2 py-1 text-xs font-semibold rounded-full inline-block"
                  style={{ 
                    backgroundColor: `${selectedEvent.typeColor}15`, 
                    color: selectedEvent.typeColor 
                  }}
                >
                  {selectedEvent.type}
                </span>
              </div>
              
              {selectedEvent.description && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">날짜 및 시간</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(selectedEvent.startDate)}
                      {' '}
                      {formatTime(selectedEvent.startDate)} - {formatTime(selectedEvent.endDate)}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">장소</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600 flex justify-end">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
              >
                수정
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                삭제
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;