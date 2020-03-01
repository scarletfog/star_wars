import React from 'react';
import TestRenderer from 'react-test-renderer';

import App from '../App';

describe("App", () => {
  it("should render App component", async () => {
    const tree = TestRenderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });
});