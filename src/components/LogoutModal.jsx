import { useGlobalContext } from '../context'

const LogoutModal = () => {
  const { user, handleLogout, isModalOpen } = useGlobalContext()
  return (
    isModalOpen && (
      <div className='shadow-sm absolute right-6 top-12 z-10 bg-white rounded-lg text-gray-500 text-sm cursor-pointer flex flex-col items-center p-2'>
        <div className='flex flex-col items-center px-8 py-2 hover:bg-gray-100 hover:text-black hover:rounded-lg mb-2'>
          <i className='fa-solid fa-circle-user text-gray-500 text-[1.5rem]'></i>
          <p className='font-medium text-black pt-2'>{user?.username}</p>
          <a href='/profile' className='pt-2 text-[0.8rem]'>
            View Profile
          </a>
        </div>
        <hr className='w-full border-gray-300' />
        <p
          className='w-full text-center hover:bg-gray-100 hover:text-black hover:rounded-lg m-4 p-2'
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    )
  )
}

export default LogoutModal
