import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { Loader, FormField } from '../components'
import Confetti from "react-confetti"

const CreatePost = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isConfetti, setIsConfetti] = useState(false)

  const generateImage = async () => {
    if(form.prompt){
      try {
        setGeneratingImg(true)
        const response = await fetch('http://localhost:8080/api/v1/dalle',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt})
        })

        const data = await response.json()
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false)
      }
    }
    else {
      alert("Please enter a prompt")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && (form.photo && form.name)) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt: randomPrompt})
    setIsConfetti(true);
    setTimeout(() => setIsConfetti(false),5000) 
  }

  return (
    <section className="max-w-7x1 mx-auto">
    {isConfetti && <Confetti
      numberOfPieces={100}
      recycle = {!isConfetti}
      confettiSource={{x: 0, y: window.innerHeight/2, w: window.innerWidth, h:75}}
      opacity={0.8}
      colors={['#FFF3EB','#008F83','#A9DBD7','#EDFDFC','#FB9F89','#B7ADCF']}
    />}
      <div>
        <h1 className='font-extrabold text-[#D6FFFB] text-[32px]'>
          Create
        </h1>
        <p className="mt-2 text-[#EDFDFC] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and share them with the community
        </p>
      </div>

      <form className='mt-16 max-w-3x1' onSubmit={handleSubmit}>

        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
          type="button"
          onClick={generateImage}
          className='text-white bg-[#008F83] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'
          >
          {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#A9DBD7] text-[14px]'>
            You have created the image you want, you can share it with others in the community.
          </p>
          <button
          type="submit"
          className='mt-3 text-[#161215] bg-[#A9DBD7] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>

      </form>
    </section>
  )
}

export default CreatePost
