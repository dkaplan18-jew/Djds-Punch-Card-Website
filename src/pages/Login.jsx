import React, {useState} from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const navigate = useNavigate()

  async function handle(e){
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form onSubmit={handle} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full px-4 py-2 bg-red-700 text-white rounded">Log in</button>
      </form>
    </div>
  )
}
