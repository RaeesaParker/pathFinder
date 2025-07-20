import { Route, Routes } from "react-router-dom";

import Form from "./pages/Form";
import Landing from "./pages/Landing";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/form" element={<Form />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
