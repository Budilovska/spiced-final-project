import React from "react";
import Bioeditor from "./bioeditor";
import axios from "axios";
import { render, waitForElement } from "@testing-library/react";

jest.mock("axios");

test("Add button is rendered when no bio is passed", () => {
    const { container } = render(<Hello />);
    expect(container.querySelector("div").innerHTML).toBe("Hello, World!");
});

test("Renders correctly when no prop is passed", () => {
    const { container } = render(<Hello greetee="Kitty" />);
    expect(container.querySelector("div").innerHTML).toBe("Hello, Kitty!");
});
