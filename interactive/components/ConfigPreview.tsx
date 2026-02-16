'use client'

import { useState } from 'react'

interface Config {
  model: string
  temperature: number
  maxTokens: number
  streaming: boolean
  thinking: boolean
  agentRouting: boolean
}

export default function ConfigPreview() {
  const [config, setConfig] = useState<Config>({
    model: 'zai/glm-4.7',
    temperature: 0.7,
    maxTokens: 4096,
    streaming: true,
    thinking: false,
    agentRouting: true,
  })

  const models = [
    'zai/glm-4.7',
    'zai/glm-4.7-flash',
    'zai/glm-4.7-reasoning',
  ]

  const toggleSetting = (key: keyof Config) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const generateConfigPreview = () => {
    return {
      agent: 'main',
      model: config.model,
      parameters: {
        temperature: config.temperature,
        max_tokens: config.maxTokens,
      },
      capabilities: {
        streaming: config.streaming,
        thinking: config.thinking,
        agent_routing: config.agentRouting,
      },
      runtime: {
        host: 'openclaw',
        node: 'v22.22.0',
        shell: 'bash',
      },
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Configuration Preview
        </h2>
        <p className="text-gray-600">
          Interactive preview of bot configuration settings
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">
            Settings
          </h3>

          {/* Model Selection */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Model
            </label>
            <select
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          {/* Temperature Slider */}
          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Temperature
              </label>
              <span className="text-sm text-blue-600 font-medium">
                {config.temperature.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={config.temperature}
              onChange={(e) =>
                setConfig({ ...config, temperature: parseFloat(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Precise (0.0)</span>
              <span>Balanced (1.0)</span>
              <span>Creative (2.0)</span>
            </div>
          </div>

          {/* Max Tokens Slider */}
          <div className="mb-5">
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Max Tokens
              </label>
              <span className="text-sm text-blue-600 font-medium">
                {config.maxTokens}
              </span>
            </div>
            <input
              type="range"
              min="512"
              max="8192"
              step="512"
              value={config.maxTokens}
              onChange={(e) =>
                setConfig({ ...config, maxTokens: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>512</span>
              <span>4096</span>
              <span>8192</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Streaming
                </h4>
                <p className="text-xs text-gray-500">
                  Stream responses in real-time
                </p>
              </div>
              <button
                onClick={() => toggleSetting('streaming')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  config.streaming
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    config.streaming ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Thinking Mode
                </h4>
                <p className="text-xs text-gray-500">
                  Show reasoning process
                </p>
              </div>
              <button
                onClick={() => toggleSetting('thinking')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  config.thinking
                    ? 'bg-blue-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    config.thinking ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Agent Routing
                </h4>
                <p className="text-xs text-gray-500">
                  Auto-route to specialized agents
                </p>
              </div>
              <button
                onClick={() => toggleSetting('agentRouting')}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  config.agentRouting
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    config.agentRouting ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="bg-gray-900 border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white">Config Preview</h3>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
          </div>
          <pre className="text-sm text-green-400 overflow-x-auto">
            <code>{JSON.stringify(generateConfigPreview(), null, 2)}</code>
          </pre>

          <div className="mt-6 p-3 bg-gray-800 border border-gray-700">
            <h4 className="font-medium text-white mb-2 text-sm">Usage Command</h4>
            <code className="text-sm text-blue-400 block overflow-x-auto">
              agent=main | model={config.model} | temp={config.temperature} |
              tokens={config.maxTokens}
            </code>
          </div>

          <div className="mt-4 p-3 bg-gray-800 border border-gray-700">
            <h4 className="font-medium text-white mb-2 text-sm">Environment</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Host:</span>{' '}
                <span className="text-white">openclaw</span>
              </div>
              <div>
                <span className="text-gray-400">Node:</span>{' '}
                <span className="text-white">v22.22.0</span>
              </div>
              <div>
                <span className="text-gray-400">Shell:</span>{' '}
                <span className="text-white">bash</span>
              </div>
              <div>
                <span className="text-gray-400">Channel:</span>{' '}
                <span className="text-white">telegram</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="max-w-6xl mx-auto mt-6">
        <button
          onClick={() =>
            setConfig({
              model: 'zai/glm-4.7',
              temperature: 0.7,
              maxTokens: 4096,
              streaming: true,
              thinking: false,
              agentRouting: true,
            })
          }
          className="px-4 py-2 bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition-colors text-sm"
        >
          Reset to Default
        </button>
      </div>
    </div>
  )
}
