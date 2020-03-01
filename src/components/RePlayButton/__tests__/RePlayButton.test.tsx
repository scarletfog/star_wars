import React from 'react';
import TestRenderer from 'react-test-renderer';

import RePlayButton from '../RePlayButton';

describe("RePlayButton", () => {
  it("should render RePlayButton component", async () => {
    const tree = TestRenderer.create(<RePlayButton />);
    expect(tree).toMatchSnapshot();
  });  
});