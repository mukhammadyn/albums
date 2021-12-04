import { useEffect } from "react"
import { useContext } from "react"
import { AlbumsProvider } from "../../contexts/albums-context/AlbumsContext"

function AlbumsList () {

  const { albumsInputRef, state, dispatch} = useContext(AlbumsProvider)

  const {albums, edit} = state

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PLACEHOLDER_API}/albums`)
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: 'fetchAlbum',
        value: data
      })
    })
    .catch((err) =>{
      console.log(err.message)
    })
  }, [dispatch])


  function handleAlbumClick (evt) {

    dispatch({
      type: 'Album clicked',
      value: evt.target.dataset.id
    })

  }

  function handleAddButtonClick () {

    if (edit === 'Edit') {
      albumsInputRef.current.value = ''
      dispatch({
        type: 'add button'
      })
    }

  }

  return (
    <>
    
      <div className="albums-list">

        <h3 className="albums-list__heading">Albums list</h3>
        <button onClick={handleAddButtonClick} className="albums-list__add" type="button">Add album</button>

        <ul className="albums-list__cards">

          {
            albums.map(album => 

              <li className="albums-list__item" key={album.id}>
                <button onClick={handleAlbumClick} className="albums-list__button" type="button" data-id={album.id}>{album.title}</button>
              </li>

            )
          }
          
        </ul>

      </div>

    </>
  )

}

export default AlbumsList
