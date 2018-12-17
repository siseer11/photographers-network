import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import makeUser from "./mockUser";
import { Link } from "react-router-dom";
import { Profile } from "../contents/shared/profile/Profile";
import { shallow } from "enzyme";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileContent } from "../contents/shared/profile/ProfileContent";
import { Avatar } from "../components/Avatar";
import { PortofolioGallery } from "../components/PortofolioGallery";
import { ReviewBox } from "../components/profile/ReviewBox";
import { PhotographerContent } from "../contents/photographer/dashboard/PhotographerContent";

describe("Profile tests", () => {
  const match = { params: { uid: "fakeid" } }; //the match prop is needed always, so it takes the uid from the link query param
  const shallowRender = props => shallow(<Profile match={match} {...props} />);

  test("Profile it is defined", () => {
    const shallowProfile = shallowRender();
    expect(shallowProfile).toBeDefined();
  });

  describe("it is showing loading correctly", () => {
    const shallowProfile = shallowRender();
    it("shows it if the profileData is not loaded", () => {
      shallowProfile.setProps({ profileData: undefined });
      expect(shallowProfile.find(".loading").length).toBe(1);
    });

    it("shows is if this person data is not loaded", () => {
      const match = { params: { uid: "fakeid" } };
      shallowProfile.setProps({
        profileData: { fakeid: undefined },
        match
      });

      expect(shallowProfile.find(".loading").length).toBe(1);
    });
  });

  it("shows 'no data found' correctly", () => {
    const shallowProfile = shallowRender();
    const match = { params: { uid: "fakeid" } };
    shallowProfile.setProps({
      profileData: { fakeid: null },
      match
    });

    expect(shallowProfile.find(".no-data").length).toBe(1);
  });

  describe("renders correctly with all the props passed", () => {
    //A mock of the props that it will take in a real case;
    let mockProps = {
      match: { params: { uid: "otherUser" } },
      profileData: {
        otherUser: {
          firstName: "z",
          lastName: "z",
          hireable: true,
          locations: {
            "123azE": {
              city: "S",
              country: "Z",
              streetName: "A",
              streetNumber: "83"
            }
          },
          premium: true,
          portfolio: [],
          profileImageUrl: "img.jpg",
          type: "photographer",
          uid: "otherUser"
        }
      },
      currentUserData: {
        firstName: "z",
        lastName: "z",
        hireable: true,
        locations: {
          "123azE": {
            city: "S",
            country: "Z",
            streetName: "A",
            streetNumber: "83"
          }
        },
        premium: true,
        portfolio: [],
        profileImageUrl: "img.jpg",
        type: "photographer",
        uid: "fakeid"
      },
      currentUserId: "fakeid",
      finishedJobs: 0
    };
    let shallowProfile = shallowRender(mockProps);

    it("renders once a ProfileCard", () => {
      expect(shallowProfile.find(ProfileCard).length).toBe(1);
    });

    it("renders once a ProfileContent", () => {
      expect(shallowProfile.find(ProfileContent).length).toBe(1);
    });

    it("pass down correct otherUser prop", () => {
      expect(
        shallowProfile.find(ProfileContent).get(0).props.otherUser
      ).toEqual(true);
    });
  });
});

