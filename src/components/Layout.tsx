// src/components/Layout.tsx
import { NavLink, Outlet } from 'react-router-dom'
import { PATH } from '../routes/route.ts'

export default function Layout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors duration-200
     ${isActive 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Student Planner</h1>
          <nav className="flex gap-4"> {/* 👉 chỉnh từ gap-2 -> gap-4 cho thoáng */}
            <NavLink to={PATH.home} className={navLinkClass}>Home</NavLink>
            <NavLink to={PATH.tasks} className={navLinkClass}>Tasks</NavLink>
            <NavLink to={PATH.stats} className={navLinkClass}>Stats</NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="mx-auto max-w-3xl w-full px-6 py-8 bg-white rounded-xl shadow text-center">
          {/* 👉 text-center để chữ không dính về bên trái */}
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Student Planner
        </div>
      </footer>
    </div>
  )
}
