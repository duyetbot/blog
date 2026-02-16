'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Duyet Le',
    role: 'Creator & Maintainer',
    content: 'duyetbot has transformed how I work. The agent routing feature is incredible - it automatically handles both quick questions and complex technical challenges.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Alex Chen',
    role: 'Data Engineer',
    content: 'The code debugging capabilities are outstanding. It saved me hours on a complex data pipeline issue. The @complex agent really shines for technical work.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sarah Kim',
    role: 'Developer',
    content: 'Love the automation features! The bot handles my daily reports, monitoring, and even helps with blog posts. It feels like having a real teammate.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Marcus Johnson',
    role: 'DevOps Engineer',
    content: 'The system status dashboard is exactly what I needed. Real-time monitoring of all services with clear health indicators. Makes incident response much faster.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div>
      <div className="border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            What People Say
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              aria-label="Previous testimonial"
            >
              &larr;
            </button>
            <button
              onClick={goToNext}
              className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              aria-label="Next testimonial"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="border border-gray-200 p-5">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    "{testimonial.content}"
                  </p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            5.0
          </div>
          <div className="text-sm text-gray-500">
            Average Rating
          </div>
        </div>
        <div className="border border-gray-200 p-4 text-center">
          <div className="text-2xl font-semibold text-blue-600 mb-1">
            {testimonials.length}
          </div>
          <div className="text-sm text-gray-500">
            Testimonials
          </div>
        </div>
      </div>

      {/* Add Your Voice */}
      <div className="mt-6 p-4 bg-blue-600 text-white">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="font-semibold">Share Your Experience</h4>
            <p className="text-sm opacity-90">
              Have you used duyetbot? Add your testimonial!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
