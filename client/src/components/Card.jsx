import React from 'react'

import {download} from '../assets'
import {downloadImage} from "../utils"

const Card = ({ _id, name, prompt, photo}) => {
  return (
    <div className="rounded-md group relative shadow-card hover:shadow-cardhover card">
      <img 
        className='w-full h-auto object-cover rounded-md'
        src={photo}
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className='w-7 h-7 rounded-full object-cover bg-[#A9DBD7] bg-700 flex justify-center items-center text-[#161215] text-xs font-bold'>{name[0]}</div>
          <p className="text-[#A9DBD7] text-sm">{name}</p>
          </div>
        <button
        type="button"
        onClick={() => downloadImage(_id, photo)}
        className='outline-none bg-transparent border-none'
        >
          <img src={download} alt="download" className="w-6 h-6 object-contain invert"/>
        </button>
        </div>
      </div>
    </div>
  )
}

export default Card