"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

// Import KaTeX CSS for proper formula rendering
import "katex/dist/katex.min.css"
import "react-quill/dist/quill.snow.css"

interface TheoryDisplayProps {
  content: string
  isCompleted?: boolean
  className?: string
}

export function TheoryDisplay({ content, isCompleted, className }: TheoryDisplayProps) {
  useEffect(() => {
    // Ensure KaTeX is available for formula rendering
    if (typeof window !== "undefined") {
      import("katex").then((katex) => {
        window.katex = katex.default
      })
    }
  }, [])

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900">Theory Content</h4>
        {isCompleted && (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      {/* Render the rich text content with proper styling */}
      <div className="prose prose-sm max-w-none">
        <div
          className="ql-editor text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            padding: 0, // Remove default ql-editor padding
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        />
      </div>
    </Card>
  )
}
