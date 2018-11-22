import React from "react";
import { switchHireable } from "../../../redux/actions/photographer-actions";
import { connect } from "react-redux";

class HireableSwitch extends React.Component {
  state = {
    loading: false,
    error: false
  };

  switchHireableStatus = () => {
    const { hireable, uid, switchHireable } = this.props;
    this.setState({ loading: true });

    //Call the action that lives in user-actions, wait for the promise
    switchHireable(!hireable, uid)
      .then(() => {
        this.setState({
          loading: false,
          error: false
        });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: true
        })
      );
  };

  render() {
    const { hireable } = this.props;
    const { loading, error } = this.state;

    return (
      <div className="hireable-option-changer">
        <label>
          You are {!hireable && "not"} hireable!
          <input
            onChange={this.switchHireableStatus}
            type="checkbox"
            checked={hireable}
            disabled={loading}
          />
          <Slider on={hireable} waiting={loading} />
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const firebaseData = state.firebase;
  return {
    hireable: firebaseData.profile.hireable,
    uid: firebaseData.auth.uid
  };
};

const mapDispatchToProps = dispatch => ({
  switchHireable: (to, uid) => dispatch(switchHireable(to, uid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HireableSwitch);

const Slider = ({ on, waiting }) => (
  <div style={{ opacity: waiting ? 0.5 : 1 }} className="mySlider-track">
    <div className={`mySlider-tumb ${on ? "on" : ""}`} />
  </div>
);
