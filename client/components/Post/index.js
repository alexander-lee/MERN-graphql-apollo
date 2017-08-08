import React from 'react';
import PropTypes from 'prop-types';
import s from './styles.scss';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  votes: PropTypes.number,
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func,
};

function Post({ id, title, author, votes, upvotePost, downvotePost }) {
  return (
    <a href={`post/${id}`} className={s.post}>
      <div className={s.voteContainer}>
        <button className={s.upvote} onClick={upvotePost}>⬆</button>
        <div>{votes}</div>
        <button className={s.downvote} onClick={downvotePost}>⬇</button>
      </div>
      <div className={s.informationContainer}>
        <h1>{title}</h1>
        <span>by {author}</span>
      </div>
    </a>
  );
}

Post.propTypes = propTypes;
export default Post;
