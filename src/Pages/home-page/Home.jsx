import './home.css';
import { Drawer, SearchBar, Card } from "component";

export const Home = () => {
  return (
    <div className="wrapper">
      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div className="drawer-app-content">
            <header className="drawer-top-bar">
              <SearchBar />
            </header>
            <main className="home-page-body">
              <div className="fixed"></div>
              <div className="card-container d-flex flex-col">
                <Card />
                <Card />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}