import React, {useEffect, useState} from 'react'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot, getDoc } from 'firebase/firestore'
import PunchCard from '../components/PunchCard'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const [card, setCard] = useState({count:0})

  useEffect(()=>{
    const unsubAuth = onAuthStateChanged(auth,u=>{
      if(!u){ setUser(null); return }
      setUser(u)
      const cardRef = doc(db, 'cards', u.uid)
      const unsubCard = onSnapshot(cardRef, snap=>{
        if(snap.exists()) setCard(snap.data())
      })
      return unsubCard
    })
    return unsubAuth
  },[])

  if(!user) return <div className="max-w-md mx-auto text-center">Please log in to see your dashboard.</div>

  const progress = card.count || 0
  const goal = 30

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">{user.displayName || user.email}'s Card</h2>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">{progress} / {goal}</div>
          <button onClick={()=>signOut(auth)} className="text-sm border px-3 py-1 rounded">Log out</button>
        </div>
      </div>

      <PunchCard count={progress} goal={goal} />

      {progress >= goal && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">Congratulations! You've completed your card — claim your prize with the Activities Office.</div>
      )}
    </div>
  )
}
