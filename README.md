# Kanban Board

드래그 앤 드롭으로 할 일을 관리하는 칸반 보드입니다. 카드를 생성·수정·삭제하고, 보드 안과 보드 사이로 자유롭게 옮길 수 있으며, 작업 내용은 브라우저에 저장되어 새로고침 후에도 유지됩니다.

**배포:** https://kanban-board-nu-ruby.vercel.app/

<!-- 여기에 드래그하는 GIF 또는 스크린샷을 넣으면 좋습니다 -->

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

## 폴더 구조

```
src/
├── components/
│   ├── Board.tsx    # 보드 단위 컴포넌트 (카드 추가 폼 + Droppable 영역)
│   └── Card.tsx     # 카드 단위 컴포넌트 (Draggable + 수정/삭제)
├── atoms.ts         # Recoil atom + recoil-persist 설정
├── theme.ts         # styled-components 테마 (색상 토큰)
├── styled.d.ts      # 테마 타입 정의
├── types.ts         # 공용 타입 (ICard, IBoard)
└── App.tsx          # DragDropContext + onDragEnd 로직
```

## 핵심 구현

### 상태 구조

보드 전체를 `{ 보드이름: 카드배열 }` 형태의 객체 하나로 관리합니다. 각 카드는 고유 `id`와 `text`를 가지며, 보드 이름을 키로 사용해 어떤 보드에 속한 카드인지 구분합니다.

```ts
interface IBoard {
  [boardName: string]: ICard[];
}
```

### 드래그 앤 드롭 처리

`onDragEnd`에서 드래그 출발지(source)와 도착지(destination)를 비교해 두 경우로 나눠 처리합니다.

- **같은 보드 내 이동** — 해당 보드 배열에서 카드를 빼낸 뒤 새 위치에 삽입
- **다른 보드로 이동** — 출발 보드에서 카드를 제거하고 도착 보드에 삽입

상태를 직접 수정하지 않고 배열을 복사해 갱신하는 방식(불변성 유지)으로 처리했습니다.

### 상태 영속화

`recoil-persist`를 atom에 연결해 상태 변화를 localStorage에 자동 저장합니다. 앱을 다시 열면 저장된 값을 복원하므로 새로고침이나 재방문 후에도 작업 내용이 유지됩니다.

### 폼 관리

카드 추가와 수정 모두 `react-hook-form`으로 처리합니다. `register`로 입력값을 관리하고, 빈 값 제출을 막기 위한 `required` 유효성 검사를 적용했습니다.

## 트러블슈팅

### 1. Droppable 영역의 transform이 드래그를 방해하는 문제

드래그 중 보드 영역에 입체감을 주려고 `CardList`(Droppable 컨테이너)에 `transform: scale()`을 적용하니, 카드가 마우스를 제대로 따라오지 않고 드롭 위치가 어긋났습니다.

`@hello-pangea/dnd`는 요소의 픽셀 좌표를 측정해 드래그 위치를 계산하니, 컨테이너에 `transform`을 주면 좌표계가 변형되어 계산 결과와 실제 화면 위치가 어긋나는 것이 원인이었습니다.

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
