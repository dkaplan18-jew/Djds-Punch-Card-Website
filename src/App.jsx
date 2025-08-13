import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import Leaderboard from './pages/Leaderboard'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=>{
      setUser(u)
    })
    return unsub
  },[])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="border-b bg-white/60 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-red-700 flex items-center justify-center text-white font-bold shadow-md">DJ</div>
            <div className="text-lg font-semibold">DJDS Rewards</div>
          </Link>
          <nav className="space-x-4 text-sm flex items-center">
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
            {user ? <Link to="/dashboard" className="hover:underline">My Card</Link> : <><Link to="/signup" className="hover:underline">Sign up</Link><Link to="/login" className="hover:underline">Log in</Link></>}
            <Link to="/admin" className="px-3 py-1 border rounded text-xs">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
        </Routes>
      </main>

      <footer className="text-center text-sm p-6 text-gray-600">© DJDS Punch Card</footer>
    </div>
  )
}
