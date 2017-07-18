import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import Post from '../../components/Post';

import postListQuery from './postListQuery.graphql';

class PostList extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      posts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.shape({
          username: PropTypes.string
        }),
        votes: PropTypes.number
      }))
    })
  }

  render() {
    const { data } = this.props;
    const { posts = [] } = data;

    return (
      <div>
        {posts.map(post => <Post key={post.id} title={post.title} author={post.author.username} />)}
      </div>
    );
  }
}

export default graphql(postListQuery)(PostList);
