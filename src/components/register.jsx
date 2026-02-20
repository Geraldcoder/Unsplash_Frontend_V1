import { useGlobalContext } from '../context'

const register = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    errorMsg,
    handleRegister,
  } = useGlobalContext()

  return (
    <div className='flex flex-col items-center justify-center relative h-screen'>
      <div className='bg-white rounded-sm md:shadow-sm w-full md:w-120 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] p-5'>
        <h3 className='text-[1.2rem] font-bold pb-5'>Create account</h3>
        <form
          className='flex flex-col justify-center space-y-2'
          onSubmit={handleRegister}
        >
          {errorMsg && <i className='text-red-500 text-0.8rem'>{errorMsg}</i>}
          <label htmlFor='email' className='font-bold'>
            Email
          </label>
          <input
            type='text'
            placeholder='your email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='name' className='font-bold'>
            Full name
          </label>
          <input
            type='text'
            placeholder='your full name...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='password' className='font-bold'>
            Password
          </label>
          <input
            type='text'
            placeholder='your password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='px-3 bg-black hover:bg-gray-700 text-white rounded-sm'>
            Submit
          </button>
        </form>
        <h3 className='pt-5'>
          Already have an account? <a href='/login'>Login here</a>
        </h3>
      </div>
    </div>
  )
}

export default register
