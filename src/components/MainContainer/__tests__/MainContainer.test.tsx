import React from "react";
import TestRenderer from 'react-test-renderer';
import { render, getByTestId } from "@testing-library/react";

import MainContainer from '../MainContainer';

describe("MainContainer", () => {
  it("should render MainContainer component", () => {
    const tree = TestRenderer.create(<MainContainer />);

    expect(tree).toMatchSnapshot();
  });

  it("should render forces selector ", () => {
    const { container } = render(
      <MainContainer />
    );
    const element = getByTestId(container, 'forces_selector')
    expect(element).toBeTruthy()

  });

  it("should render ships button ", () => {
    const { container } = render(
      <MainContainer />
    );
    const element = getByTestId(container, 'Ships_button')
    expect(element).toBeTruthy()

  });
  it("should render people button ", () => {
    const { container } = render(
      <MainContainer />
    );
    const element = getByTestId(container, 'People_button')
    expect(element).toBeTruthy()
  });
});