import React, {useState} from 'react'
import { collection, query, getDocs, doc, updateDoc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export default function AdminPanel(){
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [message, setMessage] = useState('')

  async function doSearch(){
    setMessage('Searching...')
    const usersRef = collection(db, 'users')
    const snaps = await getDocs(query(usersRef))
    const list = []
    snaps.forEach(s=>{
      const d = s.data()
      if(d.displayName?.toLowerCase().includes(search.toLowerCase()) || d.email?.toLowerCase().includes(search.toLowerCase())){
        list.push(d)
      }
    })
    setResults(list)
    setMessage('')
  }

  async function punch(userId, amount=1){
    const cardRef = doc(db, 'cards', userId)
    const snap = await getDoc(cardRef)
    let newCount = 0
    if(snap.exists()) newCount = (snap.data().count || 0) + amount
    else await setDoc(cardRef, { userId, count: amount, lastUpdated: serverTimestamp() })
    await updateDoc(cardRef, { count: newCount, lastUpdated: serverTimestamp() })
    setMessage(`Updated ${newCount} punches for ${userId}`)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
      <div className="flex gap-2 mb-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email" className="p-2 border rounded flex-1" />
        <button onClick={doSearch} className="px-4 py-2 bg-red-700 text-white rounded">Search</button>
      </div>

      {message && <div className="mb-4 text-sm text-gray-600">{message}</div>}

      <div className="space-y-3">
        {results.map(u=> (
          <div key={u.uid} className="p-3 border rounded flex items-center justify-between">
            <div>
              <div className="font-semibold">{u.displayName || u.email}</div>
              <div className="text-sm text-gray-600">{u.email}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>punch(u.uid,1)} className="px-3 py-1 border rounded">+1</button>
              <button onClick={()=>punch(u.uid,5)} className="px-3 py-1 border rounded">+5</button>
              <button onClick={async ()=>{ await updateDoc(doc(db, 'cards', u.uid), { count: 0, lastUpdated: serverTimestamp()}); setMessage('Reset') }} className="px-3 py-1 border rounded">Reset</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
