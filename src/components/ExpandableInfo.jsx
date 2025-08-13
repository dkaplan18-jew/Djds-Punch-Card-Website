import React, {useState} from 'react'

export default function ExpandableInfo(){
  const [open,setOpen] = useState(false)
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <button onClick={()=>setOpen(o=>!o)} className="w-full text-left">
        <div className="flex justify-between items-center">
          <div className="font-semibold">How it works</div>
          <div className="text-sm text-gray-600">{open? 'Hide' : 'Learn more'}</div>
        </div>
      </button>
      {open && (
        <div className="mt-4 text-gray-700 space-y-2">
          <p>Attend sports games, Student Council events, or club-hosted activities to earn punches. Each event is worth a certain number of punches (admins control values).</p>
          <p>Collect punches on your 30-slot card and redeem prizes when you hit milestones. Your card updates in real time so you always know where you stand.</p>
        </div>
      )}
    </div>
  )
}
