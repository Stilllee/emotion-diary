# Emotion Diary V2

<br>

## 목차

1. [프로젝트 정보](#프로젝트-정보)
2. [기술 스택](#기술-스택)
3. [주요 기능 및 특징](#주요-기능-및-특징)<br>
   - [마이그레이션과 최신 기술 적용](#1-마이그레이션과-최신-기술-적용)
   - [toast 알림의 구현과 사용자 경험 향상](#2-toast-알림의-구현과-사용자-경험-향상)
   - [다크모드 구현을 통한 시각적 편안함 제공](#3-다크모드-구현을-통한-시각적-편안함-제공)
   - [AI 답장 기능](#4-ai-답장-기능)
4. [공용 컴포넌트](#공용-컴포넌트)
5. [페이지별 상세 기능](#페이지별-상세-기능)
6. [설치 및 실행](#설치-및-실행)
7. [배포](#배포)
8. [폴더 구조](#폴더-구조)

<br>

## 프로젝트 정보

이 프로젝트는 과거에 개발한 '감정 일기장' 어플리케이션을 Vite, TypeScript, Tailwind CSS를 활용하여 마이그레이션하고, toast 알림, 다크 모드, AI 답장 기능과 같은 새로운 기능들을 추가한 프로젝트 입니다.

프로젝트의 마이그레이션 과정을 상세히 기록한 블로그 글은 [여기](https://woodstock.hashnode.dev/series/emotion-diary)에서 확인하실 수 있습니다.

### 프로젝트 개요

- 주제 : Emotion Diary의 마이그레이션 및 기능 확장
- 작업 기간 : 2024.03.08 ~ 2024.03.21

<br>

## 기술 스택

<div>
<img alt="vite" src="https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />
<img alt="tailwindcss" src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
</div>

<br>

## 주요 기능 및 특징

### 1. 마이그레이션과 최신 기술 적용

React CRA 기반에서 Vite, TypeScript로 마이그레이션하여 성능 및 개발 효율성 향상을 이루었고, Tailwind CSS를 도입하여 스타일링을 보다 쉽게 구현할 수 있도록 하였습니다.

<br>

### 2. toast 알림의 구현과 사용자 경험 향상

Toast 알림 기능은 React-toastify 라이브러리를 활용하여 구현하였습니다.<br>
이 기능은 일기 작성, 수정, 삭제 시 사용자에게 직관적이고 명확한 피드백을 제공합니다.

| 일기 작성 시                         | 일기 수정 시                         | 일기 삭제 시                         |
| ------------------------------------ | ------------------------------------ | ------------------------------------ |
| ![](https://i.imgur.com/R5K6YFn.png) | ![](https://i.imgur.com/VLVqO9k.png) | ![](https://i.imgur.com/uD5fllN.png) |

<br>

### 3. 다크모드 구현을 통한 시각적 편안함 제공

사용자의 시각적 편안함을 위해 Tailwind CSS를 활용하여 다크모드 기능을 구현하였습니다.

#### 3-1 테마 및 색상 설정

Tailwind CSS의 설정 파일에서 다크모드를 지원하기 위해 다음의 옵션을 추가하였습니다.

```ts
// tailwind.config.ts

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 클래스 기반의 다크모드 설정
  theme: {
    extend: {
      colors: {
        // 색상 스키마 정의
      }
```

| 색상 스키마                                     |
| ----------------------------------------------- |
| ![색상 스키마](https://i.imgur.com/MBqagDC.png) |

#### 3-2 테마 상태 관리

다크모드의 상태는 React Context API를 사용하여 관리됩니다. 이를 통해 앱 전체에서 테마를 쉽게 전환하고 유지할 수 있습니다.

```tsx
// context/theme-context.tsx

// 테마 컨텍스트의 초기 상태와 토글 함수 정의
const ThemeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // 로컬스토리지에서 다크모드 설정 가져오기
  const loadDarkModeSetting = () => {
    const storedDarkModeSetting = localStorage.getItem("darkMode");
    return storedDarkModeSetting ? JSON.parse(storedDarkModeSetting) : false;
  };

  // 다크모드 상태 관리. 초기값은 로컬스토리지에 저장된 값
  const [isDarkMode, setIsDarkMode] = useState(loadDarkModeSetting());

  useEffect(() => {
    const body = document.querySelector("body");
    // isDarkMode 상태에 따라 body 태그에 'dark' 클래스를 추가하거나 제거
    isDarkMode ? body?.classList.add("dark") : body?.classList.remove("dark");

    // 로컬스토리지에 다크모드 설정 저장
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));

    // 컴포넌트 언마운트 시 이펙트 정리
    return () => {
      body?.classList.remove("dark");
    };
  }, [isDarkMode]);

  // 다크모드 토글 함수
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // 컨텍스트 프로바이더를 통해 isDarkMode 상태와 toggleDarkMode 함수를 하위 컴포넌트에 제공
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
```

#### 3-3 다크모드 토글

사용자는 푸터에 위치한 토글 버튼을 클릭하여 다크모드와 라이트모드를 전환할 수 있습니다.
<img src="https://i.imgur.com/eozC4UP.gif" />

#### 3-4 지속성

사용자의 다크모드 설정은 로컬 스토리지에 저장되어 페이지를 새로고침하거나 앱을 재시작해도 설정이 유지됩니다.
<img src="https://i.imgur.com/5x89wVe.gif" />

<br>

### 4. AI 답장 기능

GPT-3 API를 활용하여 사용자가 작성한 일기에 대한 감정을 분석하고, 그에 맞는 답장을 생성하여 보여주는 기능을 추가하였습니다.

#### 4-1 API 호출

##### GPT-3 API 호출 함수

```ts
// api/gpt.ts

export const CallGPT = async ({ prompt }: { prompt: string }) => {
  const messages = [
    // 프롬프트 설정
  ];

  // API 요청
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 전송하는 데이터의 형식이 JSON임을 나타냄
      Authorization: `Bearer ${import.meta.env.VITE_GPT_API_KEY}`, // API요청에 인증 키를 포함
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // 사용할 GPT 모델
      messages: messages, // GPT 모델에게 전달할 입력 데이터
      temperature: 0.7, // AI 응답의 창의성 정도를 설정
      max_tokens: 1_000, // 응답의 최대 길이를 토큰 수로 설정
    }),
  });

  // 응답 데이터 처리
  const responseData = await response.json();

  const message = responseData.choices[0].message.content;

  return message;
};
```

##### 프롬프트

```ts
const messages = [
  // 역할 정의 : 일기 상담 전문가
  {
    role: "system",
    content:
      "You are a Counseling Expert, specializing in personal development through diary writing.",
  },

  // 사용자 일기 입력
  {
    role: "user",
    content: `
        """
        ${prompt}
        """`,
  },

  // AI 지시 사항 : 분석, 감정 이해, 피드백 제공, 격려 및 지지, 요약 등
  {
    role: "user",
    content: `1. Diary Entry Analysis: Identify key themes and emotional expressions in the diary entry.
      2. [Emotional Understanding]: Reflect on the emotions expressed and their context.
      3. [Constructive Feedback]: Offer feedback based on the diary entry, including strategies for overcoming challenges.
      4. [Encouragement and Support]: Conclude with words of encouragement and support.
      5. [answer]: Finally, provide a brief one-line summary of your advice in Korean as the final response.

      Translate into Korean and Use the output in the following JSON format:
      {
        answer: "here is [answer]"
      }
      `,
    // 최종적으로 요약된 [answer]를 한국어로 번역하여 JSON 형식으로 반환
  },
];
```

#### 4-2 답장 받기

GPT-3 API를 호출하여 답장을 받고, 화면에 표시하는 기능을 구현합니다.<br>
사용자가 '답장 받기'버튼을 클릭하면, 해당 일기의 내용이 API로 전송됩니다.

```tsx
// pages/Diary.tsx

const [gptData, setGptData] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [hasReceived, setHasReceived] = useState(false);

const handleClickAPICall = async () => {
  try {
    setIsLoading(true);
    const message = await CallGPT({
      prompt: JSON.stringify(content),
    });
    setHasReceived(true);
    setGptData(JSON.parse(message));
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
};

// ...

<button
  onClick={handleClickAPICall}
  disabled={hasReceived} // 버튼 비활성화
>
  { hasReceived ? ("답장이 도착했어요" : "답장 받기" }
</button>

// ...

<Letter letterData={gptData} isLoading={isLoading} />
```

![](https://i.imgur.com/lZXcSmJ.gif)

- 사용자가 버튼을 클릭하면 `handleClickAPICall`함수를 통해 API 호출이 이루어집니다.
- 답장 수신 여부(`hasReceived`상태)에 따라 버튼의 텍스트와 활성화 상태가 변경됩니다.

#### 4-3 답장 보여주기

API로부터 답장을 받고, 답장의 로딩 상태에 따라 UI를 변경하여 사용자에게 답장을 보여줍니다.

```tsx
// components/Letter.tsx

export default function Letter({ letterData, isLoading }) {
  return (
    <>
      {isLoading ? "답장이 오고있어요.. 잠시만 기다려주세요📮" : { letterData }}
    </>
  );
}
```

![](https://i.imgur.com/TxBmp6b.gif)

<br>

## 공용 컴포넌트

### 버튼

![버튼](https://i.imgur.com/1WWEAAT.png)

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

| 일기 목록                                                                                                                                                                     | 정렬 기능                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![일기 목록](https://i.imgur.com/dKJJrE1.gif)                                                                                                                                 | ![정렬](https://i.imgur.com/xbQhD7Q.gif)                              |
| <li>양쪽 버튼을 클릭하여 전월 또는 익월로 이동할 수 있고, 해당 기간의 일기 목록을 볼 수 있습니다.</li><li>목록에는 일기별 작성일, 감정 아이콘, 간단한 내용이 보여집니다.</li> | <li>작성일을 기준으로 오름차순, 내림차순으로 정렬할 수 있습니다.</li> |

<br>

### New 페이지

새로운 일기를 작성할 수 있는 페이지입니다.

| 일기 작성                                                       |
| --------------------------------------------------------------- |
| <img src="https://i.imgur.com/3FrL9Th.gif" width="379">         |
| <li>날짜, 감정, 내용을 입력하여 일기를 작성할 수 있습니다.</li> |

<br>

### Edit 페이지

기존의 일기를 수정할 수 있는 페이지입니다.

| 기존 일기 불러오기                                   | 일기 수정                                       | 일기 삭제                                     |
| ---------------------------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| ![기존 일기 데이터](https://i.imgur.com/E1jJhiq.gif) | ![일기 수정](https://i.imgur.com/V6f17RR.gif)   | ![일기 삭제](https://i.imgur.com/RHZpwFb.gif) |
| <li>수정할 일기의 내용을 불러옵니다.</li>            | <li>날짜, 감정, 내용을 수정할 수 있습니다.</li> | <li>일기를 삭제할 수 있습니다.</li>           |

<br>

### Diary 페이지

일기의 상세 내용을 볼 수 있는 페이지입니다.
| 일기 상세 페이지 |
| ---------------- |
| <img src="https://i.imgur.com/F4YDSMw.gif" width="379"> |
| <li>작성일, 감정, 내용, ai의 답장을 확인할 수 있습니다.</li> |

<br>

## 설치 및 실행

```bash
npm install
npm start
```

<br>

## 배포

- [감정 일기장](https://emotion-diary-pi.vercel.app/)

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
