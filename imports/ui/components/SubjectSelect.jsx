import React from "react";
import { Link } from "react-router-dom";
import { FaCalculator, FaBook } from "react-icons/fa";

const SUBJ_ICONS = {
  Math: <FaCalculator />,
  ELA: <FaBook />
};

const SUBJ_BGS = {
  Math: "/img/Math-bg.jpg",
  ELA: "/img/ELA-bg.jpg"
};

export default SubjectSelect = ({ subject }) => {
  const imgUrl = SUBJ_BGS[subject];
  return (
    <div className="SubjectSelect">
      <Link to={`/cc/${subject}`} className="SubjectSelect__text">
        <h1>{SUBJ_ICONS[subject]}</h1>

        <h2 className="SubjectSelect__title">{subject}</h2>
      </Link>

      <img src={imgUrl} />
    </div>
  );
};
