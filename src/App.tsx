import { Router } from "./Router";
import { Sidebar } from "./components/Sidebar";
import './App.css';



function App() {
  return (
      <div className="App">
        <Sidebar />
        <Router />
      </div>
  );
}

export default App;
