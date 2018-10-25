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
      <React.Fragment>
        <h2>You are {!hireable && "not"} hireable!</h2>
        <input
          onChange={this.inputChanged}
          type="checkbox"
          checked={hireable}
          disabled={waiting}
        />
      </React.Fragment>
    );
  }
}
