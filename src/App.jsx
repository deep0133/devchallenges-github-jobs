import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import dataContext from "./context/DataContext";
import { Routes, Route } from "react-router-dom";

function App() {
  const { fetchAllJobs } = useContext(dataContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchAllJobs();
  }, []);

  return (
    <section className="bg-[#F6F7FB] min-h-[100lvh]">
      <Navbar />

      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </section>
  );
}

export default App;
