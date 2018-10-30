import React from "react";
import { Link } from "react-router-dom";
import PaypalButton from "../../shared/PayPalButton";
import { Button } from "../../../components/Button";
import CLIENT from "../../../paypal/Client";

const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

class DownPayment extends React.Component {
  state = {
    total: this.props.price,
    error: "",
    success: false
  };

  onError = err => {
    this.setState({ error: "Something went wrong!"+err.message });
  };

  onCancel = () => {
    this.setState({ error: "Your cancelled your payment!" });
  };

  render() {
    const { paymentHandler, acceptedApplicant } = this.props;
    let total = 1; //this.state.total;
    //TODO: implement calculation for the payment (see trello task) and show calculation for user
    return (
      <React.Fragment>
        <h3>Make down payment</h3>
        <p>
          Please make your down payment simply by pressing the PayPal button in
          order to accept{" "}
          <Link to={`/profile/${acceptedApplicant.uid}`}>
            {acceptedApplicant.displayName}
          </Link>{" "}
          as your photographer for your job request.
        </p>
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={"SEK"}
          total={total}
          onSuccess={paymentHandler}
          onError={this.onError}
          onCancel={this.onCancel}
        />
        {this.state.error !== "" && (
          <p className="error-message">{this.state.error}</p>
        )}
        {this.state.success && <Button classes="">Proceed</Button>}
      </React.Fragment>
    );
  }
}

export default DownPayment;
