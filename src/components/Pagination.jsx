import PropTypes from "prop-types";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex space-x-3 justify-end">
        {pageNumbers.map((page) => (
          <li key={page} className="page-item">
            <button
              onClick={() => onPageChange(page)}
              className={`page-link ${
                currentPage === page
                  ? "bg-[#1E86FF] text-white"
                  : "text-[#B9BDCF] hover:text-[#1E86FF] hover:border-[#1E86FF] border-[#B7BCCE]"
              } w-[2.25rem] h-[2.25rem] shrink-0 rounded-[0.25rem] text-center border  `}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default Pagination;
