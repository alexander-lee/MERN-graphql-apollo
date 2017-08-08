import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import LoadingWrapper from '../';

chai.use(chaiEnzyme());

describe('<LoadingWrapper />', () => {
  context('when the loading prop is true', () => {
    it('renders <div>Loading...</div> if no loader is specified', () => {
      const noLoader = shallow(<LoadingWrapper loading />);

      expect(noLoader).to.containMatchingElement(<div>Loading...</div>);
    });

    it('renders a custom loader if a loader is specified', () => {
      const loader = <div>Custom Loader</div>;
      const withLoader = shallow(<LoadingWrapper loading loader={loader} />);

      expect(withLoader).to.contain(loader);
    });
  });

  context('when the error prop is defined', () => {
    it('renders the error\'s message', () => {
      const error = { message: 'Some Error' };
      const withError = shallow(<LoadingWrapper error={error} />);

      expect(withError).to.containMatchingElement(<div>{error.message}</div>);
    });
  });

  context('when the loading prop is false and error prop does not exist', () => {
    const loadingWrapper = shallow(
      <LoadingWrapper>
        <div>Some data</div>
      </LoadingWrapper>
    );

    expect(loadingWrapper).to.contain(<div>Some data</div>);
  });
});
