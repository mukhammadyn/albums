function AlbumsReducer (state, content) {
  
  switch(content.type) {


    case 'Album clicked': {

      return {
        ...state,
        albumId: content.value,
        edit: 'Add' ? 'Edit' : 'Add'
      }

    }
      

    case 'fetchAlbum': {

      return {
        ...state,
        albums: content.value
      }

    }
      
    
    case 'add button': {

      return {
        ...state,
        edit: 'Add'
      }

    }

    case 'album put': {

      const {data, currentAlbum, albums} = content
      

      return {

        albums: [
          ...albums.slice(0, currentAlbum),
          data,
          ...albums.slice(currentAlbum + 1)
        ]

      }

    }


    case 'Add album': {

      const {data, albums} = content
      

      return {

        albums: [
          data,
          ...albums
        ]

      }

    }
      
    default: return state
  }


}

export default AlbumsReducer
