import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p className="font-bold">Home Page :)</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
