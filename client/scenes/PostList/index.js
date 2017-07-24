import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';

import Post from '../../components/Post';

import PostListQuery from './PostListQuery.graphql';
import VotePostMutation from './VotePostMutation.graphql';

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
    }),
    voteMutation: PropTypes.func
  }

  votePost = (id, upvote) => {
    const { data, voteMutation } = this.props;
    const post = data.posts.find((value) => value.id === id);

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
        const storeData = store.readQuery({ query: PostListQuery });

        storeData.posts = storeData.posts.map((storePost) => {
          if (storePost.id === updatedPost.id) {
            return { ...storePost, ...updatedPost };
          }

          return storePost;
        });

        store.writeQuery({ query: PostListQuery, storeData });
      }
    });
  }

  render() {
    const { data } = this.props;
    const { posts, loading, error } = data;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <div>
        {posts.map((post) => (
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
  graphql(PostListQuery),
  graphql(VotePostMutation, { name: 'voteMutation' })
)(PostList);
