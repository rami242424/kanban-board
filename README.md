# 📋 Kanban Board

> 드래그 앤 드롭으로 할 일을 관리하는 칸반 보드

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![Recoil](https://img.shields.io/badge/Recoil-0.7-3578E5?logo=recoil)
![dnd](https://img.shields.io/badge/@hello--pangea/dnd-18-0055CC)
![styled-components](https://img.shields.io/badge/styled--components-6-DB7093?logo=styledcomponents)

---

## 📎 배포 링크

🔗 [Kanban Board 바로가기](https://kanban-board-nu-ruby.vercel.app/)

---

## 📸 화면 구성

<!-- 스크린샷 또는 드래그 GIF를 넣으세요 (예: screenshot_board.png, demo.gif) -->

| 보드                   | 드래그     |
| ---------------------- | ---------- |
| (screenshot_board.png) | (demo.gif) |

---

## 📌 주요 기능

- 보드별 카드 추가 / 수정 / 삭제 (CRUD)
- 같은 보드 내 카드 순서 변경
- 다른 보드로 카드 이동
- 드래그 중인 카드와 드롭 가능한 영역에 시각적 표시
- 작업 내용을 localStorage에 저장해 새로고침 후에도 유지
- 빈 값 카드 추가 방지 (유효성 검사)

---

## 🛠 기술 스택

| 역할           | 기술                   |
| -------------- | ---------------------- |
| 빌드 도구      | Vite                   |
| 언어           | TypeScript             |
| UI             | React 18               |
| 상태 관리      | Recoil, recoil-persist |
| 드래그 앤 드롭 | @hello-pangea/dnd      |
| 폼 관리        | react-hook-form        |
| 스타일         | styled-components      |

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Board.tsx    # 보드 컴포넌트 (카드 추가 폼 + Droppable 영역)
│   └── Card.tsx     # 카드 컴포넌트 (Draggable + 수정 / 삭제)
├── atoms.ts         # Recoil atom + recoil-persist 설정
├── theme.ts         # styled-components 테마 (색상 토큰)
├── styled.d.ts      # 테마 타입 정의
├── types.ts         # 공용 타입 (ICard, IBoard)
└── App.tsx          # DragDropContext + onDragEnd 로직
```

---

## 🔧 구현 포인트

### 드래그 출발지·도착지를 비교해 이동 처리

`onDragEnd`에서 드래그 결과의 출발지(source)와 도착지(destination)를 비교해 두 경우로 나눠 처리합니다. 같은 보드 안에서 옮길 때는 해당 배열에서 카드를 빼낸 뒤 새 위치에 끼워 넣고, 다른 보드로 옮길 때는 출발 보드에서 제거하고 도착 보드에 삽입합니다. 상태를 직접 수정하지 않고 배열을 복사해 갱신하는 방식으로 불변성을 유지했습니다.

```
const { source, destination } = info;
if (!destination) return;
if (source.droppableId === destination.droppableId) {
  // 같은 보드 내 순서 변경
} else {
  // 다른 보드로 이동
}
```

---

### Droppable 영역에는 transform 대신 배경색 변화

드래그 중 보드 영역에 입체감을 주려고 Droppable 컨테이너에 `transform: scale()`을 적용하니, 카드가 마우스를 제대로 따라오지 않고 드롭 위치가 어긋났습니다. `@hello-pangea/dnd`는 요소의 픽셀 좌표를 측정해 드래그 위치를 계산하는데, 컨테이너에 `transform`을 주면 좌표계가 변형되어 계산 결과와 실제 위치가 어긋나는 것이 원인이었습니다.

Droppable 영역에는 좌표에 영향을 주지 않는 `background` 색상 변화로 `isDraggingOver` 상태를 표시했고, 그림자·확대 같은 입체 효과는 개별 카드(Draggable)에만 적용했습니다.

```
// 보드: 좌표에 영향 없는 배경색으로 표시
background: ${props => props.$isDraggingOver ? "rgba(99,102,241,0.15)" : "transparent"};

// 카드: 입체 효과는 여기에만
transform: ${props => props.$isDragging ? "scale(1.02)" : "none"};
```

---

### styled-components transient prop으로 DOM 경고 방지

드래그 상태(`isDragging`)를 styled-components에 내려줄 때 일반 prop으로 전달하면, styled-components가 이를 실제 DOM 요소의 HTML 속성으로 넘기려다 React가 알 수 없는 속성이라고 경고를 띄웁니다. `$` 접두사를 붙인 transient prop(`$isDragging`)으로 전달해 스타일 계산에만 쓰이고 DOM에는 노출되지 않도록 했습니다.

```
<Wrapper $isDragging={snapshot.isDragging} ... >
```

---

### recoil-persist로 상태 영속화

`recoil-persist`를 atom에 연결해 상태 변화를 localStorage에 자동 저장합니다. 앱을 다시 열면 저장된 값을 복원하므로 새로고침이나 재방문 후에도 작업 내용이 유지됩니다.

이 과정에서 atom의 `default`를 비웠는데도 화면에 이전 카드가 남는 현상을 겪었습니다. `recoil-persist`가 앱 시작 시 `default`보다 localStorage에 저장된 값을 우선 복원하기 때문이었고, 저장 값을 제거하자 변경된 `default`가 정상 반영됐습니다.

```
const { persistAtom } = recoilPersist();

export const boardsState = atom<IBoard>({
  key: "boardsState",
  default: { "TO DO": [], "DOING": [], "DONE": [] },
  effects_UNSTABLE: [persistAtom],
});
```

---

## 🚀 시작하기

```
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```
