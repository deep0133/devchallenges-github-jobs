import backArrow from "../assets/icons/backArrow.svg";
import backgroundImg from "../assets/images/backgroundImg.png";
import worldIcon from "../assets/icons/world.svg";
import clockIcon from "../assets/icons/clock.svg";
import { Suspense, useContext, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import DataContext from "../context/DataContext";
import ReactHtmlParser from "react-html-parser";
import { useNavigate, useParams } from "react-router-dom";
function Detail() {
  const { allJobs, fetchAllJobs } = useContext(DataContext);

  const [detail, setDetail] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allJobs) {
      fetchAllJobs();
    }
  }, [fetchAllJobs, allJobs]);

  useEffect(() => {
    for (let i = 0; i < allJobs.length; i++) {
      if (allJobs[i]["unique"].toString() === id) {
        setDetail(allJobs[i]);
        return;
      }
    }
  }, [allJobs, id]);

  const goBack = () => {
    navigate("/");
  };

  return (
    <Suspense fallback={<h2 className="text-3xl text-center">Loading</h2>}>
      {" "}
      {detail && (
        <section className="detail mx-[4%] sm:mx-[6%] min-[800px]:mx-[8%] grid grid-cols-8 gap-8 pb-8">
          <div className="col-span-full md:col-span-2">
            <button
              className="back space-x-2 flex items-center"
              onClick={goBack}>
              <img src={backArrow} className="w-6 h-6 shrink-0" alt="" />{" "}
              <p className="text-[#1E86FF] font-poppin font-medium text-sm">
                Back to search
              </p>
            </button>
            <div className="apply text-[#B9BDCF] space-y-3 font-poppin text-sm mt-5">
              <h2 className="font-bold uppercase">How to apply</h2>
              <p className="text-[#334680] text-sm font-medium">
                Please visit the company{" "}
                <a
                  rel="noreferrer"
                  href={detail.companyUrl}
                  target="_blank"
                  className="text-[#1E86FF]">
                  link
                </a>{" "}
                or directly visit the job{" "}
                <a
                  rel="noreferrer"
                  href={detail.link}
                  className="text-[#1E86FF]">
                  kink
                </a>{" "}
                for more details.
              </p>
            </div>
          </div>
          <div className="col-span-full md:col-span-6 ">
            <div className="job-title flex space-x-3 text-[#334680] items-center -mt-1">
              <h1 className="font-roboto text-2xl font-bold ">
                {detail && detail.title}
              </h1>
              <h4 className="employment font-bold text-xs font-roboto border-2 border-[#334680] text-center rounded-md flex-shrink-0 w-16 h-6 pt-0.5">
                Full time
              </h4>
            </div>
            <div className="time flex space-x-2 items-center text-sm font-medium font-roboto text-[#B9BDCF]">
              <img src={clockIcon} alt="" className="world-icon w-5 h-5" />
              <span>
                {detail &&
                  detail.created &&
                  formatDistanceToNow(new Date(detail.created), {
                    addSuffix: true,
                  })
                    .replace("about", "")
                    .trim()}
              </span>
            </div>
            <div className="compony flex space-x-3 mt-8 mb-5">
              <img
                src={backgroundImg}
                alt=""
                className="w-11 h-11 object-cover shrink-0"
              />
              <div className="name">
                <h3 className="text-[#334680] -mt-1.5 font-roboto font-bold text-lg">
                  {detail.companyName}
                </h3>
                <div className="time flex mt-1 space-x-1 items-center text-sm font-medium font-roboto text-[#B9BDCF]">
                  <img src={worldIcon} alt="" className="world-icon w-5 h-5" />
                  <p className="font-medium">{detail.location}</p>
                </div>
              </div>
            </div>
            <div className="job-description text-[1rem] font-roboto text-[#334680] font-normal">
              {detail && ReactHtmlParser(detail.description)}
            </div>
          </div>
        </section>
      )}
    </Suspense>
  );
}

export default Detail;
