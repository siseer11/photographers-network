import React from "react";
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
    console.log(err);
    this.setState({ error: "Something went wrong!"+err.message });
  };

  onCancel = () => {
    this.setState({ error: "Your cancelled your payment!" });
  };

  render() {
    const { paymentHandler, description } = this.props;
    let total = 1; //this.state.total;
    return (
      <React.Fragment>
        {description}
        <PaypalButton
          client={CLIENT}
          env={ENV}
          commit={true}
          currency={"EUR"}
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
