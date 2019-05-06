import React from 'react'
import { Link } from 'react-router-dom';
import { FaComments } from 'react-icons/fa'

export default CommentsButton = ({ resource }) =>
  <Link
    className="Button text-info"
    data-cy="comments"
    to={`/comments/${resource._id}`}
  >
    <FaComments />
  </Link>
