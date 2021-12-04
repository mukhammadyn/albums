import { createContext, useReducer, useRef } from "react"
import AlbumsReducer from "../../reducer/AlbumsReducer"

export const AlbumsProvider = createContext()

function AlbumsContext ({children}) {


  const initialState = {
    albums: [],
    albumId: '',
    albumTitle: '',
    edit: 'Add'
  }

  const [state, dispatch] = useReducer(AlbumsReducer, initialState)

  const albumsInputRef = useRef()

  return (
    <AlbumsProvider.Provider value={

      {
        state, dispatch,

        albumsInputRef
      }

    }>
    
      {children}
    
    </AlbumsProvider.Provider>
  )

}


export default AlbumsContext
