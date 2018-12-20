import React from "react";
import { GbNavBar } from "../components/nav-footer/gbNav";
import { shallow } from "enzyme";

describe("gbNav tests", () => {
  it("is working", () => {
    const z = shallow(<GbNavBar />);
    console.log(z.debug());
    expect(true).toBe(true);
  });
});
