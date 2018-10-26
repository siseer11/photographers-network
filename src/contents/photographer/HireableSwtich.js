import React from "react";
import fire from "../../config/Fire";

export default class HireableSwitch extends React.Component {
  state = {
    hireable: this.props.user ? this.props.user.hireable : false,
    waiting: false
  };

  inputChanged = e => {
    this.setState(
      {
        waiting: true
      },
      () => this.updateHirable(!this.state.hireable)
    );
  };

  updateHirable = to => {
    fire
      .database()
      .ref("users")
      .child(this.props.user.uid)
      .update(
        {
          hireable: to
        },
        err => {
          if (err) {
            console.log(err);
            this.setState({
              waiting: false
            });
          } else {
            console.log("done");
            this.props.updateUserInfo({
              hireable: to
            });
            this.setState(prevState => ({
              waiting: false,
              hireable: !prevState.hireable
            }));
          }
        }
      );
  };

  render() {
    const { hireable, waiting } = this.state;
    return (
      <div className="hireable-option-changer">
        <label>
          You are {!hireable && "not"} hireable!
          <input
            onChange={this.inputChanged}
            type="checkbox"
            checked={hireable}
            disabled={waiting}
          />
          <Slider on={hireable} waiting={waiting} />
        </label>
      </div>
    );
  }
}

const Slider = ({ on, waiting }) => (
  <div style={{ opacity: waiting ? 0.5 : 1 }} className="mySlider-track">
    <div className={`mySlider-tumb ${on ? "on" : ""}`} />
  </div>
);
