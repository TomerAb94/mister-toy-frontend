import React, { use } from 'react'
import { useEffect } from 'react'

export function PopUp ({ children, isOpen, onClose, title = 'Pop-Up' }) {
  if (!isOpen) return

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? onClose() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [])

  return (
    <div className="pop-up">
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer>2025 &copy; All rights reserved</footer>
    </div>
  )
}


