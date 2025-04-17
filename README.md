# 태스크 관리 시스템

리액트 기반의 태스크 관리 시스템입니다. 사용자가 태스크를 생성, 조회, 수정, 삭제할 수 있으며, 프로젝트 관리 및 캘린더 기능을 제공합니다.

## 기능

- 사용자 로그인/인증
- 대시보드 (업무 개요)
- 태스크 관리 (생성, 조회, 수정, 삭제)
- 프로젝트 관리
- 캘린더 일정 관리
- 사용자 프로필

## 설치 및 실행 방법

1. 저장소 클론:
```
git clone https://github.com/youngmeen/task-management-system.git
```

2. 필요한 패키지 설치:
```
npm install
```

3. 데이터 설정:
`config.json` 파일에서 데이터 소스를 설정할 수 있습니다.
- MongoDB 사용: `"useDatabase": true`
- 샘플 데이터 사용: `"useDatabase": false, "useSampleData": true`

4. 서버 실행:
```
npm start
```

5. 개발 모드 실행 (React 개발 서버 + 백엔드 서버):
```
npm run dev
```

6. 웹 브라우저에서 `http://localhost:3000` 접속

## 테스트 계정

- 아이디: test
- 비밀번호: 1234

## 기술 스택

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (선택적)
- 상태 관리: React Context API

## 프로젝트 구조

```
/task-management-system
  /src                 # React 애플리케이션 코드
    /components        # 재사용 가능한 컴포넌트
    /pages             # 페이지 컴포넌트
    /data              # 샘플 데이터
    App.js             # 메인 애플리케이션 컴포넌트
    index.js           # 애플리케이션 진입점
  /models              # MongoDB 모델
  /routes              # API 라우트
  server.js            # Express 서버
  config.json          # 설정 파일
  package.json         # 프로젝트 메타데이터
```

## 데이터 설정 (config.json)

```json
{
  "useDatabase": false,       // MongoDB 사용 여부
  "databaseConfig": {         // MongoDB 설정
    "type": "mongodb",
    "uri": "mongodb://localhost:27017/task-management",
    "options": {
      "useNewUrlParser": true,
      "useUnifiedTopology": true
    }
  },
  "useSampleData": true,      // 샘플 데이터 사용 여부
  "sampleDataPath": "./src/data", // 샘플 데이터 경로
  "serverPort": 3000,         // 서버 포트
  "apiBasePath": "/api"       // API 기본 경로
}
```

## 라이센스

MIT
