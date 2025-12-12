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

        if (head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE) {
          setGameOver(true)
          return prev
        }

        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true)
          return prev
        }

        newSnake.unshift(head)

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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) return
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, direction])

  const startGame = () => {
    setGameStarted(true)
    resetGame()
  }

  return (
    <div className="bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 p-8 rounded-lg backdrop-blur-sm border border-accent-teal/30">
      <div className="relative">
        <div className={`rounded-lg p-4 w-[400px] h-[400px] mb-4 ${theme === 'dark' ? 'bg-dark-secondary' : 'bg-light-secondary'}`}>
          {!gameStarted ? (
            <div className="flex items-center justify-center h-full">
              <button
                onClick={startGame}
                className="bg-accent-orange hover:bg-accent-orange/80 text-dark-bg px-6 py-3 rounded transition-colors font-bold"
              >
                start-game
              </button>
            </div>
          ) : (
            <div className="relative h-full">
              <svg width="360" height="360" className={`border-2 ${theme === 'dark' ? 'border-dark-border' : 'border-light-border'}`}>
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
                {snake.map((segment, index) => (
                  <rect
                    key={index}
                    x={segment[0] * 18}
                    y={segment[1] * 18}
                    width="17"
                    height="17"
                    fill="#43D9AD"
                    rx="2"
                  />
                ))}
                <circle
                  cx={food[0] * 18 + 8.5}
                  cy={food[1] * 18 + 8.5}
                  r="6"
                  fill="#43D9AD"
                />
              </svg>
              {gameOver && (
                <div className={`absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-dark-secondary/90' : 'bg-light-secondary/90'}`}>
                  <div className="text-center">
                    <p className={`text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>GAME OVER</p>
                    <p className="text-accent-teal mb-4">Score: {score}</p>
                    <button
                      onClick={resetGame}
                      className="bg-accent-orange hover:bg-accent-orange/80 text-dark-bg px-6 py-2 rounded"
                    >
                      restart
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-right text-sm space-y-1">
          <p>// use your keyboard</p>
          <p>// arrows to play</p>
          <div className="flex justify-end items-center gap-2 mt-4">
            <button className={`w-8 h-8 rounded border flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-dark-secondary border-dark-border text-white' 
                : 'bg-light-secondary border-light-border text-gray-900'
            }`}>
              ↑
            </button>
          </div>
          <div className="flex justify-end gap-1">
            <button className={`w-8 h-8 rounded border flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-dark-secondary border-dark-border text-white' 
                : 'bg-light-secondary border-light-border text-gray-900'
            }`}>
              ←
            </button>
            <button className={`w-8 h-8 rounded border flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-dark-secondary border-dark-border text-white' 
                : 'bg-light-secondary border-light-border text-gray-900'
            }`}>
              ↓
            </button>
            <button className={`w-8 h-8 rounded border flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-dark-secondary border-dark-border text-white' 
                : 'bg-light-secondary border-light-border text-gray-900'
            }`}>
              →
            </button>
          </div>
          <p className="mt-4 text-xs">// food left</p>
          <div className="flex justify-end gap-1 mt-1">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-accent-teal/30 rounded-full" />
            ))}
          </div>
        </div>

        <button
          onClick={() => setGameStarted(false)}
          className={`mt-4 border px-6 py-2 rounded transition-colors ${
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