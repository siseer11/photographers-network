import React from "react";
import { shallow } from "enzyme";
import { Home50hCard } from "../components/Home50hCard";
import { RoundExpandButton } from "../components/svg/RoundExpandButton";

describe("Home50hCard", () => {
  const shallowRender = props => shallow(<Home50hCard {...props} />);

  it("always render a round expand button", () => {
    const el = shallowRender();
    expect(el.find(RoundExpandButton).length).toBe(1);
  });

  describe("No props passed", () => {
    const el = shallowRender();
    it("does not render a header", () => {
      expect(el.find("h2.content-box-heading").length).toBe(0);
    });
    it("does not render a paragraph", () => {
      expect(el.find(".content-box-paragraph").length).toBe(0);
    });
  });

  describe("titleContent passed", () => {
    const headerProp = "My amazing Title";
    const el = shallowRender({ titleContent: headerProp });

    it("renders a header", () => {
      expect(el.find("h2.content-box-heading").length).toBe(1);
    });
    it("header has the speciffied value, from props", () => {
      expect(el.find("h2.content-box-heading").text()).toBe(headerProp);
    });
  });

  describe("paragraphContent passed", () => {
    const paragraphProp = "Hello there";
    const el = shallowRender({ paragraphContent: paragraphProp });

    it("renders the paragraph", () => {
      expect(el.find(".content-box-paragraph").length).toBe(1);
    });
    it("paragraph has the text value, from the props", () => {
      expect(el.find(".content-box-paragraph").text()).toBe(paragraphProp);
    });
  });
});
