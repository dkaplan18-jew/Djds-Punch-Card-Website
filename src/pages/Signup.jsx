import React, {useState} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default function Signup(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const [error,setError]=useState(null)
  const navigate = useNavigate()

  async function handle(e){
    e.preventDefault()
    try{
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name })
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        displayName: name,
        role: 'student',
        createdAt: serverTimestamp()
      })
      await setDoc(doc(db, 'cards', cred.user.uid), {
        userId: cred.user.uid,
        count: 0,
        lastUpdated: serverTimestamp()
      })
      navigate('/dashboard')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={handle} className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" required />
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full px-4 py-2 bg-red-700 text-white rounded">Create account</button>
      </form>
    </div>
  )
}
