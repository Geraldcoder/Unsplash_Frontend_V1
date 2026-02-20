import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { navbarItems } from '../utils/files'
import { useGlobalContext } from '../context'
import LogoutModal from './LogoutModal'

const navbar = () => {
  const {
    subMenuId,
    setSubMenuId,
    isMenuOpen,
    setIsMenuOpen,
    handleSubmit,
    searchTerm,
    setSearchTerm,
    token,
    navigateLogin,
    toggleModal,
  } = useGlobalContext()

  return (
    <>
      <nav className='flex justify-between px-6 py-3 items-center relative'>
        <a href='/'>
          <img src={logo} alt='Logo' className='w-12' />
        </a>
        <div
          className='flex gap-6 text-gray-500 text-[1.2rem]'
          onClick={token ? toggleModal : navigateLogin}
        >
          {token ? (
            <i className='fa-solid fa-circle-user text-gray-500 text-[1.5rem]'></i>
          ) : (
            <i className='fa-solid fa-user'></i>
          )}
          <i
            className='fa-solid fa-bars'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        </div>
        <LogoutModal />
        {isMenuOpen && (
          <div className='absolute right-4 top-12 bg-white shadow-sm text-[0.9rem] cursor-pointer rounded-lg z-10'>
            <div className='md:flex md:gap-3 block p-3'>
              {navbarItems.map((item) => {
                const { id, icon, title, subTitles } = item
                return (
                  <div className='p-4' key={id}>
                    <div className='flex gap-3 items-center font-bold'>
                      {icon}
                      <h3>{title}</h3>
                      <p
                        onClick={() =>
                          setSubMenuId(subMenuId === id ? null : id)
                        }
                        className='block md:hidden ml-auto mt-1 text-gray-400'
                      >
                        <i className='fa-solid fa-angle-down'></i>
                      </p>
                    </div>
                    {subTitles.map((title) => {
                      const { subId, subTitle } = title
                      return (
                        <ul
                          className={`${subMenuId === id ? 'block' : 'hidden'} md:block ml-[1.7rem] leading-8`}
                          key={subId}
                        >
                          <li className='text-gray-500 hover:text-black'>
                            {subTitle}
                          </li>
                        </ul>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </nav>
      <form
        className='mx-6 bg-gray-200 relative rounded-full'
        onSubmit={handleSubmit}
      >
        <i className='fa-solid fa-magnifying-glass absolute top-3 left-4'></i>
        <input
          type='text'
          placeholder='Search photos and illustrations...'
          className=' w-full p-2 ml-8 focus:outline-none'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </>
  )
}

export default navbar
