import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import LoadingWrapper from 'components/LoadingWrapper';
import PostQuery from './PostQuery.graphql';

const propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
      }),
      votes: PropTypes.number,
    })),
  }),
};

function PostInformation({ data }) {
  const { post = {}, loading, error } = data;

  return (
    <LoadingWrapper
      loading={loading}
      error={error}
    >
      <div>
        {post.title}
      </div>
    </LoadingWrapper>
  );
}

PostInformation.propTypes = propTypes;

export default graphql(PostQuery, {
  options: (props) => ({
    variables: { id: props.params.id },
  }),
})(PostInformation);
