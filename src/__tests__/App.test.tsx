import * as React from 'react';
import TestRenderer from 'react-test-renderer';

import App from '../App';

jest.mock("../components/MainContainer/MainContainer", () => () => (
    <div>MainContainer</div>
  )
);

describe("App", () => {
  it("should render App component", () => {
    const tree = TestRenderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });
});