"use client"

import { useState, useEffect } from "react"

type Header = { key: string; value: string }
type HistoryItem = {
  id: string
  method: string
  url: string
  response: any
  date: string
}

export default function ApiRequestBuilder() {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }])
  const [body, setBody] = useState("")
  const [activeTab, setActiveTab] = useState<"headers" | "body">("headers")
  const [response, setResponse] = useState<any>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("api-history")
    if (saved) setHistory(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("api-history", JSON.stringify(history))
  }, [history])

  function addHeaderRow() {
    setHeaders([...headers, { key: "", value: "" }])
  }

  function updateHeader(index: number, field: "key" | "value", value: string) {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  async function sendRequest() {
    // Fake simulated response
    const simulatedResponse = {
      success: true,
      url,
      method,
      headers: headers.filter(h => h.key),
      body: body ? JSON.parse(body || "{}") : null,
      timestamp: new Date().toISOString(),
      message: "Simulated API response"
    }

    setResponse(simulatedResponse)

    const newHistory: HistoryItem = {
      id: crypto.randomUUID(),
      method,
      url,
      response: simulatedResponse,
      date: new Date().toLocaleString()
    }

    setHistory([newHistory, ...history])
  }

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4">API Request Builder</h2>

      {/* Method & URL */}
      <div className="flex gap-3 mb-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="bg-zinc-800 px-3 py-2 rounded"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/users"
          className="flex-1 bg-zinc-800 px-3 py-2 rounded"
        />

        <button
          onClick={sendRequest}
          className="bg-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-3 text-sm">
        <button
          onClick={() => setActiveTab("headers")}
          className={activeTab === "headers" ? "border-b-2 border-blue-500" : "text-zinc-400"}
        >
          Headers
        </button>
        <button
          onClick={() => setActiveTab("body")}
          className={activeTab === "body" ? "border-b-2 border-blue-500" : "text-zinc-400"}
        >
          Body (JSON)
        </button>
      </div>

      {/* Headers Tab */}
      {activeTab === "headers" && (
        <div className="space-y-2 mb-4">
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={h.key}
                onChange={(e) => updateHeader(i, "key", e.target.value)}
                placeholder="Header"
                className="bg-zinc-800 px-2 py-1 rounded w-1/2"
              />
              <input
                value={h.value}
                onChange={(e) => updateHeader(i, "value", e.target.value)}
                placeholder="Value"
                className="bg-zinc-800 px-2 py-1 rounded w-1/2"
              />
            </div>
          ))}
          <button onClick={addHeaderRow} className="text-blue-400 text-sm">
            + Add header
          </button>
        </div>
      )}

      {/* Body Tab */}
      {activeTab === "body" && (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='{ "name": "John" }'
          className="w-full h-28 bg-zinc-800 p-2 rounded mb-4"
        />
      )}

      {/* Response */}
      {response && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Response</h3>
          <pre className="bg-black p-3 rounded text-green-400 text-sm overflow-x-auto">
{JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Request History</h3>
          <div className="space-y-2 max-h-48 overflow-auto">
            {history.map(item => (
              <div
                key={item.id}
                className="bg-zinc-800 p-2 rounded text-sm cursor-pointer hover:bg-zinc-700"
                onClick={() => setResponse(item.response)}
              >
                <span className="font-semibold">{item.method}</span>{" "}
                <span className="text-zinc-400">{item.url}</span>
                <div className="text-xs text-zinc-500">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
