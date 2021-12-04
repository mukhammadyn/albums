import { useEffect, useContext } from "react"
import { AlbumsProvider } from "../../contexts/albums-context/AlbumsContext"

function AlbumsForm () {

  const { albumsInputRef, state, dispatch} = useContext(AlbumsProvider)

  const { albums, albumId, edit } = state

  useEffect(() => {

    const currentAlbum = albums.findIndex(album => album.id === ~~albumId)

    if (albums[currentAlbum]) {
      albumsInputRef.current.value = albums[currentAlbum].title
    }

  }, [albums, albumId, albumsInputRef])  

  function albumsFormSubmit (evt) {

    evt.preventDefault()

    const currentAlbum = albums.findIndex(album => album.id === ~~albumId)

    if (edit === 'Edit' && albumsInputRef.current.value && albumsInputRef.current.value !== albums[currentAlbum].title) {
      const albumItem = albums.splice(currentAlbum, 1)

      albumItem.title = albumsInputRef.current.value
      albumsInputRef.current.value = ''

      fetch(`${process.env.REACT_APP_PLACEHOLDER_API}/posts/${albumId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: albumItem.id,
          title: albumItem.title,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(resp => resp.json())
      .then(data => {
        
        return dispatch({
          albums,
          type: 'album put',
          data: data,
          currentAlbum
        })

      })
      .catch((err) => console.log(err.message))
    } else if (edit === 'Add' && albumsInputRef.current.value) {
      const albumTitle = albumsInputRef.current.value
      albumsInputRef.current.value = ''

      fetch(`${process.env.REACT_APP_PLACEHOLDER_API}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title: albumTitle,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(resp => resp.json())
      .then(data => dispatch({
        type: 'Add album',
        albums,
        data
      }))
      
    }

  }

  return (
    <>

      <form className="albums-form" onSubmit={albumsFormSubmit} action="https://echo.htmlacademy.ru" method="post">

        <h3 className="albums-form__heading">{edit} album - #{albumId || albums.length}</h3>
        <input className="albums-form__input" ref={albumsInputRef} type="text" name="album_name" placeholder="hello:)" />
        <button className="albums-form__button" type="submit">{edit}</button>

      </form>

    </>
  )

}

export default AlbumsForm
