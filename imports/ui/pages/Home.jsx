import React from "react";
import { Helmet } from "react-helmet";

import SubjectSelect from "../components/SubjectSelect";

export default Home = _ => (
  <div className="container border shadow">
    <Helmet>
      <title>Resource Share</title>
    </Helmet>

    <SubjectSelect subject="Math" />
  </div>
);
