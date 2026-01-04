# Express Boilerplate

> TypeScript 기반의 Express 서버 보일러플레이트입니다.  
> 새로운 프로젝트를 빠르게 시작할 수 있도록 필수 설정과 구조를 제공합니다.

## 🚀 빠른 시작 (Quick Start)

### 1️⃣ 저장소 Clone

```bash
# 프로젝트 복제
git clone https://github.com/gingaminga/express-boilerplate.git

```

### 2️⃣ Git 히스토리 초기화

```bash
# 기존 Git 히스토리 제거
rm -rf .git

# 새로운 Git 저장소 초기화
git init

# 연결할 저장소 설정
git remote add origin [저장소 주소]
```

### 3️⃣ 프로젝트 정보 수정

`package.json` 파일에서 프로젝트 정보를 수정하세요:

- `name`: 프로젝트 이름
- `version`: 버전
- `description`: 프로젝트 설명
- `author`: 작성자

### 4️⃣ 의존성 설치

```bash
npm install
```

### 5️⃣ 개발 서버 실행

```bash
npm run dev
```

**완료!  
🎉** 이제 `http://localhost:3001`에서 서버가 실행됩니다.

---

## ✨ 주요 특징

- ✅ **TypeScript** 기반 타입 안정성
- ✅ **의존성 주입(DI)** - Inversify 적용
- ✅ **계층형 아키텍처** - Controller/Service/Route 분리
- ✅ **통합 에러 핸들링** - 커스텀 에러 처리
- ✅ **요청/응답 로깅** - Winston 기반
- ✅ **표준 응답 포맷** - 일관된 API 응답 구조
- ✅ **유효성 검사** - Joi 스키마 기반
- ✅ **테스트 환경** - Jest + Supertest
- ✅ **코드 품질** - ESLint + Prettier + Husky
- ✅ **핫 리로딩** - Nodemon 개발 환경

## ⚒️ 기술 스택

<img src="https://img.shields.io/badge/Typescript-blue?style=flat&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Express-green?style=flat&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Inversify-red?style=flat&logo=inversify&logoColor=white"/> <img src="https://img.shields.io/badge/Winston-purple?style=flat&logo=winston&logoColor=white"/> <img src="https://img.shields.io/badge/Nodemon-yellow?style=flat&logo=nodemon&logoColor=white"/> <img src="https://img.shields.io/badge/Jest-orange?style=flat&logo=jest&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-purple?style=flat&logo=prettier&logoColor=white"/> <img src="https://img.shields.io/badge/ESLint-orange?style=flat&logo=eslint&logoColor=white"/>

## 📝 사용 가능한 명령어

```bash
# 개발 모드 실행
npm run dev

# 프로덕션 빌드
npm run build

# 테스트 실행
npm run test

# 테스트 watch 모드
npm run test:dev

# 테스트 캐시 삭제
npm run test:clean

# ESLint 실행
npm run eslint

# Prettier 포맷팅
npm run prettier
```

> 자세한 스크립트 내용은 `package.json`의 `scripts` 섹션을 확인하세요.

## 🔧 환경 변수 설정

`.env` 파일이 없어도 기본값으로 실행됩니다.  
프로젝트 설정을 변경하려면 프로젝트 루트에 `.env` 파일을 생성하세요.

```bash
# .env 파일 생성
touch .env
```

### 환경별 설정 파일

환경에 따라 다른 설정을 사용하려면 아래 파일을 생성하세요:

- `.env.development` - 개발 환경
- `.env.test` - 테스트 환경
- `.env.production` - 프로덕션 환경

> 환경별 파일이 없으면 `.env` 파일을 참조합니다.

## 📁 프로젝트 구조

```
src/
├── __tests__/          # 테스트 코드
│   ├── integration/    # 통합 테스트
│   └── unit/          # 단위 테스트
├── config/            # 설정 파일 (DI, Logger, Env 등)
├── controllers/       # 컨트롤러 (비즈니스 로직 호출)
├── dto/              # Data Transfer Object
├── loaders/          # 초기화 로더
├── middlewares/      # Express 미들웨어
├── routes/           # API 라우트 정의
├── services/         # 비즈니스 로직
├── types/            # TypeScript 타입 정의
├── utils/            # 유틸리티 함수
├── validators/       # Joi 유효성 검사
├── app.ts           # Express 앱 설정
└── index.ts         # 서버 진입점
```

## 🏗️ 아키텍처

이 보일러플레이트는 계층형 아키텍처를 따릅니다:

```
Request → Middleware → Route → Validator → Controller → Service → Response
```

1. **Route**: API 엔드포인트 정의
2. **Validator**: 요청 데이터 유효성 검사 (Joi)
3. **Controller**: 요청/응답 처리
4. **Service**: 비즈니스 로직 수행
5. **Middleware**: 로깅, 에러 처리, 응답 포맷 등

## 📦 새로운 기능 추가하기

프로젝트 내에 `info` 관련 예시 코드가 구현되어 있습니다.  
아래 파일들을 참고하여 새로운 기능을 추가하세요:

- **Service**: `src/services/info.service.ts`
- **Controller**: `src/controllers/info/check-info.controller.ts`
- **DTO**: `src/dto/info/`
- **Validator**: `src/validators/info/check-info.validator.ts`
- **Route**: `src/routes/info.route.ts`

## 🧪 테스트 작성

프로젝트 내에 테스트 예시가 구현되어 있습니다.  
아래 파일들을 참고하여 테스트를 작성하세요:

- **Unit Test**: `src/__tests__/unit/services/info.service.test.ts`
- **Integration Test**: `src/__tests__/integration/api/info.test.ts`
