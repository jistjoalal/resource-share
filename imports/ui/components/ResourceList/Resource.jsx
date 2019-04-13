import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaComments,
  FaExternalLinkAlt,
  FaFilePdf,
  FaEdit,
  FaImage,
  FaFilePowerpoint,
  FaFileWord,
  FaFileUpload,
} from 'react-icons/fa';

import FavoriteButton from '../FavoriteButton';
import DeleteButton from '../DeleteButton';

const TYPE_ICONS = {
  // images
  png: <FaImage />,
  jpeg: <FaImage />,
  gif: <FaImage />,
  // microsoft office
  ppt: <FaFilePowerpoint />,
  pptx: <FaFilePowerpoint />,
  doc: <FaFileWord />,
  docx: <FaFileWord />,
  // misc
  URL: <FaExternalLinkAlt />,
  pdf: <FaFilePdf />,
  txt: <FaEdit />,
}

export default class Resource extends React.Component {
  render() {
    if (!this.props.resource) return null;

    const { resource, user } = this.props;
    return (
      <div className="Resource row p-2">

        <span className="col-1 d-flex align-items-center p-0">
          <span className="text-truncate text-secondary">
            {resource.score}
          </span>
        </span>

        <span className="col-7 d-flex align-items-center p-0"> 
          <span className="mx-2 text-secondary">
            {TYPE_ICONS[resource.type] || <FaFileUpload />}
          </span>
          <a
            className="text-truncate"
            href={resource.url}
            target="_blank"
          > 
            {resource.title}
          </a>
        </span>
        
        <Link
          className="col-2 d-flex align-items-center text-secondary text-truncate p-0"
          to={`/submissions/${resource.authorId}`}
        >
          {resource.username}
        </Link>

        <div className="col-2 d-flex align-items-center p-0">

          <FavoriteButton user={user} resource={resource} />
          
          <Link
            className="fav btn text-info p-0 mb-1"
            to={`/comments/${resource._id}`}
          >
            <FaComments />
          </Link>
          
          <DeleteButton user={user} resource={resource} />
          
        </div>
      </div>
    )
  }
}
