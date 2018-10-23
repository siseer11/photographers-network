import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "./Avatar";
import WithModal from "../RenderProp/WithModal";
import fire from "../config/Fire";

export const ProfileCard = ({
  backgroundImg = "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340",
  children,
  photoURL: profileImg,
  type,
  hireable,
  uid,
  siggnedInUser
}) => {
  return (
    <div className="gb-card-10-wrapper">
      {type === "photographer" &&
        hireable &&
        siggnedInUser.type === "company" && (
          <HireButton
            siggnedInUser={siggnedInUser}
            uid={uid}
            photographerName={children}
          />
        )}
      <div
        className="profile-card"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="card-10-shadow-overlay" />
        <div className="card-10-content">
          <h1 className="gb-title-xx-large gb-text-white">{children}</h1>
          <h3 className="gb-title-small gb-text-white">
            {type === "photographer" ? "Photographer" : "Company"}
          </h3>
          <Avatar
            userImageUrl={profileImg}
            classes="profile-avatar gb-avatar-x-large"
          />
        </div>
      </div>
    </div>
  );
};

const HireButton = ({ uid, photographerName, siggnedInUser }) => (
  <WithModal>
    {({ showModal, closeModalListener }) => (
      <React.Fragment>
        <div className="hire-button">
          <h5>Hire me!</h5>
        </div>
        {showModal && (
          <MyAmazingForm
            photographerId={uid}
            photographerName={photographerName}
            closeModal={closeModalListener}
            showModal={showModal}
            siggnedInUser={siggnedInUser}
          />
        )}
      </React.Fragment>
    )}
  </WithModal>
);

class MyAmazingForm extends React.Component {
  state = {
    title: "Take a photo for me",
    descrition:
      "I need a photo to be taken away from my wall, is arround 2m height and 1.2m width.",
    date: "2018-10-11",
    budget: "500",
    type: "portrait"
  };

  formSubmit = e => {
    e.preventDefault();
    const { photographerId, photographerName, siggnedInUser } = this.props;
    const { title, descrition, date, budget } = this.state;
    fire
      .database()
      .ref("users")
      .child(photographerId)
      .child("notifications")
      .push(
        {
          title: title,
          descrition: descrition,
          date: date,
          budget: budget,
          companyId: siggnedInUser.uid,
          read: false
        },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("complete");
          }
        }
      );
  };

  render() {
    const { title, descrition, date, budget } = this.state;
    return (
      <div className="hire-me-form-wrapper">
        <div onClick={this.props.closeModal} className="close-it">
          X
        </div>
        <h2>WoW look is a Form!</h2>
        <form className="fake-form" onSubmit={this.formSubmit}>
          <input
            className="fake-input"
            type="text"
            onChange={this.inputChange}
            data-for="title"
            value={title}
          />
          <input
            className="fake-input"
            type="text"
            onChange={this.inputChange}
            data-for="descrition"
            value={descrition}
          />
          <input
            className="fake-input"
            type="text"
            onChange={this.inputChange}
            data-for="date"
            value={date}
          />
          <input
            className="fake-input"
            type="text"
            onChange={this.inputChange}
            data-for="budget"
            value={budget}
          />
          <input className="fake-input" type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

ProfileCard.propTypes = {
  backgroundImg: PropTypes.string,
  photoURL: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  hireable: PropTypes.bool,
  uid: PropTypes.string.isRequired
};
