import React from "react";
import WithModal from "../RenderProp/WithModal";
import fire from "../config/Fire";

export const HireButton = ({ uid, photographerName, siggnedInUser }) => (
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
