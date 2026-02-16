'use client'

import { useState } from 'react'
import ChatDemo from '@/components/ChatDemo'
import StatusDashboard from '@/components/StatusDashboard'
import FeatureComparison from '@/components/FeatureComparison'
import ConfigPreview from '@/components/ConfigPreview'
import FeedbackForm from '@/components/FeedbackForm'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  const [activeTab, setActiveTab] = useState('playground')

  const tabs = [
    { id: 'playground', label: 'Playground' },
    { id: 'status', label: 'Status' },
    { id: 'features', label: 'Features' },
    { id: 'config', label: 'Config' },
    { id: 'feedback', label: 'Feedback' },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white font-semibold">
                DB
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">duyetbot</h1>
                <p className="text-sm text-gray-500">Interactive</p>
              </div>
            </div>
            <a
              href="https://bot.duyet.net"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Back to main
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-3 text-sm font-medium border-b-2 -mb-px
                  ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {activeTab === 'playground' && <ChatDemo />}
        {activeTab === 'status' && <StatusDashboard />}
        {activeTab === 'features' && <FeatureComparison />}
        {activeTab === 'config' && <ConfigPreview />}
        {activeTab === 'feedback' && (
          <div className="grid md:grid-cols-2 gap-8">
            <FeedbackForm />
            <Testimonials />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <p className="text-sm text-gray-500 text-center">
            Built with Next.js and React
          </p>
        </div>
      </footer>
    </main>
  )
}
