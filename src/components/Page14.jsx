import React, { useState, useEffect } from 'react'
import './Page.css'

export default function Page14({ onNext }) {
  const GRID_SIZE = 8
  const TOTAL_MINES = 30
  const [grid, setGrid] = useState([])
  const [revealed, setRevealed] = useState(new Set())
  const [flagged, setFlagged] = useState(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [error, setError] = useState('')

  // Initialize grid with mines in random positions
  useEffect(() => {
    const newGrid = Array(GRID_SIZE * GRID_SIZE).fill(null).map(() => ({
      mine: false,
      adjacent: 0
    }))

    // Place mines - but make it nearly impossible by placing them everywhere
    const minePositions = new Set()
    while (minePositions.size < TOTAL_MINES) {
      minePositions.add(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)))
    }

    minePositions.forEach(pos => {
      newGrid[pos].mine = true
    })

    // Calculate adjacent mine counts
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      if (!newGrid[i].mine) {
        let count = 0
        const row = Math.floor(i / GRID_SIZE)
        const col = i % GRID_SIZE

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr
            const nc = col + dc
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              const idx = nr * GRID_SIZE + nc
              if (newGrid[idx].mine) count++
            }
          }
        }
        newGrid[i].adjacent = count
      }
    }

    setGrid(newGrid)
  }, [])

  const handleCellClick = (index) => {
    if (gameOver || won || revealed.has(index) || flagged.has(index)) return

    const cell = grid[index]

    if (cell.mine) {
      // Hit a mine - game over
      setGameOver(true)
      setError('You hit a mine! Game Over.')
      const newRevealed = new Set(revealed)
      newRevealed.add(index)
      setRevealed(newRevealed)
      return
    }

    // Reveal cell
    const newRevealed = new Set(revealed)
    newRevealed.add(index)
    setRevealed(newRevealed)

    // Check if won (revealed all non-mine cells)
    if (newRevealed.size === (GRID_SIZE * GRID_SIZE - TOTAL_MINES)) {
      setWon(true)
      setError('')
    }
  }

  const handleFlag = (index, e) => {
    e.preventDefault()
    if (gameOver || won || revealed.has(index)) return

    const newFlagged = new Set(flagged)
    if (newFlagged.has(index)) {
      newFlagged.delete(index)
    } else {
      newFlagged.add(index)
    }
    setFlagged(newFlagged)
  }

  const handleRestart = () => {
    setRevealed(new Set())
    setFlagged(new Set())
    setGameOver(false)
    setWon(false)
    setError('')
    
    const newGrid = Array(GRID_SIZE * GRID_SIZE).fill(null).map(() => ({
      mine: false,
      adjacent: 0
    }))

    const minePositions = new Set()
    while (minePositions.size < TOTAL_MINES) {
      minePositions.add(Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE)))
    }

    minePositions.forEach(pos => {
      newGrid[pos].mine = true
    })

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      if (!newGrid[i].mine) {
        let count = 0
        const row = Math.floor(i / GRID_SIZE)
        const col = i % GRID_SIZE

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr
            const nc = col + dc
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
              const idx = nr * GRID_SIZE + nc
              if (newGrid[idx].mine) count++
            }
          }
        }
        newGrid[i].adjacent = count
      }
    }

    setGrid(newGrid)
  }

  const getCellContent = (index) => {
    if (flagged.has(index)) return '🚩'
    if (!revealed.has(index)) return ''
    
    const cell = grid[index]
    if (cell.mine) return '💣'
    return cell.adjacent > 0 ? cell.adjacent : ''
  }

  return (
    <section className="page page-3">
      <div className="page-content">
        <h2>Win this game to access the chat</h2>
        <p>Clear all safe squares to proceed, there are 30 mines</p>
        
        <div className="minesweeper-container">
          <div className="minesweeper-grid">
            {grid.map((cell, index) => (
              <button
                key={index}
                className={`minesweeper-cell ${revealed.has(index) ? 'revealed' : ''} ${flagged.has(index) ? 'flagged' : ''} ${gameOver && cell.mine && revealed.has(index) ? 'mine' : ''}`}
                onClick={() => handleCellClick(index)}
                onContextMenu={(e) => handleFlag(index, e)}
                disabled={gameOver && !won}
              >
                {getCellContent(index)}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="captcha-error">{error}</div>}
        
        {won && (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '1.1rem' }}>You won!</p>
            <button className="submit-button" onClick={onNext} style={{ marginTop: '1rem' }}>Continue</button>
          </div>
        )}

        {gameOver && !won && (
          <button className="submit-button" onClick={handleRestart} style={{ marginTop: '1rem' }}>Try Again</button>
        )}

        <button className="find-meaning-btn" onClick={onNext}>
          Find meaning
        </button>
      </div>
    </section>
  )
}
