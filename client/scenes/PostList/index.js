import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import Post from '../../components/Post';

import postListQuery from './postListQuery.graphql';
import votePostMutation from './votePostMutation.graphql';

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

  votePost = (id, upvote) => {
    const { data, voteMutation } = this.props;
    const post = data.posts.find(value => value.id === id);

    voteMutation({
      variables: { id, upvote },
      optimisticResponse: {
        votePost: {
          ...post,
          votes: post.votes + (upvote ? 1 : -1)
        }
      },
      update: (store, dataProxy) => {
        const updatedPost = dataProxy.data.votePost;
        const data = store.readQuery({ query: postListQuery });

        data.posts = data.posts.map(post => {
          if(post.id === updatedPost.id) {
            return {...post, ...updatedPost};
          }

          return post;
        });

        store.writeQuery({ query: postListQuery, data })
      }
    });
  }

  render() {
    const { data } = this.props;
    const { posts, loading, error } = data;

    if(loading) {
      return <div>Loading...</div>
    }

    if(error) {
      return <div>{error.message}</div>
    }

    return (
      <div>
        {posts.map(post => (
          <Post
            key={post.id}
            title={post.title}
            author={post.author.username}
            votes={post.votes}
            upvotePost={() => this.votePost(post.id, true)}
            downvotePost={() => this.votePost(post.id, false)}
          />
        ))}
      </div>
    );
  }
}

export default compose(
  graphql(postListQuery),
  graphql(votePostMutation, { name: 'voteMutation' })
)(PostList);
