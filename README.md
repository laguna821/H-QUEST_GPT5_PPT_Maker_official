# H-QUEST PPT Maker (Socratic + Coder)

**H-QUEST PPT Maker**는 GPTs와 초경량 HTML/JS 템플릿을 조합해 **메시지 중심** 슬라이드 덱을 만드는 시스템입니다. 핵심 아이디어는 **템플릿은 고정(20종)**, **콘텐츠만 빠르게 코딩**하는 방식입니다.
슬라이드 수에는 제한이 없고(20장을 넘겨도 됨), 매 슬라이드는 20개 템플릿 중 하나를 선택하여 채웁니다. 텍스트 밀도가 높은 발표도 무난히 소화합니다(세밀한 타이포그래피 스케일과 카드형 레이아웃).&#x20;

---

## 파일 구조

```
/ (repo root)
├─ H-QUEST PPT Maker (Socratic + Coder).md   # GPTs 시스템 프롬프트(Instruction)
├─ H-QUEST Thin-HTML 템플릿-2.html           # 단일 HTML(여기 “내용만” 작성)
├─ presentation-data.js                       # 20개 템플릿 정의(코드/구조)
├─ template-renderer.js                       # 템플릿 렌더러(아이콘/제목/부제 등)
├─ app.js                                     # 전역 API + 슬라이드 네비/입력장치
├─ style.css                                  # 디자인 토큰/타이포/레이아웃 스타일
```

* **index HTML**: 코어 파일을 \*\*외부 참조(임베드 금지)\*\*로 유지하고, `DOMContentLoaded` 내부에서 `addSlideWithTemplate(...)` 시퀀스만 작성합니다. 사용하지 않는 필드는 `' '`(공백 한 칸)으로 채우는 규칙을 따릅니다.&#x20;
* **presentation-data.js**: `11, 22, 33, 44` 등 1행 레이아웃과 `1+1, 1+2, …, 4+3` 등 2행 조합 레이아웃의 **코드/구조**를 정의합니다. (예: `11`, `1+2`, `2+2` 등)
* **template-renderer.js**: 콘텐츠 블록의 **기본 5필드**(icon, title, subtitle, body, footer)를 처리하고 `list`, `button`도 지원합니다. 자동 레이아웃 휴리스틱(recommendLayout)도 포함됩니다.
* **app.js**: `addSlideWithTemplate`, `initializeSlides` 등을 **전역**으로 노출하고, 슬라이드 도트/진행바/키보드/스와이프/전체화면 등 상호작용을 제공합니다.&#x20;
* **style.css**: 컬러/타이포/그리드/카드 스타일이 분리되어 있어 브랜드 가이드를 쉽게 바꿀 수 있습니다. (디자인 변수와 타이포 스케일 정의)&#x20;

---

## 1) GPTs에 추가하는 법

1. **새 GPT 만들기** → \*\*Instructions(시스템 프롬프트)\*\*에 `H-QUEST PPT Maker (Socratic + Coder).md` 파일 내용을 **그대로** 붙여넣습니다.
2. **Knowledge**에 다음 5개 파일을 업로드합니다:

   * `H-QUEST Thin-HTML 템플릿-2.html`
   * `presentation-data.js`
   * `template-renderer.js`
   * `app.js`
   * `style.css`
3. 퍼미션/툴 설정은 기본값으로 두어도 충분히 작동합니다.

> 주의: HTML은 **코어 JS/CSS 링크 유지**가 원칙입니다. 코어 파일을 HTML로 **임베드하지 마세요**.

---

## 2) 사용법

### (A) 아웃라인 대화 모드 — Socratic

* 명령 예: **“PPT를 만들기 위해 발표 아웃라인을 구성해줘.”**
* GPTs가 **Socratic 질문**으로 목적/청중/핵심 논지/근거/섹션/CTA를 끌어내며, **슬라이드별 추천 템플릿과 본문 문장**까지 작성합니다.
* 결과물: **번호 매긴 아웃라인 + 슬라이드 계획표**(슬라이드 목적, 템플릿 코드, 필드별 텍스트, 템플릿 선택 이유).

### (B) 코딩 모드 — HTML 생성

아웃라인이 확정되면, 아래 패턴으로 HTML의 `DOMContentLoaded` 내부 **“내용만”** 코딩합니다.

```html
<!-- H-QUEST Thin-HTML 템플릿-2.html (발췌) -->
<script>
document.addEventListener('DOMContentLoaded', async () => {
  const ok = await loadPresentationData();
  if (!ok || !window.addSlideWithTemplate) return;

  // 1. 단일 카드(11)
  addSlideWithTemplate('11', {
    icon: '🎯', title: '발표 제목', subtitle: '핵심 한 줄',
    body: '문단 단위로 충분히 길고 설득력 있는 본문을 채웁니다.',
    footer: ' '
  });

  // 2. 2열 비교(22)
  addSlideWithTemplate('22', [
    { icon:'🧭', title:'전략 A', body:'…' },
    { icon:'🔬', title:'전략 B', body:'…' }
  ]);

  // ...
  initializeSlides(); // 마지막에 초기화
});
</script>
```

* 다열 레이아웃은 **배열**로 작성합니다.
* 사용하지 않는 필드는 `' '`(공백 한 칸)으로 채워야 합니다.&#x20;
* `initializeSlides()`를 호출하면 도트/카운터/진행바/네비가 활성화됩니다.

### (C) 실행

* 로컬에서 `H-QUEST Thin-HTML 템플릿-2.html`을 더블클릭해 브라우저로 열면 됩니다.
* 키보드: ←/→, ↑/↓, Space로 이동, `Home/End` 점프, `f` 전체화면 토글.
* 모바일: 좌/우 **스와이프** 제스처 지원.&#x20;
* 진행바/슬라이드 도트는 자동 업데이트됩니다.&#x20;

