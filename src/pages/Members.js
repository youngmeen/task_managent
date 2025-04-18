import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, User, Mail, Phone, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import Header from '../components/Header';

const Members = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [membersData, setMembersData] = useState([]);
  
  // 새 구성원 폼 데이터
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    joinDate: new Date().toISOString().split('T')[0],
  });
  
  // 부서 및 역할 옵션
  const departmentOptions = [
    '개발팀', '디자인팀', '마케팅팀', '인사팀', '경영지원팀', '영업팀'
  ];
  
  const roleOptions = [
    '팀장', '팀원', '인턴', '대리', '과장', '차장', '부장', '이사'
  ];
  
  // 임시 구성원 데이터
  const sampleMembersData = [
    { id: 1, name: '김영민', email: 'kimym@example.com', phone: '010-1234-5678', department: '개발팀', role: '팀장', joinDate: '2023-02-15', status: '재직중' },
    { id: 2, name: '이수진', email: 'leesj@example.com', phone: '010-2345-6789', department: '디자인팀', role: '대리', joinDate: '2023-04-10', status: '재직중' },
    { id: 3, name: '박준호', email: 'parkjh@example.com', phone: '010-3456-7890', department: '마케팅팀', role: '팀원', joinDate: '2023-05-22', status: '재직중' },
    { id: 4, name: '최민지', email: 'choimj@example.com', phone: '010-4567-8901', department: '인사팀', role: '과장', joinDate: '2023-01-05', status: '재직중' },
    { id: 5, name: '정대현', email: 'jungdh@example.com', phone: '010-5678-9012', department: '개발팀', role: '팀원', joinDate: '2023-06-30', status: '재직중' },
    { id: 6, name: '한지훈', email: 'hanjh@example.com', phone: '010-6789-0123', department: '디자인팀', role: '인턴', joinDate: '2023-08-15', status: '재직중' },
  ];
  
  useEffect(() => {
    // 로그인 상태 확인
    const userString = sessionStorage.getItem('user');
    if (!userString) {
      navigate('/login');
      return;
    }
    
    // 임시 데이터 로드 (실제 구현에서는 API 호출)
    setMembersData(sampleMembersData);
  }, [navigate]);
  
  // 검색 및 필터링된 구성원 목록
  const filteredMembers = membersData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.phone.includes(searchTerm);
    
    const matchesDepartment = !departmentFilter || member.department === departmentFilter;
    const matchesRole = !roleFilter || member.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleDepartmentFilter = (department) => {
    setDepartmentFilter(department === departmentFilter ? '' : department);
    setIsDepartmentDropdownOpen(false);
  };
  
  const handleRoleFilter = (role) => {
    setRoleFilter(role === roleFilter ? '' : role);
    setIsRoleDropdownOpen(false);
  };
  
  const handleNewMemberChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNewMemberSubmit = (e) => {
    e.preventDefault();
    
    // 편집 모드인 경우
    if (editingMemberId) {
      setMembersData(prev => 
        prev.map(member => 
          member.id === editingMemberId ? 
          { ...newMember, id: editingMemberId, status: '재직중' } : 
          member
        )
      );
      setEditingMemberId(null);
    } else {
      // 새 구성원 추가
      const newMemberWithId = {
        ...newMember,
        id: Date.now(),
        status: '재직중',
      };
      
      setMembersData(prev => [...prev, newMemberWithId]);
    }
    
    // 폼 초기화
    setNewMember({
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    
    setShowAddMemberForm(false);
  };
  
  const handleEditMember = (member) => {
    setNewMember({
      name: member.name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      role: member.role,
      joinDate: member.joinDate,
    });
    setEditingMemberId(member.id);
    setShowAddMemberForm(true);
  };
  
  const handleDeleteMember = (memberId) => {
    if (window.confirm('정말로 이 구성원을 삭제하시겠습니까?')) {
      setMembersData(prev => prev.filter(member => member.id !== memberId));
    }
  };
  
  // 구성원 카드 컴포넌트
  const MemberCard = ({ member }) => {
    const [showActions, setShowActions] = useState(false);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.department} • {member.role}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
              
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4 inline mr-2" />
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Trash2 className="h-4 w-4 inline mr-2" />
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 mr-2" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <User className="h-4 w-4 mr-2" />
              <span>입사일: {new Date(member.joinDate).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>
          
          <div className="mt-5">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 dark:bg-opacity-50 text-green-800 dark:text-green-300">
              {member.status}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-baemin">
              구성원 관리
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              총 {membersData.length}명의 구성원이 있습니다
            </p>
          </div>
          <button
            onClick={() => {
              setShowAddMemberForm(!showAddMemberForm);
              setEditingMemberId(null);
              if (!showAddMemberForm) {
                setNewMember({
                  name: '',
                  email: '',
                  phone: '',
                  department: '',
                  role: '',
                  joinDate: new Date().toISOString().split('T')[0],
                });
              }
            }}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showAddMemberForm ? '취소' : '구성원 추가'}
          </button>
        </div>
        
        {/* 구성원 추가/편집 폼 */}
        {showAddMemberForm && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6 p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {editingMemberId ? '구성원 정보 수정' : '새 구성원 추가'}
            </h2>
            <form onSubmit={handleNewMemberSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newMember.name}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* 이메일 */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newMember.email}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* 전화번호 */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">전화번호</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newMember.phone}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* 입사일 */}
                <div>
                  <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">입사일</label>
                  <input
                    type="date"
                    id="joinDate"
                    name="joinDate"
                    value={newMember.joinDate}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                {/* 부서 */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">부서</label>
                  <select
                    id="department"
                    name="department"
                    value={newMember.department}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">부서 선택</option>
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* 직책 */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">직책</label>
                  <select
                    id="role"
                    name="role"
                    value={newMember.role}
                    onChange={handleNewMemberChange}
                    required
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">직책 선택</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddMemberForm(false)}
                  className="mr-3 px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {editingMemberId ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* 검색 및 필터 */}
        <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="이름, 이메일, 전화번호로 검색"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex space-x-2">
            {/* 부서 필터 */}
            <div className="relative">
              <button
                onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  departmentFilter ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                부서
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isDepartmentDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {departmentOptions.map((department) => (
                      <button
                        key={department}
                        onClick={() => handleDepartmentFilter(department)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          departmentFilter === department ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {department}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* 직책 필터 */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  roleFilter ? 'bg-indigo-50 dark:bg-indigo-900 dark:bg-opacity-40 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                직책
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleFilter(role)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          roleFilter === role ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 구성원 목록 (그리드) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
          
          {filteredMembers.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              {searchTerm || departmentFilter || roleFilter ? (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">검색 결과가 없습니다</p>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">다른 검색어나 필터를 시도해보세요</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">등록된 구성원이 없습니다</p>
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">새 구성원을 추가해보세요</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;