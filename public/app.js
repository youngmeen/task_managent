document.addEventListener('DOMContentLoaded', () => {
  // DOM 요소
  const taskForm = document.getElementById('taskForm');
  const tasksContainer = document.getElementById('tasks');
  const statusFilter = document.getElementById('statusFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const taskModal = document.getElementById('taskModal');
  const editTaskForm = document.getElementById('editTaskForm');
  const closeBtn = document.querySelector('.close');
  
  // API URL
  const API_URL = '/api/tasks';
  
  // 초기 태스크 로드
  loadTasks();
  
  // 이벤트 리스너 등록
  taskForm.addEventListener('submit', addTask);
  editTaskForm.addEventListener('submit', updateTask);
  statusFilter.addEventListener('change', loadTasks);
  priorityFilter.addEventListener('change', loadTasks);
  closeBtn.addEventListener('click', () => {
    taskModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === taskModal) {
      taskModal.style.display = 'none';
    }
  });
  
  // 태스크 로드 함수
  async function loadTasks() {
    try {
      const response = await fetch(API_URL);
      let tasks = await response.json();
      
      // 필터 적용
      const statusValue = statusFilter.value;
      const priorityValue = priorityFilter.value;
      
      if (statusValue !== 'all') {
        tasks = tasks.filter(task => task.status === statusValue);
      }
      
      if (priorityValue !== 'all') {
        tasks = tasks.filter(task => task.priority === priorityValue);
      }
      
      // 태스크 목록 렌더링
      renderTasks(tasks);
    } catch (error) {
      console.error('태스크 로드 중 오류 발생:', error);
      showAlert('태스크를 불러올 수 없습니다.');
    }
  }
  
  // 태스크 렌더링 함수
  function renderTasks(tasks) {
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
      tasksContainer.innerHTML = '<p class="no-tasks">태스크가 없습니다.</p>';
      return;
    }
    
    tasks.forEach(task => {
      const taskCard = document.createElement('div');
      taskCard.className = `task-card priority-${task.priority}`;
      
      const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '마감일 없음';
      
      taskCard.innerHTML = `
        <div class="due-date">${dueDate}</div>
        <h3>${task.title}</h3>
        <p>${task.description || '설명 없음'}</p>
        <div>
          <span class="status-badge status-${task.status.replace(' ', '')}">${task.status}</span>
          <span class="priority-badge priority-${task.priority}">${task.priority}</span>
        </div>
        <div class="task-actions">
          <button class="edit-btn" data-id="${task._id}">수정</button>
          <button class="delete-btn" data-id="${task._id}">삭제</button>
        </div>
      `;
      
      tasksContainer.appendChild(taskCard);
    });
    
    // 수정 및 삭제 버튼에 이벤트 리스너 추가
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-id');
        openEditModal(taskId);
      });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-id');
        deleteTask(taskId);
      });
    });
  }
  
  // 태스크 추가 함수
  async function addTask(e) {
    e.preventDefault();
    
    const taskData = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      priority: document.getElementById('priority').value,
      dueDate: document.getElementById('dueDate').value || null
    };
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      if (!response.ok) {
        throw new Error('태스크 추가 실패');
      }
      
      taskForm.reset();
      loadTasks();
      showAlert('태스크가 추가되었습니다.', 'success');
    } catch (error) {
      console.error('태스크 추가 중 오류 발생:', error);
      showAlert('태스크를 추가할 수 없습니다.');
    }
  }
  
  // 태스크 수정 모달 열기
  async function openEditModal(taskId) {
    try {
      const response = await fetch(`${API_URL}/${taskId}`);
      const task = await response.json();
      
      document.getElementById('editTaskId').value = task._id;
      document.getElementById('editTitle').value = task.title;
      document.getElementById('editDescription').value = task.description || '';
      document.getElementById('editStatus').value = task.status;
      document.getElementById('editPriority').value = task.priority;
      
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toISOString().split('T')[0];
        document.getElementById('editDueDate').value = formattedDate;
      } else {
        document.getElementById('editDueDate').value = '';
      }
      
      taskModal.style.display = 'block';
    } catch (error) {
      console.error('태스크 정보 로드 중 오류 발생:', error);
      showAlert('태스크 정보를 불러올 수 없습니다.');
    }
  }
  
  // 태스크 업데이트 함수
  async function updateTask(e) {
    e.preventDefault();
    
    const taskId = document.getElementById('editTaskId').value;
    
    const taskData = {
      title: document.getElementById('editTitle').value,
      description: document.getElementById('editDescription').value,
      status: document.getElementById('editStatus').value,
      priority: document.getElementById('editPriority').value,
      dueDate: document.getElementById('editDueDate').value || null
    };
    
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      if (!response.ok) {
        throw new Error('태스크 업데이트 실패');
      }
      
      taskModal.style.display = 'none';
      loadTasks();
      showAlert('태스크가 업데이트되었습니다.', 'success');
    } catch (error) {
      console.error('태스크 업데이트 중 오류 발생:', error);
      showAlert('태스크를 업데이트할 수 없습니다.');
    }
  }
  
  // 태스크 삭제 함수
  async function deleteTask(taskId) {
    if (!confirm('정말로 이 태스크를 삭제하시겠습니까?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('태스크 삭제 실패');
      }
      
      loadTasks();
      showAlert('태스크가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('태스크 삭제 중 오류 발생:', error);
      showAlert('태스크를 삭제할 수 없습니다.');
    }
  }
  
  // 알림 표시 함수
  function showAlert(message, type = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.task-form'));
    
    // 3초 후 알림 자동으로 제거
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
});