---

## 3) 왜 이 시스템인가? (Gamma, Genspark류 대비 장점)

> “멋진 자동 그래프까지 그려주는” 올인원 PPT AI도 좋지만, **크레딧 소모/유료 과금/벤더 락인**이 빈번합니다. H-QUEST 방식은 “**내가 통제하는 얇은 HTML+JS**”와 GPTs의 역할 분리를 통해 다음을 제공합니다.

1. **강력한 커스터마이징 & 통제권**

* **콘텐츠는 코드로 명시**: 슬라이드마다 `addSlideWithTemplate('<코드>', {...})`로 **수정 가능 범위가 명확**합니다. 레이아웃은 20종으로 제한되지만, **슬라이드 수는 무제한**입니다. 레이아웃 구조는 `presentation-data.js`에 투명하게 정의되어 재현성/검토성 높습니다.
* **불필요한 마술 없음**: 템플릿과 데이터의 분리로 덱의 형태가 **예측 가능**합니다. 리뷰/버저닝/PR에 최적.

2. **브랜드/타이포/색상 완전 분리**

* 스타일은 `style.css` 한 곳에서 관리(디자인 변수/타입 스케일/카드 컴포넌트). **톤&매너 교체**가 쉽고, 대규모 팀에서도 일관성 유지가 수월합니다.&#x20;

3. **텍스트 밀도 친화적**

* 카드형 레이아웃과 세밀한 타이포 스케일(가변 폰트 웨이트, 계단형 폰트 사이즈) 덕분에 **연구/전략/정책 발표처럼 긴 문장**도 읽히게 구성됩니다.&#x20;

4. **오프라인·경량·확장성**

* 빌드/런타임 의존성 없이 **브라우저만** 있으면 구동. 모바일 스와이프, 키/도트/진행바, 전체화면 등 **프레젠테이션 UX**가 내장되어 있습니다.&#x20;

5. **데이터 모델의 명료성**

* 콘텐츠 필드는 **5개 기본 필드**(icon, title, subtitle, body, footer) + `list`, `button` 같은 확장이며, 어디까지가 데이터이고 어디까지가 스타일인지가 분명합니다.
* 향후 그래프/이미지는 별도 생성 도구를 거쳐 **이미지 자산**으로 삽입하는 전략이 안전하고 재현성이 높습니다.

6. **LLM 불가지론 + 비용 제어**

* GPTs에 시스템 프롬프트만 갈아끼우면 다른 모델/엔진으로도 동일 워크플로우를 재사용합니다. 비용은 **모델 호출량에만 비례**하고, 나머지는 모두 정적 자산.

---

## 템플릿(20종) 빠른 참고

* **1행**: `11`, `22`, `33`, `44` (제목/한 메시지, 2/3/4열 비교/목차 등)
* **2행 조합**(예): `1+1`, `1+2`, `1+3`, `1+4`, `2+1`, `2+2`, `2+3`, `2+4`, `3+1`, `3+2`, `3+3`, `3+4`, `4+1`, `4+2`, `4+3` … (덱 목적에 따라 무한 슬라이드 구성)&#x20;

> 각 코드의 구조(행/열/필드)는 `presentation-data.js`에 명시되어 있으며, 선택/조합은 전적으로 사용자의 메시지 전략에 달려 있습니다.

---

## 코드 스니펫 모음

### 2행(1+2) — 헤더 + 2열

```js
addSlideWithTemplate('1+2', {
  row1: { icon:' ', title:'아젠다', subtitle:' ', body:' ', footer:' ' },
  row2: [
    { icon:'🧭', title:'Part I', body:'...' },
    { icon:'🔬', title:'Part II', body:'...' }
  ]
});
```

### 2×2 매트릭스(2+2)

```js
addSlideWithTemplate('2+2', {
  row1: [{ title:'A1', body:'...' }, { title:'A2', body:'...' }],
  row2: [{ title:'B1', body:'...' }, { title:'B2', body:'...' }]
});
```

### 리스트/버튼 사용(옵션)

```js
addSlideWithTemplate('11', {
  icon:'📝', title:'핵심 요약', subtitle:' ', 
  body:'문단…', list:['포인트1','포인트2','포인트3'], button:'자세히 보기', footer:' '
});
```

(렌더러가 `list`, `button`을 지원)

---

## 트러블슈팅

* **슬라이드가 안 보임**: `initializeSlides()` 호출 누락 확인.
* **네비 버튼/도트/진행바가 안 바뀜**: 전역 API(`addSlideWithTemplate`)로 슬라이드가 생성됐는지, `initializeSlides()` 이후인지 확인.&#x20;
* **모바일 스와이프가 안 됨**: 터치 이벤트가 브라우저/OS 제스처와 충돌하는지 확인. 시스템은 `touchstart/touchend`와 임계값을 사용합니다.&#x20;
* **여백/타이포 조정**: `style.css`의 디자인 변수/타이포 스케일을 수정.&#x20;
* **빈 필드 처리**: 사용하지 않는 필드는 `' '`(공백 한 칸).&#x20;

---

## 라이선스

Copyright 2025 Ahn Changhyun (안창현)
Email: laguna821@gmail.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

---

### 최종 메모

* 이 시스템은 **콘텐츠 품질이 승부처**입니다. 템플릿 선택(20종)은 단순하지만, **슬라이드별 문장 완성도**가 전체 인상을 좌우합니다. Socratic 모드에서 충분히 캐내고, 코딩 모드에서 **풍부한 문단**을 채워 넣으세요. (타이포 스케일/카드 레이아웃이 긴 문장을 받쳐줍니다.)
