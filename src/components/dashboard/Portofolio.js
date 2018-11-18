import React from "react";
import { PropTypes } from "prop-types";
import { PortofolioGallery } from "../PortofolioGallery";
import WithModal from "../../RenderProp/WithModal";
import UploadPhotoToPortofolio from "../../contents/photographer/dashboard/UploadPhotoToPortofolio";

export default class Portofolio extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {user.portfolio && user.portfolio.length > 0 ? (
          <h2>Portfolio.</h2>
        ) : (
          <h2>You have no photos, add your first one in here.</h2>
        )}

        <WithModal className="portofolio-add" closeItemClass="add-image-modal">
          {({ showModal, closeModalListener }) => (
            <UploadPhotoToPortofolio
              closeModalListener={closeModalListener}
              ref={element => (this.uploadPhotoRef = element)}
              inputChangeHandler={this.inputChangeHandler}
              showModal={showModal}
            />
          )}
        </WithModal>
        {user.portfolio && user.portfolio.length > 0 && (
          <PortofolioGallery photosList={user.portfolio} />
        )}
      </React.Fragment>
    );
  }
}
