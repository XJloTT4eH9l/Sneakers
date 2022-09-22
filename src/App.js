import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      <Header />
      <section className="catalog">
        <div className="container">
          <Search placeholder='Поиск...'/>
        </div>
      </section>
    </div>
  );
}

export default App;
