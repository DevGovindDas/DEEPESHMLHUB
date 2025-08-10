import React from "react";
import PropTypes from "prop-types";

const LogoImg = ({ imgSrc }) => (
  <img
    src={imgSrc}
    alt="Logo"
    className="h-10 w-10 sm:h-20 sm:w-20 md:h-30 md:w-30 object-cover rounded-full block border border-blue-200 sm:border-2"
  />
);

LogoImg.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};

export default LogoImg;
