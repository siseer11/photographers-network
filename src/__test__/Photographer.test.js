import React from "react";
import { shallow } from "enzyme";

import PhotographerList from '../contents/company/dashboard/PhotographerList';

describe("Photographer tests", () => {
  const photographerList = shallow(<PhotographerList photographers={[]}/>);
  describe("Photographer renders correctly with all props", () => {
    let mockProps = {
      profileImageUrl: 'img.jpg',
      firstName: 'Max',
      lastName: 'Mustermann',
      locations: {
        "123azE": {
          city: "S",
          country: "Z",
          streetName: "A",
          streetNumber: "83"
        }
      },
      description: 'Hi, my name is Max.',
      uid: '-askdflaskdf'
    }
  });
});
