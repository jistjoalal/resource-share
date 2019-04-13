import React from 'react';
import { Link } from 'react-router-dom';

export default Home = _ =>
  <div>

    <h1>home page</h1>
    
    <Link to="/cc/math">
      Math
    </Link>

    <Link to="/cc/ela">
      ELA
    </Link>

  </div>
  