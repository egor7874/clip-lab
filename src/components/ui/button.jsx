// src/components/ui/button.jsx
import React from "react"
import { cn } from "./utils"  // Добавим utils позже

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90",
        className
      )}
      {...props}
    />
  )
}