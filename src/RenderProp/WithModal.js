import React from "react";

export default class WithModal extends React.Component {
  closeModal = () => {
    this.setState({ showModal: false });
  };
  showModal = () => this.setState({ showModal: true });

  state = {
    showModal: false,
    closeModalListener: this.closeModal,
    showModalListener: this.showModal
  };

  modalHandler = e => {
    let lastState = this.state.showModal;
    if (lastState == false) {
      this.showModal();
    } else if (e.target.classList.contains(this.props.closeItemClass)) {
      this.closeModal();
    }
  };

  render() {
    return (
      <div className={this.props.className} onClick={this.modalHandler}>
        {this.props.children(this.state)}
      </div>
    );
  }
}
