import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, CheckSquare, AlertTriangle, Clock3, Plus } from 'lucide-react';
import { tasksByStatus, priorityData, recentActivity, upcomingTasks, projectProgress } from '../data/sampleData';
import Header from '../components/Header';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // 로그인 상태 확인
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userString);
    setUserName(user.name);
    
    // 시간대별 인사말 설정
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('좋은 아침입니다');
    else if (hour < 18) setGreeting('안녕하세요');
    else setGreeting('좋은 저녁입니다');
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-start mb-8">
      <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-baemin">
          {greeting}, {userName}님
        </h1>
      <p className="text-gray-600 dark:text-gray-300 mt-1">
          오늘은 {new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}입니다
          </p>
          </div>
          <div className="flex space-x-2">
            <Link 
              to="/tasks/create" 
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 업무
            </Link>
            <Link 
              to="/projects/create" 
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              새 프로젝트
            </Link>
          </div>
        </div>
        
        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">총 업무</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTasks}개</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">완료율</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completionRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                <Clock3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">진행중</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{tasksByStatus.find(item => item.name === '진행중')?.value || 0}개</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">긴급 업무</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{priorityData.find(item => item.name === '높음')?.value || 0}개</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 그래프와 차트 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 font-baemin">업무 현황</h2>
            <div className="h-64">
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {tasksByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 font-baemin">최근 활동</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={recentActivity}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tasks" stroke="#3b82f6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* 프로젝트 진행 상황 */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white font-baemin">프로젝트 진행 상황</h2>
              <Link to="/projects" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white font-baemin">다가오는 업무</h2>
              <Link to="/tasks" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                모든 업무 보기
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      업무명
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      마감일
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      우선순위
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingTasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(task.deadline)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;