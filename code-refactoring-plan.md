# 업무 관리 시스템 코드 리팩토링 계획

## 1. 개요
업무 관리 시스템은 현재 기능적으로는 정상 작동하나, 구조적 복잡성과 유지보수의 어려움이 존재합니다. 본 문서는 코드의 가독성과 확장성, 성능을 향상시키기 위한 리팩토링 전략을 정의하고, 체계적인 단계별 작업 계획을 제시합니다.

## 2. 리팩토링 핵심 원칙

1. **단순성(Simple)**: 이해하기 쉬운 코드 구조 지향
2. **일관성(Consistency)**: 네이밍, 코드 스타일, 구조 통일
3. **의존성 최소화(Decoupling)**: 컴포넌트 간 결합도 최소화
4. **명확한 책임 분리(SRP)**: 각 요소의 역할과 책임 명확화
5. **점진적 개선(Incremental Refactoring)**: 안정적인 단계별 리팩토링

## 3. 주요 문제점 분석

### 구조적 문제
- 중복된 유틸리티 함수 및 코드 다수 존재
- 단일 파일에 다수 책임 집중 (`Tasks.js`, `Dashboard.js` 등)
- 모바일/데스크탑 UI 구성 및 스타일 통일성 부족

### 성능 문제
- 상태 변경 시 불필요한 컴포넌트 리렌더링
- `useEffect` 의존성 설정 부정확
- 전역 상태/로컬 상태 사용 비일관

### 유지보수 문제
- 주석 및 문서화 부족
- 불명확한 네이밍 규칙
- 공통 컴포넌트화 미흡

## 4. 폴더 구조 개선안

```plaintext
src/
├── components/
│   ├── common/        # 공통 UI 컴포넌트
│   ├── dashboard/     # 대시보드 관련
│   ├── tasks/         # 업무 관련
│   ├── projects/      # 프로젝트 관련
│   └── layouts/       # 레이아웃 구성
├── pages/             # 라우트 단위 페이지
├── utils/             # 유틸리티 함수 모음
├── services/          # API 및 데이터 처리
├── hooks/             # 커스텀 훅
└── contexts/          # Context API 정의
```

## 5. 단계별 리팩토링 계획

### 🔹 1단계: 유틸리티 및 서비스 통합
- 중복 유틸 함수 제거 및 통일 (`dateUtils`, `storageUtils`, `formatUtils` 등)
- REST API 호출 로직 `services/` 디렉토리로 이관

### 🔹 2단계: 공통 컴포넌트 분리 및 정리
- `Button`, `Card`, `Modal`, `Badge`, `Dropdown` 컴포넌트화

### 🔹 3단계: 커스텀 훅 작성
- 업무 관련 상태 처리: `useTaskData`
- 프로젝트 처리 훅: `useProjectData`
- 모달, 필터, 정렬: `useModal`, `useFilter`, `useSort`

### 🔹 4단계: 컴포넌트 세분화
- 업무 목록 및 상세 보기: `TaskList`, `TaskItem`, `TaskFilters`
- 대시보드 구성 요소: `StatusSummary`, `RecentTasks`, `ProjectProgress`

### 🔹 5단계: 페이지 단위 리팩토링
- 각 페이지에서 데이터 처리와 UI 분리 (`Tasks.js`, `Projects.js`, `Dashboard.js`)
- 모바일 대응 반응형 레이아웃 정비

### 🔹 6단계: 성능 최적화
- `React.memo`, `useMemo`, `useCallback` 적용
- 컴포넌트 재사용성과 렌더링 최적화 검토

### 🔹 7단계: 문서화 및 규칙 정리
- 주요 함수 및 컴포넌트 주석화
- 전역 네이밍 규칙 문서화 (예: `PascalCase`, `camelCase` 등)

## 6. 작업 체크리스트

### ✅ 유틸리티 함수 정리
- [x] `utils/dateUtils.js`
- [x] `utils/storageUtils.js`
- [x] `utils/formatUtils.js`

### ✅ 공통 컴포넌트 구현
- [x] `components/common/Button.js`
- [x] `components/common/Card.js`
- [x] `components/common/Modal.js`
- [x] `components/common/Badge.js`
- [x] `components/common/Dropdown.js`

### ✅ 폴더 구조 정리
- [x] components 폴더 구조 개선
  - [x] common/ - 공통 UI 컴포넌트
  - [x] layouts/ - 레이아웃 관련 컴포넌트 (Header 등)
  - [x] projects/ - 프로젝트 관련 컴포넌트
  - [x] tasks/ - 업무 관련 컴포넌트
- [x] pages 폴더 구조 개선
  - [x] auth/ - 인증 관련 페이지
  - [x] calendar/ - 캘린더 관련 페이지
  - [x] dashboard/ - 대시보드 페이지
  - [x] members/ - 구성원 관리 페이지
  - [x] projects/ - 프로젝트 관련 페이지
  - [x] tasks/ - 업무 관련 페이지
  - [x] user/ - 사용자 프로필 관련 페이지

### ✅ 업무 컴포넌트
- [x] `components/tasks/TaskList.js`
- [x] `components/tasks/TaskFilters.js`
- [x] `components/tasks/TaskModal.js`

### ✅ 프로젝트 컴포넌트
- [x] `components/projects/ProjectModal.js`

### ✅ 커스텀 훅 구현
- [ ] `hooks/useTaskData.js`
- [ ] `hooks/useProjectData.js`
- [ ] `hooks/useModal.js`
- [ ] `hooks/useFilter.js`
- [ ] `hooks/useSort.js`

## 7. 리팩토링 전략 및 가이드라인

### 📌 전략
- **기능 단위** 리팩토링을 통해 안정성 확보
- **PR 및 리뷰 단위로 분할 작업 수행**

### 📌 협업 시 고려사항
- 각 변경사항을 명확히 커밋 메시지에 명시
- 공통 규칙은 Notion/Confluence 등 내부 문서에 정리 후 공유

### 📌 테스트 전략
- 주요 기능에 대한 수동 테스트 진행
- CRUD 기능, 필터링, 정렬 기능 우선 검증

## 8. 기대 효과

### 📈 생산성 향상
- 코드 가독성 및 유지보수성 증가
- 기능 추가 및 확장 시 안정성 확보

### 🧩 유지보수 용이성
- 코드 영향 범위 최소화
- 신규 참여자 진입 장벽 감소

### 🚀 성능 개선
- 렌더링 최적화 및 리소스 효율성 증가

## 9. 작업 진행 상황

### 2025년 4월 20일 작업 완료

- 공통 컴포넌트 구현 (Button, Card, Modal, Badge, Dropdown)
- 폴더 구조 개선 (컴포넌트 및 페이지 폴더링)
- 중복 파일 정리 및 구조 정리
- 메인 컴포넌트 이동 및 참조 경로 수정

### 다음 작업 계획

1. 커스텀 훅 구현 (useTaskData, useProjectData 등)
2. 페이지 컴포넌트 내부 구조 리팩토링
3. 성능 최적화 및 추가 기능 구현

## 📅 리팩토링 일정 요약

| 기간 | 주요 내용 |
|------|-----------|
| 1~2주차 | 유틸리티 정리 및 폴더 구조 개편 |
| 2~3주차 | 공통 컴포넌트 제작 |
| 3~4주차 | 커스텀 훅 개발 |
| 4~6주차 | 페이지 및 UI 컴포넌트 분리 |
| 6~7주차 | 성능 최적화 및 리렌더링 정리 |
| 7~8주차 | 문서화 및 테스트 최종 정리 |