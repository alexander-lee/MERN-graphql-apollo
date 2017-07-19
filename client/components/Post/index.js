import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  votes: PropTypes.number,
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func
}

function Post({ title, author, votes, upvotePost, downvotePost }) {
  return (
    <div>
      <h1>{title}</h1>
      <label>{author}</label>
      <div>
        <label>{votes}</label>
        <button onClick={upvotePost}>+</button>
        <button onClick={downvotePost}>-</button>
      </div>
    </div>
  );
}

Post.propTypes = propTypes;
export default Post;
