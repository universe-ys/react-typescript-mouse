import React, { useEffect, useState } from 'react';
import Button from './components/Button';

// 커서의 타입(파일명이 동일해야함)
type Cursor = 'cursor-1' | 'cursor-2' | 'cursor-3' | 'cursor-4';
// 커서의 배열(변경이슈가 없기때문에 전역변수로 설정함)
const cursors:Cursor[] = ['cursor-1', 'cursor-2', 'cursor-3', 'cursor-4']

function App() {
  // 커서
  const [selectedCursor, setSelectedCursor] = useState<Cursor>(cursors[0]);
  // 커서 위치
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  // 변경된 커서 위치
  const [calibratedCursorPosition, setCalibratedCursorPosition] = useState([0, 0]);

  // dependency 가 변경될 때 마다 실행됨
  useEffect(() => {
    const event = ({clientX, clientY}: MouseEvent) => {
      setCursorPosition([clientX, clientY])
      const pos = [clientX, clientY];

      switch(selectedCursor) {
        case "cursor-1": 
          pos[0] -= 12
          pos[1] -= 14
          break;
        case "cursor-2": 
          pos[0] -= 12
          pos[1] -= 10
          break;
        case "cursor-3": 
          break;
        case "cursor-4": 
          pos[0] -= 20
          pos[1] -= 10
          break;
      }

      setCalibratedCursorPosition(pos);
      console.log(clientX, clientY);
    }
    // 반드시 제거해주어야 함!
    window.addEventListener("mousemove", event);

    return () => window.removeEventListener("mousemove", event);
  }, [selectedCursor])

  console.log(selectedCursor)

  return (
    <>
      <img 
        style={{
          // for 클릭 이벤트 
          pointerEvents: "none",
          position: "fixed",
          // 변경된 커서 위치를 클릭되자 마자 적용함
          left: calibratedCursorPosition[0],
          top: calibratedCursorPosition[1],
          width: "50px"
        }}
        src={`/images/${selectedCursor}.png`} 
      />
      <div style={{
          fontSize: "24px"
        }}
      >
        버튼을 눌러서 마우스 커서를 바꿔보세요!
      </div>
      <div style={{
          marginTop: "16px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
        {
          cursors.map(cursor => <Button onClick={() => {
            const pos = cursorPosition;
            // 커서가 변경될 때 마다 커서 포인터의 위치를 보정함
            switch(selectedCursor) {
              case "cursor-1": 
                pos[0] -= 12
                pos[1] -= 14
                break;
              case "cursor-2": 
                pos[0] -= 12
                pos[1] -= 10
                break;
              case "cursor-3": 
                break;
              case "cursor-4": 
                pos[0] -= 20
                pos[1] -= 10
                break;
            }
            // 커서의 변경된 위치를 적용
            setCalibratedCursorPosition(pos);
            setSelectedCursor(cursor)} 
          }
            selected={selectedCursor === cursor} name={cursor} key={cursor}
          />)
        }
      </div>
    </>
  );
}

export default App;
