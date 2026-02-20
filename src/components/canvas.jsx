import { useGlobalContext } from '../context'
import { secondNavbarItems } from '../utils/files'

const canvas = () => {
  const {
    fetchedImages,
    pageCounts,
    setPageCounts,
    loadedImages,
    handleImageLoad,
    downlaodImage,
    activeId,
    setActiveId,
    changeInputTo,
    addFavorite,
    navigateLogin,
    token,
    likedImage,
    toggleLikedImage,
    removeFavorite,
    handleLike,
  } = useGlobalContext()

  return (
    <section>
      <div className='border-b border-gray-200 mb-6'>
        <ul className='mx-6 flex gap-5 whitespace-nowrap no-x-scroll py-4 cursor-pointer'>
          {secondNavbarItems.map((item) => {
            const { id, title } = item
            return (
              <li
                key={id}
                className={`hover:text-black text-[0.9rem] font-medium ${activeId === id ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                onClick={() => {
                  setActiveId(id)
                  changeInputTo(title)
                }}
              >
                {title}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='mx-6 block columns-1 md:columns-2 lg:columns-3 gap-6'>
        {fetchedImages.map((image) => {
          const {
            id,
            alt_description,
            urls: { thumb, regular },
            user: {
              name,
              profile_image: { small },
            },
          } = image
          return (
            <div key={id} className='relative break-inside-avoid parent mb-7'>
              <div
                className={`px-3 py-1 rounded-sm text-gray-500 hover:text-black absolute top-5 right-5 overlay ${likedImage.includes(id) ? 'bg-green-500 text-white' : 'bg-white'}`}
                title='add to favorites'
                onClick={() => {
                  handleLike(image)
                  toggleLikedImage(id)
                }}
              >
                <i className='fa-solid fa-plus'></i>
              </div>
              <img
                key={id}
                src={loadedImages[id] ? regular : thumb}
                className={`w-full transition-opacity duration-500 ${loadedImages[id] ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(id)}
                alt={alt_description}
                title={alt_description}
              />
              <div className='flex justify-between relative bottom-13 items-center px-5 overlay'>
                <div className='flex gap-2 items-center'>
                  <img src={small} alt={name} className='rounded-full w-7' />
                  <p className='text-white font-medium'>{name}</p>
                </div>
                <div
                  className='bg-white px-3 rounded-sm text-gray-500 hover:text-black'
                  title='download'
                  onClick={() => downlaodImage(regular, `${alt_description}`)}
                >
                  <i className='fa-solid fa-arrow-down'></i>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col items-center py-3'>
        <div className='flex gap-3'>
          <button
            onClick={() => setPageCounts(pageCounts - 1)}
            className='px-2 py-0.5 bg-black hover:bg-gray-400 text-white rounded-sm text-[0.9rem] font-medium'
          >
            Prev
          </button>
          <p className=' text-[0.9rem] font-medium'>{pageCounts}</p>
          <button
            onClick={() => setPageCounts(pageCounts + 1)}
            className='px-2 py-0.5 bg-black hover:bg-gray-400 text-white rounded-sm text-[0.9rem] font-medium'
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default canvas
