import backgroundImg from "../assets/images/backgroundImg.png";
import searchInput from "../assets/icons/searchInput.svg";
import { useContext, useState } from "react";
import DataContext from "../context/DataContext";
function Header() {
  const [title, setTitle] = useState("");

  const { searchJobByTitleOrName } = useContext(DataContext);

  return (
    <header
      className={`mx-[4%] sm:mx-[6%] min-[800px]:mx-[8%] hero-section h-[138px] justify-center items-center flex relative `}>
      <img
        src={backgroundImg}
        className="absolute rounded-md inset-0 z-0 h-[138px] shrink-0 w-full object-cover"
        alt="hero-img"
      />
      <div className="z-50 rounded-[4px] flex-shrink-0 h-[55px] flex md:w-[630px] lg:w-[790px] w-[80%] mt-[42px] bg-[#F6F7FB] mb-[41px]">
        <span className="icon flex bg-white items-center rounded-md pl-4 pr-1">
          <img
            src={searchInput}
            className="w-[18px] h-[18px] shrink-0"
            alt=""
          />
        </span>
        <input
          type="text"
          className="w-full focus:outline-none px-3"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Title,companines,expertise or benefits"
        />
        <button
          onClick={() => {
            searchJobByTitleOrName(title, "title");
          }}
          className="h-[47px] w-[80px] min-[500px]:w-[100px] font-medium text-white sm:w-[115px] md:w-[130px] lg:w-[146px] mt-1 mr-1 rounded-[4px] bg-[#1E86FF] shrink-0">
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;
