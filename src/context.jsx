import { useContext, createContext, Children, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveAs } from 'file-saver'
import { jwtDecode } from 'jwt-decode'

const ProductProvider = createContext()

const AppProvider = ({ children }) => {
  const [subMenuId, setSubMenuId] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [pageCounts, setPageCounts] = useState(1)
  const [fetchedImages, setFetchedImages] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loadedImages, setLoadedImages] = useState({})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likedImage, setLikedImage] = useState(() => {
    const stored = localStorage.getItem('likedImages')
    return stored ? JSON.parse(stored) : []
  })
  const [favoritedImages, setFavoritedImages] = useState([])

  const navigate = useNavigate()

  const url = 'https://api.unsplash.com/search/photos'

  const fetchPhotos = async (customQuery) => {
    const query = customQuery || searchTerm
    const response = await fetch(
      `${url}?query=${query}&page=${pageCounts}&per_page=30&client_id=${import.meta.env.VITE_ACCESS_KEY}`,
    )
    const data = await response.json()
    console.log(data)

    setFetchedImages(data.results)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPhotos(searchTerm)
    setPageCounts(1)
  }

  // Get the token

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (!token || token === undefined) {
    localStorage.removeItem('token')
    console.log('token not found')
  }

  useEffect(() => {
    const query = searchTerm || 'gym'
    fetchPhotos(query)

    if (token) {
      const decoded = jwtDecode(token)
      setUser(decoded)
    }

    if (token && userId) {
      const stored = localStorage.getItem(`likedImages_${userId}`)
      setLikedImage(stored ? JSON.parse(stored) : [])
    } else {
      setLikedImage([])
    }
  }, [pageCounts, token, navigate, userId])

  useEffect(() => {
    if (token && userId) {
      localStorage.setItem(`likedImages_${userId}`, JSON.stringify(likedImage))
    }
  }, [likedImage, token, userId])

  const changeInputTo = (t) => {
    setSearchTerm(t)
    fetchPhotos(t)
    setPageCounts(1)
    setSearchTerm('')
  }

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }))
  }

  const downlaodImage = (blob, fileName) => {
    saveAs(blob, fileName)
  }

  // Login functionality

  const loginUrl = 'https://unsplash-backend-v1.onrender.com/auth/login'

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()
    if (!response.ok) {
      setErrorMsg(data.msg)
    }
    const {
      token,
      msg: { _id },
    } = data

    localStorage.setItem('token', token)
    localStorage.setItem('userId', _id)

    if (token) {
      navigate('/')
    }
  }

  // Register functionality

  const registerUrl = 'https://unsplash-backend-v1.onrender.com/auth/register'

  const handleRegister = async (e) => {
    e.preventDefault()

    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    })
    const data = await response.json()
    if (!response.ok) {
      setErrorMsg(data.msg)
    }
    const {
      token,
      msg: { _id },
    } = data
    localStorage.setItem('token', token)
    localStorage.setItem('userId', _id)

    if (token) {
      navigate('/')
    }
  }

  // Login functionality
  const navigateLogin = () => {
    navigate('/login')
  }

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsModalOpen(false)
    navigate('/')
  }

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // Add to favorite functionality
  const favoriteUrl = 'https://unsplash-backend-v1.onrender.com/photos'

  const addFavorite = async (photo) => {
    const {
      id,
      urls: { regular },
      alt_description,
    } = photo
    const response = await fetch(favoriteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        externalId: id,
        imageUrl: regular,
        imgDesc: alt_description,
      }),
    })
    const data = await response.json()
  }

  // Remove from favorites functionality

  const removeFavorite = async (id) => {
    const response = await fetch(`${favoriteUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      console.log(data.msg)
    }
  }

  // Change plus button to checkmark if the image is already in favorites
  const toggleLikedImage = (id) => {
    setLikedImage((prevLikedImages) => {
      if (prevLikedImages.includes(id)) {
        return prevLikedImages.filter((itemId) => itemId !== id)
      } else {
        return [...prevLikedImages, id]
      }
    })
  }

  // fetch liked images
  const favUrl = 'https://unsplash-backend-v1.onrender.com/photos'

  const fetchLikedImages = async () => {
    const response = await fetch(favUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setFavoritedImages(data.msg)

    setLikedImage(data.msg.map((item) => item.externalId))
  }

  // handle like/dislike button click in canvas and profile components
  const handleLike = async (image) => {
    if (!token) {
      return navigateLogin()
    }

    const photoId = image.id || image.externalId

    if (likedImage.includes(photoId)) {
      await removeFavorite(photoId)
    } else {
      await addFavorite(image)
    }

    await fetchLikedImages()
  }

  return (
    <ProductProvider.Provider
      value={{
        subMenuId,
        setSubMenuId,
        isMenuOpen,
        setIsMenuOpen,
        handleSubmit,
        searchTerm,
        setSearchTerm,
        activeId,
        setActiveId,
        changeInputTo,
        fetchedImages,
        pageCounts,
        setPageCounts,
        loadedImages,
        setLoadedImages,
        handleImageLoad,
        downlaodImage,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        errorMsg,
        handleRegister,
        username,
        setUsername,
        token,
        navigateLogin,
        user,
        handleLogout,
        toggleModal,
        isModalOpen,
        addFavorite,
        likedImage,
        toggleLikedImage,
        fetchLikedImages,
        favoritedImages,
        removeFavorite,
        handleLike,
      }}
    >
      {children}
    </ProductProvider.Provider>
  )
}

export { AppProvider, ProductProvider }

export const useGlobalContext = () => {
  return useContext(ProductProvider)
}
