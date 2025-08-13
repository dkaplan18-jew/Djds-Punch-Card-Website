import React from 'react'

export default function PunchCard({count=0, goal=30}){
  const cols = 6
  const rows = Math.ceil(goal/cols)
  const total = rows*cols
  const cells = Array.from({length: total}, (_,i)=> i < count)

  return (
    <div className="p-6 rounded-2xl shadow-inner bg-white" style={{maxWidth:720}}>
      <div className="grid gap-3" style={{gridTemplateColumns:`repeat(${cols}, 1fr)`}}>
        {cells.map((filled, i)=> (
          <div key={i} className={`w-full aspect-square rounded-full flex items-center justify-center border transition-all ${filled? 'bg-red-700 text-white border-red-700 shadow-lg scale-105' : 'bg-white text-gray-300 border-gray-200'}`}>
            {filled ? '★' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}
