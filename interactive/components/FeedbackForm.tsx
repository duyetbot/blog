'use client'

import { useState } from 'react'

interface FeedbackData {
  name: string
  email: string
  rating: number
  category: string
  message: string
}

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: '',
    email: '',
    rating: 5,
    category: 'general',
    message: '',
  })

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', feedback)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const StarRating = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setFeedback({ ...feedback, rating: star })}
          className="text-lg"
        >
          {star <= feedback.rating ? '★' : '☆'}
        </button>
      ))}
    </div>
  )

  if (submitted) {
    return (
      <div className="border border-gray-200 p-6 text-center">
        <div className="text-4xl mb-3">Done</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 text-sm">
          Your feedback has been recorded. We appreciate your input!
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Share Your Feedback
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Help us improve duyetbot by sharing your thoughts
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={feedback.name}
              onChange={(e) =>
                setFeedback({ ...feedback, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-400"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={feedback.email}
              onChange={(e) =>
                setFeedback({ ...feedback, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-400"
              placeholder="your@email.com"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={feedback.category}
              onChange={(e) =>
                setFeedback({ ...feedback, category: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating />
            <p className="text-xs text-gray-500 mt-1">
              {feedback.rating}/5 stars
            </p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={feedback.message}
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
              required
              rows={5}
              className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-400 resize-none"
              placeholder="Tell us what you think..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Feedback
          </button>
        </form>

        {/* Privacy Note */}
        <div className="mt-5 p-3 bg-gray-50 border border-gray-200 text-sm">
          <p className="text-gray-600">
            Your feedback is private and will only be used to improve the
            bot. No personal data will be shared.
          </p>
        </div>
      </div>
    </div>
  )
}
