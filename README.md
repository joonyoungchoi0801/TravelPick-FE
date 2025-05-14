# TravelPick - 멀티모달 여행지 추천 서비스

**TravelPick**은 텍스트와 이미지를 기반으로 사용자 취향을 분석해 정밀한 여행지를 추천해주는 멀티모달 LLM 기반 웹 서비스입니다.

## 🧭 프로젝트 목적

기존 여행 추천 시스템의 한계를 극복하고, 여행 경험이 적은 사용자도 직관적으로 여행지를 탐색할 수 있도록 돕습니다.

- 텍스트 + 이미지 입력을 통한 직관적 취향 표현
- 감성 기반 키워드 매칭 (예: 조용한, 활기찬, 이국적인 등)
- 사용자의 입력에 따라 유연하게 확장 가능한 여행지 탐색

## 🛠 기술 스택

- **Frontend**: React, TypeScript, Vite, SCSS
- **API 통신**: Apollo GraphQL
- **Backend**: Spring Boot
- **AI**: allenai/longformer-base-4096, openai/clip-vit-base-patch32
- **Infra**: AWS S3, CloudFront, Route53, GitHub Actions (CI/CD)
- **Etc**: Google Maps API

## 🚀 배포 주소

🔗 [https://www.travelpick.store](https://www.travelpick.store)

## 📦 설치 및 실행 방법

```bash
git clone https://github.com/joonyoungchoi0801/TravelPick-FE.git
cd TravelPick-FE
npm install
npm run dev
```
