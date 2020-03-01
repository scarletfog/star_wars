import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, getByTestId } from "@testing-library/react";

import LoadingSpinner from '../LoadingSpinner';

describe("LoadingSpinner", () => {
  it("should render LoadingSpinner component", () => {
    const tree = TestRenderer.create(<LoadingSpinner />);
    expect(tree).toMatchSnapshot();
  });

  it("should render an overlay div", () => {
    const { container } = render(
      <LoadingSpinner />
    );
    const element = getByTestId(container, 'spinner_overlay')
    expect(element).toBeTruthy()
  });

  it("should render the spinner", () => {
    const { container } = render(
      <LoadingSpinner />
    );
    const element = getByTestId(container, 'spinner')
    expect(element).toBeTruthy()
  });

});