import { DragEvent, useState } from 'react'
import './App.css'

function App() {

  const [isOverTarget, setIsOverTarget] = useState<boolean>(false);
  const [cardPosition, setCardPosition] = useState<0 | 1>(0);

  function dragOver(e: DragEvent) {
    e.preventDefault();
    setIsOverTarget(true)
  }

  function dragLeave(e: DragEvent) {
    e.preventDefault();
    setIsOverTarget(false)
  }

  function drop() {
    setIsOverTarget(false);
    setCardPosition((prev) => {
      if (prev === 0) {
        return 1
      } else {
        return 0
      }
    });
  }

  return (
    <main className="App">
      <span className='card-space' onDragOver={dragOver} style={{ background: isOverTarget ? '#ccc' : '' }}
        onDragLeave={dragLeave} onDrop={drop}>
        {cardPosition === 0 &&
          <div className='card' draggable>
          </div>}
      </span>
      <span className='card-space' onDragOver={dragOver} style={{ background: isOverTarget ? '#ccc' : '' }}
        onDragLeave={dragLeave} onDrop={drop}>
        {cardPosition === 1 &&
          <div className='card' draggable>
          </div>}
      </span>
    </main>
  )
}

export default App
