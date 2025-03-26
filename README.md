# 🐾 댕근 (DaengGeun) - 반려견 산책 친구 매칭 플랫폼

댕근(DaengGeun)은 강아지 산책 친구를 찾고 소통할 수 있는 커뮤니티 플랫폼입니다.  
산책 친구 매칭, 마켓 거래, 커뮤니티, 채팅, 박람회 정보까지 다양한 반려 생활을 서포트합니다.

---

## 📌 프로젝트 구성

### 백엔드 (Spring Boot)
- Java 17 / Spring Boot 3.x
- Spring Security (JWT 인증)
- JPA + MySQL
- AWS S3 파일 업로드
- WebSocket 채팅 기능

### 프론트엔드 (React)
- React + React Router
- Axios를 통한 API 통신
- React Bootstrap / Custom CSS

---

## 🧩 주요 기능

### 1. 👤 회원가입 / 로그인
- 이메일, 닉네임 중복 확인
- 카카오 주소 검색 API
- 프로필 사진 업로드 (S3)
- 로그인 시 JWT 발급 및 localStorage 저장

### 2. 🐶 댕근 찾기 (산책 친구 매칭)
- 랜덤 강아지 2마리 추천
- “선택하기” 시 Like +1 및 Match 저장
- 매칭된 친구와 채팅 가능

### 3. 💬 실시간 채팅
- WebSocket(STOMP) 기반 채팅 기능
- 채팅방 자동 생성 및 메시지 저장
- 이전 메시지 불러오기 지원

### 4. 📝 커뮤니티
- 게시글 작성 / 조회 / 삭제
- 카테고리별 탭
- 댓글 작성/삭제
- 좋아요 기능

### 5. 🛍️ 마켓
- 상품 등록 / 수정 / 삭제 (이미지 포함)
- 마켓 댓글 관리 (작성자만 삭제 가능)
- 조회수 자동 증가 + 중복 조회 방지
- 검색 & 페이지네이션

### 6. 📅 전시회 정보
- 현재 진행 중 + 예정된 박람회 탭 분리
- 상세 정보 및 링크 제공

### 7. 🧑‍💻 마이페이지
- 사용자 정보 및 반려견 정보 수정
- 프로필 이미지 변경 (S3 업로드)

---

## 💾 기술 스택

| 분야        | 기술 스택 |
|-------------|-----------|
| 프론트엔드  | React, Axios, React Router, Bootstrap, Kakao 주소 API |
| 백엔드      | Spring Boot, Spring Security, JWT, JPA, MySQL |
| 실시간 기능 | WebSocket (STOMP), SimpMessagingTemplate |
| 배포 / 저장 | AWS S3 (파일), CORS 설정 |

---

## 🛠️ 개발 팁

### 🔐 JWT 인증 흐름
1. 로그인 시 JWT 토큰 발급
2. 브라우저 `localStorage`에 저장
3. 백엔드 API 호출 시 `Authorization` 헤더로 전달
4. Spring Security에서 토큰 검증 → 인증 완료

### 🖼️ S3 이미지 업로드
1. 프론트에서 이미지 선택
2. 백엔드 `/api/upload`에 전송
3. S3 업로드 후 이미지 URL 반환
4. DB에 저장

---

## 🚀 실행 방법

### 1. 백엔드 실행
```bash
cd backend
./gradlew bootRun

