import DataContext from "./DataContext";
import PropTypes from "prop-types";
import data from "../utils/data.json";
import { useState } from "react";
function DataProvider({ children }) {
  const [allJobs, setAllJobs] = useState([]);

  // fetching job data:
  async function fetchAllJobs() {
    setAllJobs(data);
  }

  const searchJobByTitleOrName = (val, bythis) => {
    const newJobs = [];

    for (let i = 0; i < data.length; i++) {
      if (
        bythis === "title" &&
        data[i].title.toLowerCase().includes(val.toLowerCase())
      ) {
        newJobs.push(data[i]);
      } else if (
        bythis === "location" &&
        data[i].location.toLowerCase().includes(val.toLowerCase())
      ) {
        newJobs.push(data[i]);
      }
    }
    setAllJobs(newJobs);
  };

  return (
    <DataContext.Provider
      value={{ data, fetchAllJobs, allJobs, searchJobByTitleOrName }}>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.object,
};

export default DataProvider;
