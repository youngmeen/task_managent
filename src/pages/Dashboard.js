import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, CheckSquare, AlertTriangle, Clock3, Plus } from 'lucide-react';
import { tasksByStatus, priorityData, recentActivity, upcomingTasks, projectProgress } from '../data/sampleData';
import Header from '../components/Header';
import { formatDate } from '../utils/dateUtils';
import { formatPercent } from '../utils/formatUtils';
import { getSessionStorage } from '../utils/storageUtils';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // 로그인 상태 확인
    const user = getSessionStorage('user');
    if (!user) {
      navigate('/login');
      return;
    }
    
    setUserName(user.name);
    
    // 시간대별 인사말 설정
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('좋은 아침입니다');
    else if (hour < 18) setGreeting('안녕하세요');
    else setGreeting('좋은 저녁입니다');
    
    // 반응형 디자인을 위한 이벤트 리스너
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case '높음': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900 dark:bg-opacity-30';
      case '중간': return 'text-amber-500 dark:text-amber-400 bg-amber-100 dark:bg-amber-900 dark:bg-opacity-30';
      case '낮음': return 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900 dark:bg-opacity-30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };
  
  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };
  
  const totalTasks = tasksByStatus.reduce((sum, item) => sum + item.value, 0);
  const completedTasks = tasksByStatus.find(item => item.name === '완료')?.value || 0;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* 헤더 섹션 */}
      <div className={`${isMobile ? 'flex flex-col space-y-4' : 'flex justify-between items-start'} mb-6 sm:mb-8`}>
      <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white font-baemin">
          {greeting}, {userName}님
        </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-1">
          오늘은 {new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}입니다
          </p>
          </div>
          <div className={`${isMobile ? 'flex w-full' : 'flex space-x-2'}`}>
            <Link 
              to="/tasks/create" 
              className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isMobile ? 'flex-1 mr-2' : ''}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              새 업무
            </Link>
            <Link 
              to="/projects/create" 
              className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${isMobile ? 'flex-1' : ''}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              새 프로젝트
            </Link>
          </div>
        </div>
        
        {/* 요약 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-full">
                <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">총 업무</h2>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">{totalTasks}개</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-2 sm:p-3 rounded-full">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">완료율</h2>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">{completionRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 sm:p-3 rounded-full">
                <Clock3 className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">진행중</h2>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">{tasksByStatus.find(item => item.name === '진행중')?.value || 0}개</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-6">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900 p-2 sm:p-3 rounded-full">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h2 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">긴급 업무</h2>
                <p className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white">{priorityData.find(item => item.name === '높음')?.value || 0}개</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 그래프와 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 font-baemin">업무 현황</h2>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tasksByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${formatPercent(percent)}`}
                  >
                    {tasksByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      padding: '8px'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '12px'
                    }}
                    onClick={(data) => console.log(data)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 transition duration-300 ease-in-out hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-750">
            <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-3 sm:mb-4 font-baemin">최근 활동</h2>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={recentActivity}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      padding: '8px' 
                    }}
                    cursor={{ strokeDasharray: '3 3', stroke: '#6366f1' }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} 
                    dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* 프로젝트 진행 상황 */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white font-baemin">프로젝트 진행 상황</h2>
              <Link to="/projects" className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                모든 프로젝트 보기
              </Link>
            </div>
            <div className="space-y-4">
              {projectProgress.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.name}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 다가오는 업무 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white font-baemin">다가오는 업무</h2>
              <Link to="/tasks" className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                모든 업무 보기
              </Link>
            </div>
            <div className="overflow-x-auto">
              {isMobile ? (
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(task.deadline)}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        업무명
                      </th>
                      <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        마감일
                      </th>
                      <th scope="col" className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        우선순위
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {upcomingTasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(task.deadline)}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;