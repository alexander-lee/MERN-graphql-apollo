import _ from 'lodash';

// DATA HERE FOR NOW
const authors = [
  { id: '1', firstName: 'Tom', lastName: 'Coleman' },
  { id: '2', firstName: 'Sashko', lastName: 'Stubailo' },
  { id: '3', firstName: 'Mikhail', lastName: 'Novikov' },
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
    author: (obj, { id }) => {
      return _.find(authors, { id: id })
    }
  },
  Mutation: {
    upvotePost: ({ postId }) => {
      const post = _.find(posts, { id: postId });

      if(!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }

      posts.votes += 1;
      return post;
    }
  },
  User: {
    posts: (user) => {
      return posts.filter((post) => post.userId === user.id)
    }
  },
  Post: {
    author: (post) => _.find(authors, { id: post.userId })
  }
}
