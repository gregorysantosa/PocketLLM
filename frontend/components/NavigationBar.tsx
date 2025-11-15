'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { usePathname } from 'next/navigation'

/**
 * NavigationBar Component
 *
 * Architecture Reference: HW3 Component Diagram - Navigation Bar
 * - Global navigation component
 * - Shows auth status and navigation links
 * - Part of Root Layout
 */

export default function NavigationBar() {
  const { isAuthenticated, user, logout } = useAuth()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            PocketLLM Portal
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/"
                  className={`px-3 py-2 rounded ${
                    isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                >
                  Chat
                </Link>
                <Link
                  href="/history"
                  className={`px-3 py-2 rounded ${
                    isActive('/history') ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`}
                >
                  History
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded ${
                      isActive('/admin') ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">{user?.username}</span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
