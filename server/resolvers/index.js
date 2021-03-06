import _ from 'lodash';

// DATA HERE FOR NOW
const users = [
  { id: '1', username: 'liquidfired' },
  { id: '2', username: 'frostedsolid' },
  { id: '3', username: 'peniqliotuv' },
];

const posts = [
  { id: '1', userId: '1', title: 'Introduction to GraphQL', votes: 2 },
  { id: '2', userId: '2', title: 'Welcome to Meteor', votes: 3 },
  { id: '3', userId: '2', title: 'Advanced GraphQL', votes: 1 },
  { id: '4', userId: '3', title: 'Launchpad is Cool', votes: 7 },
];

export default {
  Query: {
    posts: () => posts,
    post: (obj, { id }) => (
      _.find(posts, { id })
    ),
    user: (obj, { id }) => (
      _.find(users, { id })
    ),
  },
  Mutation: {
    votePost: (obj, { id, upvote }) => {
      const post = _.find(posts, { id });

      if (!post) {
        throw new Error(`Couldn't find post with id ${id}`);
      }

      post.votes += upvote ? 1 : -1;
      return post;
    },
  },
  User: {
    posts: (user) => (
      posts.filter((post) => post.userId === user.id)
    ),
  },
  Post: {
    author: (post) => _.find(users, { id: post.userId }),
  },
};
