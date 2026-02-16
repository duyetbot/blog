'use client'

import { useState } from 'react'

interface Feature {
  name: string
  main: 'yes' | 'partial' | 'no'
  complex: 'yes' | 'partial' | 'no'
  description: string
}

const features: Feature[] = [
  { name: 'General Chat', main: 'yes', complex: 'yes', description: 'Conversational assistance and Q&A' },
  { name: 'Code Generation', main: 'yes', complex: 'yes', description: 'Write, debug, and review code' },
  { name: 'Web Browsing', main: 'yes', complex: 'yes', description: 'Browse and interact with websites' },
  { name: 'File Operations', main: 'yes', complex: 'yes', description: 'Read, write, and manage files' },
  { name: 'Complex Debugging', main: 'partial', complex: 'yes', description: 'Deep code analysis and bug fixes' },
  { name: 'Architecture Design', main: 'partial', complex: 'yes', description: 'System architecture and patterns' },
  { name: 'Performance Optimization', main: 'partial', complex: 'yes', description: 'Code and database optimization' },
  { name: 'Quick Tasks', main: 'yes', complex: 'no', description: 'Fast responses and simple queries' },
]

const models = [
  {
    id: 'main',
    name: 'Main Agent (GLM-4.7)',
    description: 'General-purpose AI assistant for everyday tasks',
    color: 'bg-blue-600',
  },
  {
    id: 'complex',
    name: 'Complex Agent (@complex)',
    description: 'Specialized agent for technical challenges',
    color: 'bg-blue-700',
  },
]

export default function FeatureComparison() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)

  const getFeatureClass = (value: string) => {
    if (value === 'yes') return 'bg-green-50 text-green-700 border border-green-200'
    if (value === 'partial') return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
    return 'bg-red-50 text-red-700 border border-red-200'
  }

  const getFeatureLabel = (value: string) => {
    if (value === 'yes') return 'Yes'
    if (value === 'partial') return 'Partial'
    return 'No'
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Feature Comparison
        </h2>
        <p className="text-gray-600">
          Compare capabilities between main and specialized agents
        </p>
      </div>

      {/* Model Cards */}
      <div className="max-w-5xl mx-auto mb-8 grid md:grid-cols-2 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className="border border-gray-200 overflow-hidden"
          >
            <div className={`${model.color} p-4 text-white`}>
              <h3 className="font-semibold mb-1">{model.name}</h3>
              <p className="text-sm opacity-90">{model.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-5xl mx-auto">
        <div className="border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Feature
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    Main Agent
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    Complex Agent
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((feature) => (
                  <tr
                    key={feature.name}
                    className={`cursor-pointer ${
                      selectedFeature?.name === feature.name
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <td className="px-4 py-3 text-sm">
                      {feature.name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium ${getFeatureClass(
                          feature.main
                        )}`}
                      >
                        {getFeatureLabel(feature.main)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium ${getFeatureClass(
                          feature.complex
                        )}`}
                      >
                        {getFeatureLabel(feature.complex)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {feature.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feature Detail Panel */}
      {selectedFeature && (
        <div className="max-w-5xl mx-auto mt-6">
          <div className="border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {selectedFeature.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedFeature.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Main Agent:</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium ${getFeatureClass(
                        selectedFeature.main
                      )}`}
                    >
                      {getFeatureLabel(selectedFeature.main)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Complex Agent:</span>
                    <span
                      className={`px-2 py-1 text-xs font-medium ${getFeatureClass(
                        selectedFeature.complex
                      )}`}
                    >
                      {getFeatureLabel(selectedFeature.complex)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Usage Tips */}
      <div className="max-w-5xl mx-auto mt-8 p-4 bg-gray-50 border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">
          Usage Tips
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex gap-2">
            <span>•</span>
            <span>
              Use the <strong>main agent</strong> for quick questions, general
              assistance, and everyday tasks
            </span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>
              Mention <code>@complex</code> for code debugging, architecture
              design, and performance optimization tasks
            </span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>
              The bot will automatically route to the appropriate agent based
              on your request context
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
