import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, getByTestId } from "@testing-library/react";

import PersonCard from '../PersonCard';

describe("PersonCard", () => {
  it("should render PersonCard component", () => {
    const tree = TestRenderer.create(<PersonCard name="testPersonName" gender="male" mass={80} isWinner={true} />);
    expect(tree).toMatchSnapshot();
  });

  it("should have name displayed", () => {
    const { container } = render(
      <PersonCard name="testPersonName" gender="male" mass={80} isWinner={true} />
    );
    const element = getByTestId(container, 'person_card_name')
    expect(element).toHaveTextContent(
      "testPersonName"
    );
  });

  it("should have model displayed",() => {
    const { container } = render(
      <PersonCard name="testPersonName" gender="male" mass={80} isWinner={true} />
    );
    const element = getByTestId(container, 'person_card_gender')
    expect(element).toHaveTextContent(
      "male"
    );
  });

  it("should have crew number displayed", () => {
    const { container } = render(
      <PersonCard name="testPersonName" gender="male" mass={80} isWinner={true} />
    );
    const element = getByTestId(container, 'person_card_mass')

    expect(element).toHaveTextContent(
      "80"
    );
  });

  it("should display winner section", () => {
    const { container } = render(
      <PersonCard name="testPersonName" gender="male" mass={80} isWinner={true} />
    );
    const element = getByTestId(container, 'person_card_winner')
    expect(element).toHaveTextContent(
      "Wins!"
    );

  });
  
});