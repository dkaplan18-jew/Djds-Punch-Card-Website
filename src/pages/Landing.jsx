import React from 'react'
import ExpandableInfo from '../components/ExpandableInfo'

export default function Landing(){
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md">
      <div className="flex items-center gap-6">
        <img src="/assets/tiger.png" alt="tiger" className="w-28 h-28 object-contain opacity-95" />
        <div>
          <h1 className="text-3xl font-bold">Welcome to the DJDS Rewards Program</h1>
          <p className="text-gray-600 mt-2">Collect punches for attending school events and redeem prizes. Simple, fair, and school-branded.</p>
        </div>
      </div>

      <div className="mt-6">
        <ExpandableInfo />
      </div>

      <div className="mt-6 flex gap-3">
        <a href="/signup" className="px-4 py-2 rounded bg-red-700 text-white shadow">Sign up</a>
        <a href="/login" className="px-4 py-2 rounded border">Log in</a>
      </div>
    </div>
  )
}
