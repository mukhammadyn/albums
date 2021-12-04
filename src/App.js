import Albums from "./components/albums/Albums";
import AlbumsContext from "./contexts/albums-context/AlbumsContext";

function App() {
  return (
    <main className="site-main">

      <AlbumsContext> 
        <Albums />
      </AlbumsContext>
      
    </main>
  );
}

export default App;
