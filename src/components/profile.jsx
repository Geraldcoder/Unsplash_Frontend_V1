import React from 'react'
import { useGlobalContext } from '../context'

const profile = () => {
  const { user, fetchLikedImages, favoritedImages, likedImage, handleLike } =
    useGlobalContext()

  fetchLikedImages()

  return (
    <section className='mx-6'>
      <div className='flex flex-col items-center my-12'>
        <div className='flex gap-6 items-center'>
          <i className='fa-solid fa-circle-user text-gray-500 text-[8rem]'></i>
          <div>
            <h1 className='text-[2rem] font-bold pb-3'>{user?.username}</h1>
            <p className='text-gray-500'>
              Download free, beautiful high-quality photos curated by{' '}
              {user?.username}.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-15'>
        <div className='flex'>
          <p className='text-black border-b-2 border-black pb-3'>
            Photos <i className='fa-solid fa-image'></i>{' '}
            {favoritedImages.length}
          </p>
        </div>
      </div>
      <hr className='w-full border-gray-300' />
      <div className='block columns-1 md:columns-2 lg:columns-3 gap-6 mt-5'>
        {favoritedImages.map((image) => {
          const { externalId, imageUrl, imgDesc } = image
          return (
            <div key={externalId} className='parent relative'>
              <div
                className={`px-3 py-1 rounded-sm text-gray-500 hover:text-black absolute top-5 right-5 overlay ${likedImage.includes(externalId) ? 'bg-green-500 text-white' : 'bg-white'}`}
                onClick={() => handleLike(image)}
              >
                <i className='fa-solid fa-plus'></i>
              </div>
              <img src={imageUrl} alt={imgDesc} className='pb-6' />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default profile
