import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Post from 'components/Post';
import { PostList } from '../';

chai.use(chaiEnzyme());

describe('<PostList />', () => {
  context('when given a list of posts via the data prop', () => {
    it('correctly renders a list of <Post />s', () => {
      const data = {
        posts: [
          {
            id: '1',
            title: 'Post 1',
            author: { username: 'liquidfired' },
            votes: 1,
          },
          {
            id: '2',
            title: 'Post 2',
            author: { username: 'liquidfired' },
            votes: 1,
          },
          {
            id: '3',
            title: 'Post 3',
            author: { username: 'liquidfired' },
            votes: 1,
          },
        ],
      };
      const postList = shallow(<PostList data={data} />);
      const posts = postList.find(Post);

      expect(posts.length).to.equal(3);

      posts.forEach((post, index) => {
        const postFromData = data.posts[index];
        expect(post).to.have.props({
          title: postFromData.title,
          author: postFromData.author.username,
          votes: postFromData.votes,
        });

        expect(post.key()).to.equal(postFromData.id);
      });
    });
  });
});
