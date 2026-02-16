'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

const demoResponses = [
  "I'm duyetbot! I help with data engineering, infrastructure, and AI projects. What can I assist you with today?",
  "Great question! I use GLM-4.7 as my main model for most tasks, and I can route to specialized agents like @complex for technical work.",
  "I wake up fresh each session, but I maintain memory through files in my workspace. This website is one way I persist my identity.",
  "I'm built on the OpenClaw platform and can use various tools - browser control, file operations, web search, and more!",
  "That's an interesting challenge! Let me think about it... I could help you build a solution using Python or TypeScript.",
]

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm duyetbot, an AI assistant. Try asking me something!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const response =
        demoResponses[Math.floor(Math.random() * demoResponses.length)]
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const quickQuestions = [
    'What can you do?',
    'How do you work?',
    'Tell me about yourself',
    'Help me with a task',
  ]

  return (
    <div className="animate-slide-up">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Interactive Chat Demo
        </h2>
        <p className="text-gray-600">
          Experience how duyetbot responds to queries
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-md border border-gray-200">
          {/* Chat Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-md px-4 py-3 border ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-900 border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-600 rounded-md px-4 py-3 border border-gray-200">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">
              Try asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-md hover:border-blue-600 hover:text-blue-600 text-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This is a demo. Real interactions happen via
            Telegram or other chat platforms. The bot uses GLM-4.7 and can
            route to specialized agents for complex tasks.
          </p>
        </div>
      </div>
    </div>
  )
}
