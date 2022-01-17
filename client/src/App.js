import "./App.css";
import Home from "./pages/Home";
import { Landing } from "./components";
import { UserProvider } from "./store/UserProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { ethereum } = window;
  ethereum.on("accountsChanged", (accounts) => {
    console.log(accounts);
  });

  return (
    <div className="App">
      <header className="App-header">
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<Landing />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </header>
    </div>
  );
}

export default App;
