import React, {useEffect, useState} from 'react'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase'

export default function Leaderboard(){
  const [leaders, setLeaders] = useState([])

  useEffect(()=>{
    async function load(){
      // load top cards then join user display names
      const cardsRef = collection(db, 'cards')
      const cardsSnap = await getDocs(query(cardsRef, orderBy('count','desc'), limit(50)))
      const cards = cardsSnap.docs.map(d=>d.data())
      const usersRef = collection(db, 'users')
      const usersSnap = await getDocs(usersRef)
      const userMap = {}
      usersSnap.forEach(u=>{ userMap[u.id] = u.data() })
      const list = cards.map(c=>({ userId: c.userId, count: c.count || 0, displayName: userMap[c.userId]?.displayName || 'Unknown' }))
      setLeaders(list)
    }
    load()
  },[])

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {leaders.map((l,idx)=> (
          <div key={l.userId || idx} className="p-3 border rounded flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">{idx+1}</div>
              <div>
                <div className="font-medium">{l.displayName}</div>
                <div className="text-sm text-gray-500">{l.userId}</div>
              </div>
            </div>
            <div className="font-semibold">{l.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
