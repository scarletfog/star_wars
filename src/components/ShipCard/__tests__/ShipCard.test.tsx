import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, getByTestId } from "@testing-library/react";

import ShipCard from '../ShipCard';

describe("ShipCard", () => {
  it("should render ShipCard component", async () => {
    const tree = TestRenderer.create(<ShipCard name="testShipName" model="testShipModel" crew={34} isWinner={false} />);
    expect(tree).toMatchSnapshot();
  });

  it("should have name displayed", async () => {
    const { container } = render(
      <ShipCard name="testShipName" model="testShipModel" crew={34} isWinner={false} />
    );
    const element = getByTestId(container, 'ship_card_name')
    expect(element).toHaveTextContent(
      "testShipName"
    );
  });

  it("should have model displayed", async () => {
    const { container } = render(
      <ShipCard name="testShipName" model="testShipModel" crew={34} isWinner={false} />
    );
    const element = getByTestId(container, 'ship_card_model')
    expect(element).toHaveTextContent(
      "testShipModel"
    );
  });

  it("should have crew number displayed", async () => {
    const { container } = render(
      <ShipCard name="testShipName" model="testShipModel" crew={34} isWinner={false} />
    );
    const element = getByTestId(container, 'ship_card_crew')

    expect(element).toHaveTextContent(
      "34"
    );
  });

  it("should display winner section", async () => {
    const { container } = render(
      <ShipCard name="testShipName" model="testShipModel" crew={34} isWinner={true} />
    );
    const element = getByTestId(container, 'ship_card_winner')
    expect(element).toHaveTextContent(
      "Wins!"
    );

  });
  
});