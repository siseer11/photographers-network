import React from "react";
import {connect} from "react-redux";
import {NameInputSVG} from "../../../components/svg/NameInputSVG";
import {InputField} from "../../../components/form/InputField";
import {setBankCredentials} from "../../../redux/actions/profile-action";

class CredentialsInput extends React.Component {
  state = {
    iban: '',
    bic: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setBankCredentials(this.state);
    this.props.closeHandler();
  };

  //TODO: check inputs

  render() {
    const {iban, bic} = this.state;
    return (
      <div className="modal-become-premium">
        <div className="modal-inner-box grey-input-box">
          <p>Please enter your bank credentials to proceed.</p>
          <form onSubmit={this.handleSubmit}>
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={iban}
              changeHandler={this.handleChange}
              type="text"
              name="iban"
              placeholder="Insert your IBAN here"
            />
            <InputField
              svg={
                <NameInputSVG classes="gb-icon gb-icon-medium gb-icon-white inputIcon"/>
              }
              value={bic}
              changeHandler={this.handleChange}
              type="text"
              name="bic"
              placeholder="Insert your BIC here"
            />
            <input type="submit" value="Submit" className="gb-btn gb-btn-medium gb-btn-primary"/>
          </form>
          <button onClick={this.props.closeHandler} className="gb-btn gb-btn-medium gb-btn-primary cancel-btn">Cancel</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setBankCredentials: credentials => dispatch(setBankCredentials(credentials))
});

export default connect(null, mapDispatchToProps)(CredentialsInput);