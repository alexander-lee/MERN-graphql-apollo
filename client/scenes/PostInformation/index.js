import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import PostQuery from './PostQuery.graphql';

class PostInformation extends Component {
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

  render() {
    const { data } = this.props;
    const { post, loading, error } = data;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <div>
        {post.title}
      </div>
    );
  }
}

export default graphql(PostQuery, {
  options: (props) => ({
    variables: { id: props.params.id }
  })
})(PostInformation);
