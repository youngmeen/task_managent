#!/bin/bash

# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit: 태스크 관리 시스템 기본 구조"

# 원격 저장소 추가
git remote add origin https://github.com/youngmeen/task-management-system.git

# 메인 브랜치로 설정
git branch -M main

# 원격 저장소에 푸시
git push -u origin main

echo "GitHub 업로드가 완료되었습니다."
