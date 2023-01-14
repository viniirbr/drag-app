import { DragEvent, useReducer, useState } from 'react'
import './App.css'

enum DragActionKind {
	DraggingOver = 'Dragging_Over',
	Dropped = 'Dropped',
	DragLeave = 'Drag_Leave'
}

interface DragState {
	isOverTarget: boolean,
	cardSpace: 0 | 1
}

interface DragAction {
	type: DragActionKind,
	payload?: boolean | 0 | 1
}

function dragReducer(state: DragState, action: DragAction) {
	let { cardSpace, isOverTarget } = state;

	switch (action.type) {
		case DragActionKind.DraggingOver:
			isOverTarget = true;
			return {
				...state,
				isOverTarget
			}

		case DragActionKind.Dropped:
			isOverTarget = false;
			cardSpace = cardSpace === 0 ? 1 : 0;
			return {
				isOverTarget, cardSpace
			};
		case DragActionKind.DragLeave:
			isOverTarget = false;
			return {
				...state,
				isOverTarget
			}
		default:
			return state;
	}
}

function App() {

	const [state, dispatch] = useReducer(dragReducer, { isOverTarget: false, cardSpace: 0 })

	function dragOver(e: DragEvent) {
		e.preventDefault();

		dispatch({ type: DragActionKind.DraggingOver })
	}

	function dragLeave(e: DragEvent) {
		e.preventDefault();
		dispatch({ type: DragActionKind.DragLeave })
	}

	function drop() {
		dispatch({ type: DragActionKind.Dropped })
	}

	return (
		<main className="App">
			<span className='card-space' onDragOver={(e: DragEvent) => { state.cardSpace === 1 && dragOver(e) }}
				style={{ background: state.isOverTarget ? '#ccc' : '' }}
				onDragLeave={dragLeave} onDrop={drop}>
				{state.cardSpace === 0 &&
					<div className='card' draggable>
					</div>}
			</span>
			<span className='card-space' onDragOver={(e: DragEvent) => {state.cardSpace === 0 && dragOver(e)}}
				style={{ background: state.isOverTarget ? '#ccc' : '' }}
				onDragLeave={dragLeave} onDrop={drop}>
				{state.cardSpace === 1 &&
					<div className='card' draggable>
					</div>}
			</span>
		</main>
	)
}

export default App
