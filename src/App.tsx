import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface IMousePosition {
  clientX: number,
  clientY: number
}

interface ICardPosition {
  xPosition: number,
  yPosition: number
}

function App() {

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<IMousePosition>({ clientX: 0, clientY: 0 });
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInitialPosition = {
    xPosition: cardRef.current?.getBoundingClientRect().x,
    yPosition: cardRef.current?.getBoundingClientRect().y
  };
  const [cardPosition, setCardPosition] = useState<ICardPosition>({
    xPosition: cardInitialPosition.xPosition || 0,
    yPosition: cardInitialPosition.yPosition || 0
  })

  function drag() {
    console.log('dragging')
    setIsDragging(true);
    setCardPosition({ xPosition: mousePosition.clientX, yPosition: mousePosition.clientY })
  }

  function dragOver() {
    console.log('dragOver')
    setIsDraggingOver(true);
  }

  function drop() {
    console.log('drop')
  }

  onmousemove = (e) => {
    setMousePosition({ clientX: e.clientX, clientY: e.clientY });
  }

  return (
    <main className="App">
      <span className='card-space'>
        <div className='card' onDrag={drag} onDrop={drop} ref={cardRef} draggable style={{
          position: isDragging ? 'absolute' : 'initial',
          left: cardPosition.xPosition, top: cardInitialPosition.yPosition
        }}>

        </div>
      </span>
      <span className='card-space' onDragOver={dragOver}>

      </span>
    </main>
  )
}

export default App
