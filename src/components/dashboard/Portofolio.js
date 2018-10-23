import React from "react";
import { PropTypes } from "prop-types";
import { PortofolioGallery } from "../PortofolioGallery";
import WithModal from "../../RenderProp/WithModal";
import UploadPhotoToPortofolio from "../../contents/UploadPhotoToPortofolio";

export default class Portofolio extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    updateUserInfo: PropTypes.func.isRequired
  };
  render() {
    const { user, updateUserInfo } = this.props;
    return (
      <React.Fragment>
        {user.portofolio.length > 0 ? (
          <h2>Portofolio.</h2>
        ) : (
          <h2>You have no photos, add your first one in here.</h2>
        )}

        <WithModal className="portofolio-add">
          {({ showModal, closeModalListener }) => (
            <UploadPhotoToPortofolio
              closeModalListener={closeModalListener}
              ref={element => (this.uploadPhotoRef = element)}
              inputChangeHandler={this.inputChangeHandler}
              user={this.props.user}
              updateUserInfo={updateUserInfo}
              showModal={showModal}
            />
          )}
        </WithModal>
        {user.portofolio.length > 0 && (
          <PortofolioGallery photosList={user.portofolio} />
        )}
      </React.Fragment>
    );
  }
}
