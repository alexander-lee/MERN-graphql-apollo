import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import LoadingWrapper from '../';

describe('<LoadingWrapper />', () => {
  context('when the loading prop is true', () => {
    it('renders <div>Loading...</div> if no loader is specified', () => {
      const noLoader = shallow(<LoadingWrapper loading />);

      expect(noLoader.contains(<div>Loading...</div>)).to.equal(true);
    });

    it('renders a custom loader if a loader is specified', () => {
      const loader = <div>Custom Loader</div>;
      const withLoader = shallow(<LoadingWrapper loading loader={loader} />);

      expect(withLoader.contains(loader)).to.equal(true);
    });
  });

  context('when the error prop is defined', () => {
    it('renders the error\'s message', () => {
      const error = { message: 'Some Error' };
      const withError = shallow(<LoadingWrapper error={error} />);

      expect(withError.contains(<div>{error.message}</div>)).to.equal(true);
    });
  });

  context('when the loading prop is false and error prop does not exist', () => {
    const loadingWrapper = shallow(
      <LoadingWrapper>
        <div>Some data</div>
      </LoadingWrapper>
    );

    expect(loadingWrapper.contains(<div>Some data</div>)).to.equal(true);
  });
});
