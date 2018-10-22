import React from "react";
import { PropTypes } from "prop-types";
import WithModal from "../../RenderProp/WithModal";
import fire from "../../config/Fire";

export default class NoPremiumUser extends React.Component {
  state = {
    buttonStatus: "Become Premium"
  };
  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUserInfo: PropTypes.func.isRequired
  };

  makeUserPremium = () => {
    if (this.state.buttonStatus !== "Become Premium") {
      return;
    }
    this.setState(() => ({
      buttonStatus: "Loading..."
    }));
    fire
      .database()
      .ref("users")
      .child(this.props.user.uid)
      .update(
        {
          premium: true
        },
        err => {
          if (err) {
            this.setState(() => ({
              buttonStatus: "Error"
            }));
          } else {
            this.setState(() => ({
              buttonStatus: "Done!"
            }));
            this.props.updateUserInfo({ premium: true });
          }
        }
      );
  };

  render() {
    const { buttonStatus } = this.state;
    return (
      <React.Fragment>
        <p>For a portofolio you have to be premium...</p>
        <WithModal closeItemClass="close-modal">
          {({ showModal }) => (
            <React.Fragment>
              <h2>Become premium</h2>
              <div
                style={{ display: showModal ? "flex" : "none" }}
                className="modal-become-premium close-modal"
              >
                <div className="modal-inner-box">
                  <h2>
                    If you become premium it will be awsome trust me, you will
                    not regret it!..
                  </h2>
                  <div
                    onClick={this.makeUserPremium}
                    className={`become-premium-button ${
                      buttonStatus == "Done!" ? "close-modal" : ""
                    }`}
                  >
                    {buttonStatus}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </WithModal>
      </React.Fragment>
    );
  }
}
