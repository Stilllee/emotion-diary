# Emotion Diary V2

<br>

## 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [기술 스택](#기술-스택)
3. [주요 기능 및 특징](#주요-기능-및-특징)
4. [공용 컴포넌트](#공용-컴포넌트)
5. [페이지별 상세 기능](#페이지별-상세-기능)
6. [설치 및 실행](#설치-및-실행)
7. [배포](#배포)
8. [데모 영상](#데모-영상)
9. [폴더 구조](#폴더-구조)

  <br>

## 프로젝트 정보

이 프로젝트는 과거에 개발한 '감정 일기장' 어플리케이션을 Vite, TypeScript, Tailwind CSS를 활용하여 마이그레이션하고, toast 알림, 다크 모드, AI 답장 기능과 같은 새로운 기능들을 추가한 프로젝트 입니다.

프로젝트의 마이그레이션 과정을 상세히 기록한 블로그 글은 [여기](https://woodstock.hashnode.dev/series/emotion-diary)에서 확인하실 수 있습니다.

### 프로젝트 개요

- 주제 : Emotion Diary의 마이그레이션 및 기능 확장
- 작업 기간 : 2024.03.08 ~ 2024.03.19

<br>

## 기술 스택 및 도구

<div>
<img alt="vite" src="https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
<img alt="tailwindcss" src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</div>

<br>

### 주요 기능 및 특징

#### 마이그레이션과 최신 기술 적용

React CRA 기반에서 Vite, TypeScript로 마이그레이션하여 성능 및 개발 효율성 향상을 이루었고, Tailwind CSS를 도입하여 스타일링을 보다 쉽게 구현할 수 있도록 하였습니다.

#### toast 알림

toastify 라이브러리를 활용하여 사용자에게 알림을 보여주는 기능을 추가하였습니다.

#### 다크모드 구현

사용자의 시각적 편안함을 고려하여 밝은 모드와 어두운 모드를 선택할 수 있는 테마 기능을 추가하였습니다.

#### AI 답장 기능

GPT-3 API를 활용하여 사용자가 작성한 일기에 대한 감정을 분석하고, 그에 맞는 답장을 생성하여 보여주는 기능을 추가하였습니다.

<br>

## 공용 컴포넌트

### 버튼

![버튼](image.png)

```tsx
type ButtonProps = {
  text: string;
  type: "DEFAULT" | "POSITIVE" | "NEGATIVE";
  onClick: () => void;
};
```

- `Button` 컴포넌트는 `text, type, 클릭 이벤트`를 받아서 렌더링합니다.
- `type`에 따라 버튼의 색상이 변경됩니다.

### 헤더

![헤더](https://i.imgur.com/3KHLjWx.png)

```tsx
type HeaderProps = {
  title: string;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
};
```

- `Header` 컴포넌트는 `title, leftChild, rightChild`를 받아서 렌더링합니다.
- `leftChild`와 `rightChild`는 헤더의 왼쪽과 오른쪽에 위치할 컴포넌트를 받습니다.

<br>

## 페이지별 기능 상세

### Home 페이지

월별 일기 목록을 보여주는 페이지입니다.

#### 일기 목록

![일기 목록](https://i.imgur.com/dKJJrE1.gif)

- 양쪽 버튼을 클릭하여 전월 또는 익월로 이동할 수 있고, 해당 기간의 일기 목록을 볼 수 있습니다.
- 목록에는 일기별 작성일, 감정 아이콘, 간단한 내용이 보여집니다.

#### 정렬 기능

![정렬](https://i.imgur.com/xbQhD7Q.gif)

- 작성일을 기준으로 오름차순, 내림차순으로 정렬할 수 있습니다.

<br>

### New 페이지

새로운 일기를 작성할 수 있는 페이지입니다.

#### 일기 작성

![일기 작성](https://i.imgur.com/3FrL9Th.gif)

- 날짜, 감정, 내용을 입력하여 일기를 작성할 수 있습니다.

<br>

### Edit 페이지

기존의 일기를 수정할 수 있는 페이지입니다.

#### 기존 일기 불러오기

![기존 일기 데이터](https://i.imgur.com/E1jJhiq.gif)

- 수정할 일기의 내용을 불러옵니다.

#### 일기 수정

![일기 수정](https://i.imgur.com/V6f17RR.gif)

- 날짜, 감정, 내용을 수정할 수 있습니다.

#### 일기 삭제

![일기 삭제](https://i.imgur.com/RHZpwFb.gif)

- 일기를 삭제할 수 있습니다.

<br>

### Diary 페이지

일기의 상세 내용을 볼 수 있는 페이지입니다.
![상세 페이지](https://i.imgur.com/F4YDSMw.gif)

- 작성일, 감정, 내용, ai의 답장을 확인할 수 있습니다.

<br>

## 설치 및 실행

```bash
npm install
npm start
```

<br>

## 배포

- [준비중입니다](링크)

<br>

## 데모 영상

- [준비중입니다](링크)

<br>

## 폴더 구조

```bash
.
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── api             # API 호출 함수 디렉토리
│   │   └── gpt.ts              # GPT-3 API 호출 함수
│   ├── assets          # 이미지 및 기타 정적 파일 디렉토리
│   │   ├── emotion1.png
│   │   ├── emotion2.png
│   │   ├── emotion3.png
│   │   ├── emotion4.png
│   │   └── emotion5.png
│   ├── components      # 컴포넌트 디렉토리
│   │   ├── Button.tsx          # 버튼 컴포넌트
│   │   ├── DiaryItem.tsx       # 일기 아이템 컴포넌트
│   │   ├── DiaryList.tsx       # 일기 목록 컴포넌트
│   │   ├── Editor.tsx          # 일기 작성 폼 컴포넌트
│   │   ├── EmotionItem.tsx     # 감정 아이템 컴포넌트
│   │   ├── Footer.tsx          # 페이지 하단 푸터 컴포넌트
│   │   ├── Header.tsx          # 페이지 상단 헤더 컴포넌트
│   │   ├── Letter.tsx          # AI 답장 컴포넌트
│   │   └── Viewer.tsx          # 일기 상세 보기 컴포넌트
│   ├── context         # React Context API를 사용한 상태 관리 디렉토리
│   │   ├── diary-context.ts    # 일기 데이터 관리 컨텍스트
│   │   └── theme-context.tsx   # 테마 상태 관리 컨텍스트
│   ├── hooks           # 커스텀 훅 디렉토리
│   │   └── useDiary.tsx        # 일기 데이터 관련 커스텀 훅
│   ├── index.css
│   ├── main.tsx
│   ├── pages           # 각 페이지 컴포넌트들
│   │   ├── Diary.tsx           # 일기 상세 페이지
│   │   ├── Edit.tsx            # 일기 수정 페이지
│   │   ├── Home.tsx            # 홈 페이지
│   │   ├── New.tsx             # 새 일기 작성 페이지
│   │   └── NotFound.tsx        # 404 페이지
│   ├── types           # 타입 정의 디렉토리
│   │   └── diary-types.ts      # 일기 타입 정의
│   ├── utils           # 유틸리티 함수 디렉토리
│   │   ├── emotion-utils.ts    # 감정 관련 유틸리티 함수
│   │   └── get-string-date.ts  # 날짜 문자열 반환 함수
│   └── vite-env.d.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

<br>

참고 강의: [한입 크기로 잘라 먹는 리액트](https://www.udemy.com/course/winterlood-react-basic/)
