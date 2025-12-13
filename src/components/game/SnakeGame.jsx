'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function SnakeGame() {
  const { theme } = useTheme()
  const [gameStarted, setGameStarted] = useState(false)
  const [snake, setSnake] = useState([[5, 5]])
  const [food, setFood] = useState([10, 10])
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(150)

  const GRID_SIZE = 20

  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE)
    ]
    setFood(newFood)
  }, [])

  const resetGame = () => {
    setSnake([[5, 5]])
    setDirection('RIGHT')
    setGameOver(false)
    setScore(0)
    setSpeed(150)
    generateFood()
  }

  // Function to handle direction change
  const changeDirection = useCallback((newDirection) => {
    if (!gameStarted || gameOver) return

    setDirection(prevDirection => {
      // Prevent opposite direction
      if (newDirection === 'UP' && prevDirection === 'DOWN') return prevDirection
      if (newDirection === 'DOWN' && prevDirection === 'UP') return prevDirection
      if (newDirection === 'LEFT' && prevDirection === 'RIGHT') return prevDirection
      if (newDirection === 'RIGHT' && prevDirection === 'LEFT') return prevDirection
      return newDirection
    })
  }, [gameStarted, gameOver])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const moveSnake = () => {
      setSnake(prev => {
        const newSnake = [...prev]
        const head = [...newSnake[0]]

        switch (direction) {
          case 'UP': head[1] -= 1; break
          case 'DOWN': head[1] += 1; break
          case 'LEFT': head[0] -= 1; break
          case 'RIGHT': head[0] += 1; break
        }

        // Check wall collision
        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
          setGameOver(true)
          return prev
        }

        // Check self collision
        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true)
          return prev
        }

        newSnake.unshift(head)

        // Check food collision
        if (head[0] === food[0] && head[1] === food[1]) {
          setScore(s => s + 1)
          generateFood()
          setSpeed(s => Math.max(50, s - 5))
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    const gameInterval = setInterval(moveSnake, speed)
    return () => clearInterval(gameInterval)
  }, [gameStarted, gameOver, direction, food, speed, generateFood])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault()
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          changeDirection('UP')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          changeDirection('DOWN')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          changeDirection('LEFT')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          changeDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [changeDirection])

  const startGame = () => {
    setGameStarted(true)
    resetGame()
  }

  // Button click handlers for on-screen controls
  const handleArrowClick = (dir) => {
    if (!gameStarted) {
      startGame()
    }
    changeDirection(dir)
  }

  return (
    <div className="bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 p-4 md:p-6 lg:p-8 rounded-lg backdrop-blur-sm border border-accent-teal/30 w-full max-w-[420px]">
      <div className="relative">
        <div className={`rounded-lg p-2 md:p-4 w-full aspect-square mb-4 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
          {!gameStarted ? (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={startGame}
                className="bg-accent-orange hover:bg-accent-orange/80 text-dark-bg px-4 md:px-6 py-2 md:py-3 rounded transition-colors font-bold text-sm md:text-base"
              >
                start-game
              </button>
            </div>
          ) : (
            <div className="relative h-full">
              <svg viewBox="0 0 360 360" className={`w-full h-full border-2 ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
                {/* Grid background */}
                {Array.from({ length: GRID_SIZE }).map((_, i) =>
                  Array.from({ length: GRID_SIZE }).map((_, j) => (
                    <rect
                      key={`${i}-${j}`}
                      x={i * 18}
                      y={j * 18}
                      width="17"
                      height="17"
                      fill={theme === 'dark' ? '#011221' : '#F5F5F5'}
                      stroke={theme === 'dark' ? '#0C1616' : '#E0E0E0'}
                    />
                  ))
                )}
                
                {/* Snake */}
                {snake.map((segment, index) => (
                  <rect
                    key={index}
                    x={segment[0] * 18}
                    y={segment[1] * 18}
                    width="17"
                    height="17"
                    fill={index === 0 ? '#43D9AD' : '#43D9AD'}
                    opacity={index === 0 ? 1 : 0.8}
                    rx="2"
                  />
                ))}
                
                {/* Food */}
                <circle
                  cx={food[0] * 18 + 8.5}
                  cy={food[1] * 18 + 8.5}
                  r="6"
                  fill="#FEA55F"
                  className="animate-pulse"
                />
              </svg>
              
              {/* Game Over Overlay */}
              {gameOver && (
                <div className={`absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-dark-secondary/90' : 'bg-light-secondary/90'}`}>
                  <div className="text-center">
                    <p className={`text-xl md:text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GAME OVER</p>
                    <p className="text-accent-teal mb-4 text-lg">Score: {score}</p>
                    <button
                      onClick={resetGame}
                      className="bg-accent-orange hover:bg-accent-orange/80 text-dark-bg px-4 md:px-6 py-2 rounded text-sm md:text-base font-bold"
                    >
                      restart
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Score Display */}
        {gameStarted && !gameOver && (
          <div className="text-center mb-4">
            <p className="text-accent-teal text-lg font-bold">Score: {score}</p>
          </div>
        )}

        {/* Instructions and Controls */}
        <div className="text-right text-xs md:text-sm space-y-1 mb-4">
          <p className="text-accent-blue">// use keyboard arrows or buttons below</p>
          <p className="text-accent-blue">// WASD keys also work</p>
        </div>

        {/* On-screen Arrow Controls */}
        <div className="flex flex-col items-end gap-1">
          {/* Up Arrow */}
          <div className="flex justify-end">
            <button
              onClick={() => handleArrowClick('UP')}
              disabled={!gameStarted || gameOver}
              className={`w-10 h-10 md:w-12 md:h-12 rounded border-2 flex items-center justify-center text-lg font-bold transition-all ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-dark-bg'
                  : 'bg-light-secondary border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white'
              } ${(!gameStarted || gameOver) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              aria-label="Move up"
            >
              ↑
            </button>
          </div>
          
          {/* Left, Down, Right Arrows */}
          <div className="flex justify-end gap-1">
            <button
              onClick={() => handleArrowClick('LEFT')}
              disabled={!gameStarted || gameOver}
              className={`w-10 h-10 md:w-12 md:h-12 rounded border-2 flex items-center justify-center text-lg font-bold transition-all ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-dark-bg'
                  : 'bg-light-secondary border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white'
              } ${(!gameStarted || gameOver) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              aria-label="Move left"
            >
              ←
            </button>
            <button
              onClick={() => handleArrowClick('DOWN')}
              disabled={!gameStarted || gameOver}
              className={`w-10 h-10 md:w-12 md:h-12 rounded border-2 flex items-center justify-center text-lg font-bold transition-all ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-dark-bg'
                  : 'bg-light-secondary border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white'
              } ${(!gameStarted || gameOver) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              aria-label="Move down"
            >
              ↓
            </button>
            <button
              onClick={() => handleArrowClick('RIGHT')}
              disabled={!gameStarted || gameOver}
              className={`w-10 h-10 md:w-12 md:h-12 rounded border-2 flex items-center justify-center text-lg font-bold transition-all ${
                theme === 'dark'
                  ? 'bg-dark-secondary border-accent-teal text-accent-teal hover:bg-accent-teal hover:text-dark-bg'
                  : 'bg-light-secondary border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white'
              } ${(!gameStarted || gameOver) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
              aria-label="Move right"
            >
              →
            </button>
          </div>
        </div>

        {/* Food Counter */}
        <div className="mt-4 text-right">
          <p className="text-xs mb-1">// food eaten</p>
          <div className="flex justify-end gap-1">
            {Array(Math.min(score, 10)).fill(0).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-accent-teal rounded-full" />
            ))}
            {score > 10 && <span className="text-xs text-accent-teal ml-1">+{score - 10}</span>}
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setGameStarted(false)
            resetGame()
          }}
          className={`mt-4 w-full border px-4 md:px-6 py-2 rounded transition-colors text-sm ${
            theme === 'dark'
              ? 'border-white/20 text-white hover:bg-white/10'
              : 'border-gray-300 text-gray-900 hover:bg-gray-100'
          }`}
        >
          skip
        </button>
      </div>
    </div>
  )
}
