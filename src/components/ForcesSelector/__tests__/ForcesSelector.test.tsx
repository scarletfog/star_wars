import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render } from "@testing-library/react";

import ForcesSelector from '../ForcesSelector';

describe("ForcesSelector", () => {
  it("should render ForcesSelector component", () => {
    const tree = TestRenderer.create(<ForcesSelector />);
    expect(tree).toMatchSnapshot();
  });

  it("should render ship version of a component", () => {
    const { container } = render(
      <ForcesSelector forceType="ship" />
    );
    expect(container).toHaveTextContent(
      "Ships"
    );
  });

  it("should render people version of a component", () => {
    const { container } = render(
      <ForcesSelector forceType="anythingElse" />
    );
    expect(container).toHaveTextContent(
      "People"
    );
  });
  
});