import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import worldIcon from "../assets/icons/world.svg";
import clockIcon from "../assets/icons/clock.svg";
import backgroundImg from "../assets/images/backgroundImg.png";
import Pagination from "../components/Pagination";
import DataContext from "../context/DataContext";

function Card({ card }) {
  const navigate = useNavigate();
  return (
    card && (
      <div
        className="card flex p-3 bg-white w-full rounded-md hover:cursor-pointer"
        onClick={() => {
          navigate(`/detail/${card.unique}`);
        }}>
        <img
          src={backgroundImg}
          className="w-[6rem] object-cover mr-5 h-[6rem] flex-shrink-0 rounded-sm"
          alt="job-company-image"
        />
        <div className="details text-[#334680] w-full">
          <h1 className="company-name font-bold font-roboto">
            {card.companyName}
          </h1>
          <h3 className="job-title font-normal whitespace-pre-wrap mb-1 text-lg lg:text-xl truncate ">
            {card.title}
          </h3>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <h4 className="employment shrink-0 font-bold font-roboto border-2 w-fit border-[#334680] text-center rounded-md px-2">
              Full time
            </h4>
            <div className="post-detail flex space-x-5 items-center justify-between mt-2 lg:mt-0">
              <div className="state flex space-x-2 items-center text-[0.75rem] md:text-sm font-medium text-[#B9BDCF]">
                <img src={worldIcon} alt="" className="world-icon w-5 h-5" />
                <span className="sm:hidden">
                  {card.location.split(" ").at(-1)}
                </span>
                <span className="hidden sm:block">{card.location}</span>
              </div>
              <div className="time flex space-x-2 items-center text-[0.75rem] md:text-sm font-medium text-[#B9BDCF]">
                <img src={clockIcon} alt="" className="world-icon w-5 h-5" />
                <span>
                  {formatDistanceToNow(new Date(card.created), {
                    addSuffix: true,
                  })
                    .replace("about", "")
                    .trim()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default function Main({ setDetail }) {
  const { allJobs, data, searchJobByTitleOrName } = useContext(DataContext);

  const [countryList, setCountryList] = useState([]);
  const [location, setLocation] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // Show 5 cards per page
  const lastItemIndex = currentPage * itemsPerPage; // last index
  const firstItemIndex = lastItemIndex - itemsPerPage; // first index
  const paginatedCards = allJobs.slice(firstItemIndex, lastItemIndex);

  // searching by entering location of country:
  useEffect(() => {
    const newList = [];
    const uniqueObjectsById = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].location.toLowerCase().includes(location.toLowerCase())) {
        newList.push(data[i]);
      }
    }

    newList.forEach((obj) => {
      if (!uniqueObjectsById[obj.location]) {
        uniqueObjectsById[obj.location] = obj;
      }
    });

    setCountryList(Object.values(uniqueObjectsById));
  }, [location]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (location) {
      searchJobByTitleOrName(location, "location");
    }
  }, [location]);

  return (
    <>
      <Header />
      <main className="mx-[4%] sm:mx-[6%] min-[800px]:mx-[8%] grid grid-cols-1 md:grid-cols-12 gap-5 py-12">
        <div className="left col-span-full md:col-span-4">
          <div className="checkbox flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-[1.125rem] h-[1.125rem]"
              name="employment"
            />
            <label
              htmlFor="employment"
              className="flex-shrink-0 text-[#334680] font-medium">
              Full time
            </label>
          </div>
          <div className="locations">
            <h2 className="uppercase mt-5 mb-3 text-lg font-poppin font-semibold text-[#B9BDCF]">
              Location
            </h2>
            <div className="input-tag flex bg-white space-x-2 items-center px-3 text-sm font-medium text-[#B9BDCF]">
              <img src={worldIcon} alt="" className="world-icon w-5 h-5" />
              <input
                type="text"
                className="w-full py-3 px-1 focus:outline-none"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="City, state, zip code or country"
              />
            </div>

            <ul className="places space-y-3 mt-8 ml-3 max-h-[500px] overflow-auto cutomScrollBar">
              {countryList &&
                countryList.map((job, index) => {
                  return (
                    <li key={index} className="flex space-x-2">
                      <input
                        type="radio"
                        name="place"
                        onClick={() => {
                          setCountryList([job]);
                          setLocation(job.location);
                        }}
                        className="accent-[#1E86FF] w-5 h-5"
                      />
                      <label className="text-[#334680] font-medium">
                        {job.location}
                      </label>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="right md:col-span-8">
          <div className="card-container space-y-5">
            {paginatedCards.map((card, index) => {
              return <Card key={index} card={card} setDetail={setDetail} />;
            })}
          </div>
        </div>
        <div className="pagination col-span-full">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(allJobs.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </>
  );
}

Main.propTypes = {
  setDetail: PropTypes.func,
};
Card.propTypes = {
  card: PropTypes.object,
  setDetail: PropTypes.func,
};
