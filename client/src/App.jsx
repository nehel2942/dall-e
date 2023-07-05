import React, { useState, useEffect} from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost} from './pages';
import { FormField } from './components';
import { BsLinkedin, BsTwitter, BsGithub, BsGoogle, BsInstagram } from 'react-icons/bs'


const App = () => {

  return (
    <BrowserRouter>
      <header className="w-full flex justify-between item-center bg-[#161215] sm:px-8 px-4 py-4 border-b border-b-[#008F83]">
        <Link to="/">
        <img src={logo} lt="logo"
          className='w-10 object-contain'
        />
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-[#008F83] text-white px-4 py-2 rounded-md">Create</Link>
      </header>
      <main className="sm:p-8 px-4 py-12 w-full bg-[#161215] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/create-post" element={<CreatePost />}/>
      </Routes>
      </main>
      <footer className='w-full flex flex-col item-center justify-between bg-[#161215] sm:px-8 px-4 py-4 min-h-[calc(100vh-73px) border-t border-t-[#008F83]'>
      <img src="/coder-img.png" className='mx-auto w-40 h-90 object-contain'/>
      <div className="text-[#EDFDFC] text-center p-5">
      <p>Hey there! I'm Nehel Khanna, an enthusiastic web developer who loves creating captivating online experiences.</p> 
      <p className="py-4 text-[#A9DBD7]">Let's connect and collaborate!</p>
      <p>Reach out to me on my social media handles below.</p>
      <p className="py-4 text-[#A9DBD7]">Can't wait to chat!</p>
      </div>
      <div className="flex justify-around text-[#EDFDFC] py-4">
      <a href="https://www.linkedin.com/in/nehel-khanna-a0a117210" target="_blank"><BsLinkedin /></a>
      <a href="https://github.com/nehel2942" target="_blank"><BsGithub /></a>
      <a href="https://twitter.com/nehelkhanna" target="_blank"><BsTwitter /></a>
      <a href="https://instagram.com/nehelkhanna" target="_blank"><BsInstagram /></a>
      </div>
      <h1 className='w-full text-center py-5 text-[#EDFDFC] block border-t border-t-[#45494A]'>Copyright ©️ 2023, Nehel Khanna. All Rights Reserved.</h1>
      </footer>

    </BrowserRouter>
  )
}

export default App
