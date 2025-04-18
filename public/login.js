document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const alertContainer = document.getElementById('alertContainer');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // 실제 시스템에서는 서버로 인증 요청을 보냅니다
            // 여기서는 간단한 데모를 위해 하드코딩된 사용자 정보를 사용합니다

            // 데모 사용자 정보 (실제 시스템에서는 이렇게 하지 마세요!)
            const demoUsers = [
                {email: 'admin@example.com', password: 'admin123'},
                {email: 'user@example.com', password: 'user123'}
            ];

            const user = demoUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // 로그인 성공 처리
                showAlert('로그인 성공! 잠시 후 메인 페이지로 이동합니다.', 'success');

                // 로그인 정보를 세션 스토리지에 저장 (실제로는 토큰을 사용합니다)
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('userEmail', email);

                // 잠시 후 메인 페이지로 리디렉션
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // 로그인 실패 처리
                throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
            }
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

    // 이미 로그인되어 있는 경우 메인 페이지로 이동
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
    }
});
