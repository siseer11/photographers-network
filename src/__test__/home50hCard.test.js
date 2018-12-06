import React from "react";
import { shallow } from "enzyme";
import { Home50hCard } from "../components/Home50hCard";
import { RoundExpandButton } from "../components/svg/RoundExpandButton";

describe("Home50hCard", () => {
  it("it always render a round expand button", () => {
    const el = shallow(<Home50hCard />);
    expect(el.find(RoundExpandButton).exists()).toBe(true);
  });

  it("displays a header if titleContent passed as prop, equal with it.", () => {
    const el = shallow(<Home50hCard titleContent="My amazing Title" />);
    expect(el.find("h2.content-box-heading").text()).toBe("My amazing Title");

    el.setProps({ titleContent: "My second amazing title" });
    expect(el.find("h2.content-box-heading").text()).toBe(
      "My second amazing title"
    );
  });

  it("displays a paragraph if paragraphContent passed as prop,equal with it.", () => {
    const el = shallow(<Home50hCard paragraphContent="Hello there" />);
    expect(el.find(".content-box-paragraph").text()).toBe("Hello there");
  });
});
