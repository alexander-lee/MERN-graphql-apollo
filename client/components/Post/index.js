import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string
}

function Post({ title, author }) {
  return (
    <div>
      <h1>{title}</h1>
      <label>{author}</label>
    </div>
  );
}

Post.propTypes = propTypes;
export default Post;
