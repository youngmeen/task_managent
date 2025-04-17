document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const alertContainer = document.getElementById('alertContainer');
  
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    try {
      // 비밀번호 확인
      if (password !== confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      
      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('유효한 이메일 주소를 입력해주세요.');
      }
      
      // 비밀번호 길이 검증
      if (password.length < 6) {
        throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
      }
      
      // 실제 시스템에서는 서버에 회원가입 요청을 보냅니다
      // 이 데모에서는 로컬 스토리지에 정보를 저장합니다 (실제로는 이렇게 하지 마세요!)
      
      // 회원가입 성공 메시지
      showAlert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.', 'success');
      
      // 로그인 페이지로 리디렉션
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
      
    } catch (error) {
      showAlert(error.message, 'error');
    }
  });
  
  // 알림 표시 함수
  function showAlert(message, type) {
    alertContainer.innerHTML = '';
    
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    // 성공 메시지는 자동으로 사라집니다
    if (type === 'success') {
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  }
});
