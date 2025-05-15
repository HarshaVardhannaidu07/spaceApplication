"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  size: number
  top: number
  left: number
  animationDuration: number
  animationDelay: number
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 5000)

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 1,
          top: Math.random() * 100,
          left: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 5,
        })
      }

      setStars(newStars)
    }

    generateStars()

    window.addEventListener("resize", generateStars)
    return () => window.removeEventListener("resize", generateStars)
  }, [])

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  )
}
