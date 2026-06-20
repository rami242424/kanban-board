# Kanban Board

드래그 앤 드롭으로 할 일을 관리하는 칸반 보드입니다. 카드를 생성·수정·삭제하고, 보드 안과 보드 사이로 자유롭게 옮길 수 있으며, 작업 내용은 브라우저에 저장되어 새로고침 후에도 유지됩니다.

**배포:** https://kanban-board-nu-ruby.vercel.app/

<!-- 여기에 드래그하는 GIF 또는 스크린샷을 넣으면 좋습니다 -->

## 프로젝트 개요

기존 포트폴리오(WeatherNow, CineSearch)가 외부 API 데이터를 받아 화면에 렌더링하는 데 초점이 있었다면, 이 프로젝트는 사용자가 직접 데이터를 생성·수정·삭제하고 드래그로 상태를 조작하는 인터랙션 중심 애플리케이션입니다. 전역 상태 관리(Recoil)와 상태 영속화(localStorage)를 적용해 클라이언트 상태를 다루는 과정을 구현했습니다.

## 주요 기능

- **카드 CRUD** — 각 보드에서 카드 추가, 수정, 삭제
- **드래그 앤 드롭** — 같은 보드 내 순서 변경 및 보드 간 카드 이동
- **상태 영속화** — 작업 내용을 localStorage에 저장하여 새로고침 후에도 유지
- **드래그 피드백** — 드래그 중인 카드와 드롭 가능한 영역에 시각적 표시

## 기술 스택

| 분류           | 사용 기술              |
| -------------- | ---------------------- |
| 빌드 도구      | Vite                   |
| 언어           | TypeScript             |
| 프레임워크     | React 18               |
| 상태 관리      | Recoil, recoil-persist |
| 드래그 앤 드롭 | @hello-pangea/dnd      |
| 폼 관리        | react-hook-form        |
| 스타일링       | styled-components      |

## 트러블슈팅

### 1. Droppable 영역의 transform이 드래그를 방해하는 문제

드래그 중 보드 영역에 입체감을 주려고 `CardList`(Droppable 컨테이너)에 `transform: scale()`을 적용했더니, 카드가 마우스를 제대로 따라오지 않고 드롭 위치가 어긋났습니다.

`@hello-pangea/dnd`는 요소의 픽셀 좌표를 측정해 드래그 위치를 계산하는데, 컨테이너에 `transform`을 주면 좌표계가 변형되어 계산 결과와 실제 화면 위치가 어긋나는 것이 원인이었습니다.

해결책으로 Droppable 영역에서는 좌표에 영향을 주지 않는 `background` 색상 변화로 `isDraggingOver` 상태를 표시했고, 입체 효과(그림자·scale)는 개별 카드(Draggable)에만 적용했습니다.

### 2. atom default를 수정해도 화면이 바뀌지 않는 문제

초기 카드 데이터를 비우기 위해 atom의 `default`를 빈 배열로 수정했으나, 화면에는 이전 카드가 그대로 표시됐습니다.

`recoil-persist`가 상태를 localStorage에 저장하고, 앱 시작 시 `default`보다 저장된 값을 우선 복원하기 때문이었습니다. localStorage의 저장 값을 제거하자 변경된 `default`가 정상 반영되는 것을 확인했습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

빌드:

```bash
npm run build
```