describe("ProfileCard", () => {
  it("renders corectly", () => {
    const tree = renderer
      .create(
        <ProfileCard profileImageUrl={"myFakeImage.jpg"} premium={false} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Avatar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Avatar
          userImageUrl="image.jpg"
          classes="premium user-avatar"
          profileLink="user1"
          premium={true}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("does not show premium mark for users that are not premium", () => {
    const shallowAvatar = shallow(
      <Avatar
        userImageUrl="image.jpg"
        classes="premium user-avatar"
        profileLink="user1"
        premium={false}
      />
    );

    expect(shallowAvatar.find(".premium-flag").length).toEqual(0);
  });

  it("does show premium mark for premium users", () => {
    const shallowAvatar = shallow(
      <Avatar
        userImageUrl="image.jpg"
        classes="premium user-avatar"
        profileLink="user1"
        premium={true}
      />
    );

    expect(shallowAvatar.find(".premium-flag").length).toEqual(1);
  });
});

describe("ProfileContent", () => {
  let currentUserData = makeUser({ type: "photographer" });

  let currentUserId = currentUserData.uid;
  let otherUser = false;
  let finishedJobs = 0;
  let thisProfileData = makeUser({ type: "photographer", uid: "aaa" });
  const shallowRender = props =>
    shallow(
      <ProfileContent
        thisProfileData={thisProfileData}
        currentUserData={currentUserData}
        currentUserId={currentUserId}
        otherUser={otherUser}
        finishedJobs={finishedJobs}
        {...props}
      />
    );

  it("renders corectly", () => {
    const tree = renderer
      .create(
        <Router>
          <ProfileContent
            thisProfileData={thisProfileData}
            currentUserData={currentUserData}
            currentUserId={currentUserId}
            otherUser={otherUser}
            finishedJobs={finishedJobs}
          />
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe("renders correctly the profile name", () => {
    it("shows correctly for photographers", () => {
      const shallowElPhotographer = shallowRender();
      expect(shallowElPhotographer.find(".profile-name").text()).toBe(
        thisProfileData.firstName + " " + thisProfileData.lastName
      );
    });

    it("shows correctly for companies", () => {
      const companyData = {
        ...currentUserData,
        type: "company",
        companyName: "Z.co",
        firstName: null,
        lastName: null
      };
      const shallowElCompany = shallowRender({
        thisProfileData: companyData
      });
      expect(shallowElCompany.find(".profile-name").text()).toBe(
        companyData.companyName
      );
    });
  });

  describe("shows correctly the hireButton", () => {
    let currentUserData = makeUser({ type: "company" });

    it("shows it if all conditions are filled", () => {
      const photographerData = makeUser({
        type: "photographer",
        hireable: true
      });
      const shallowElement = shallowRender({
        thisProfileData: photographerData,
        currentUserData: currentUserData
      });

      expect(shallowElement.find("HireButton").length).toEqual(1);
    });

    describe("does not show it if", () => {
      it("is not a photographer profile", () => {
        const thisProfileData = makeUser({
          type: "company"
        });
        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });

      it("current user is not a company", () => {
        currentUserData = makeUser({ type: "photographer" });

        const thisProfileData = makeUser({
          type: "photographer"
        });

        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });

      it("this profile user is a photographer but has hireable=false", () => {
        thisProfileData = makeUser({ type: "photographer", hireable: false });

        const shallowElement = shallowRender({
          thisProfileData: thisProfileData,
          currentUserData: currentUserData
        });

        expect(shallowElement.find("HireButton").length).toEqual(0);
      });
    });
  });

  describe("shows correctly the edit profile button", () => {
    const shallowElement = shallowRender();

    it("does not show it, if is another user profile", () => {
      shallowElement.setProps({ otherUser: true });
      expect(shallowElement.find("#edit-profile-link").length).toEqual(0);
    });

    it("does show it, if it is your own profile", () => {
      shallowElement.setProps({ otherUser: false });
      expect(shallowElement.find("#edit-profile-link").length).toEqual(1);
    });
  });

  describe("shows correctly aditional informations for company/photographer", () => {
    it("shows correctly for photographer profile", () => {
      const thisProfileData = makeUser({ type: "photographer" });
      const shallowElement = shallowRender({
        thisProfileData: thisProfileData
      });

      expect(shallowElement.find("PhotographerContent").length).toEqual(1);
    });

    it("shows correctly for company profile", () => {
      const thisProfileData = makeUser({ type: "company" });
      const shallowElement = shallowRender({
        thisProfileData: thisProfileData
      });

      expect(shallowElement.find(".company-details").length).toEqual(1);
      expect(shallowElement.find("PhotographerContent").length).toEqual(0);
    });
  });
});

describe("PhotographerContent", () => {
  const photographerData = makeUser({ type: "photographer" });
  const siggnedInUser = makeUser({ type: "company" });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Router>
          <PhotographerContent
            photographerData={photographerData}
            siggnedInUser={siggnedInUser}
            uid={photographerData.uid}
            finishedJobs={photographerData.finishedJobs}
            hireable={photographerData.hireable}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const shallowElement = shallow(
    <PhotographerContent
      photographerData={photographerData}
      siggnedInUser={siggnedInUser}
      uid={photographerData.uid}
      finishedJobs={photographerData.finishedJobs}
      hireable={photographerData.hireable}
    />
  );

  it("renders the correct number of finishedJobs", () => {
    expect(shallowElement.find(".flex-container-space .big-num").text()).toBe(
      "0"
    );

    shallowElement.setProps({ finishedJobs: 10 });

    expect(shallowElement.find(".flex-container-space .big-num").text()).toBe(
      "10"
    );
  });

  it("renders the link to project once", () => {
    expect(
      shallowElement.containsMatchingElement(
        <Link to="/dashboard">See the projects</Link>
      )
    ).toBe(true);
  });

  describe("renders the portofolio correctly, ", () => {
    it("if the photographer have no portfolio data", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: null
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(0);
    });

    it("shows it when photographer have a portfolio", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: []
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(0);
    });

    it("shows nothing if the portfolio is empty", () => {
      const newPhotographerData = makeUser({
        type: "photographer",
        portfolio: ["img1.jpg", "img2.jpg"]
      });
      shallowElement.setProps({ photographerData: newPhotographerData });

      expect(shallowElement.find("PortofolioGallery").length).toBe(1);
    });
  });

  describe("renders the hire button correctly", () => {
    it("shows it , if photographer is hireable and the currentUser is a company", () => {
      const siggnedInUser = makeUser({ type: "company" });
      const photographer = makeUser({ type: "photographer", hireable: true });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: true
      });

      expect(shallowElement.find("HireButton").length).toBe(1);
    });

    it("does not show it , if the photographer is not hireable", () => {
      const siggnedInUser = makeUser({ type: "company" });
      const photographer = makeUser({ type: "photographer", hireable: false });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: false
      });

      expect(shallowElement.find("HireButton").length).toBe(0);
    });

    it("does not show it , if the currentUser is not a company", () => {
      const siggnedInUser = makeUser({ type: "photographer" });
      const photographer = makeUser({ type: "photographer", hireable: true });

      shallowElement.setProps({
        photographerData: photographer,
        siggnedInUser: siggnedInUser,
        hireable: true
      });

      expect(shallowElement.find("HireButton").length).toBe(0);
    });
  });

  it("always renders a ReviewBox", () => {
    expect(shallowElement.find("ReviewBox").length).toBe(1);
  });
});
