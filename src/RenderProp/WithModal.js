import React from "react";

/*
 For the items that must close whenever a user press somewhere on the window do not use closeItemClass as props
 For the items that must close just when a user presses on an item, suck black overlay, give that element a class and then pass via props
 the same class under closeItemClass
*/

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
    let closeItemClass = this.props.closeItemClass;

    const closeModalRemoveListener = e => {
      this.closeModal();
      window.removeEventListener("click", closeModalRemoveListener);
    };

    if (lastState == false) {
      this.showModal();
      if (!closeItemClass) {
        //if the item is closing whenever a user press somewhere on teh window
        window.setTimeout(
          () => window.addEventListener("click", closeModalRemoveListener),
          0
        );
      }
    } else if (closeItemClass && e.target.classList.contains(closeItemClass)) {
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
