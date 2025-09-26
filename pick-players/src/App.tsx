import { Routes, Route } from "react-router-dom";
import Picklist from "./Pages/Picklist";
import Pickedplayers from "./Pages/Pickedplayers";


function App() {
  return (
     <Routes>
      <Route path="/" element={<Picklist />} />
      <Route path="/PickedPlayers" element={<Pickedplayers />} />
    </Routes>
  );
}

export default App;
