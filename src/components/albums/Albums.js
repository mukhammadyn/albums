import AlbumsForm from "../albums-form/AlbumsForm"
import AlbumsList from "../albums-list/AlbumsList"

function Albums () {

  return (
    <>

      <section className="albums container">

        <h2 className="albums__heading">Albums</h2>

        <div className="albums__inner">

          <AlbumsList />
          
          <AlbumsForm />

        </div>
        
      </section>

    
    </>
  )

}

export default Albums
