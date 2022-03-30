import './home.css';
import { Drawer, SearchBar, Card } from "component/index";

export const Home = () => {
  return (
    <div className="wrapper">
      <div className="container d-flex">
        <Drawer />
        <div className="d-flex justify-center center-body">
          <div class="drawer-app-content">
            <header class="drawer-top-bar">
              <SearchBar />
            </header>
            <main class="home-page-body">
              <div class="fixed"></div>
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