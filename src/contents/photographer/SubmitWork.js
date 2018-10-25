// dependencies
import React, {Component} from 'react';
import fire from "../../config/Fire";

// high order component
import NavFooterWrapper from '../shared/NavFooterWrapper';

// component
import LoadingPage from "../../components/LoadingPage";
import PhotoUpload from "../shared/PhotoUpload";
import WithModal from "../../RenderProp/WithModal";
import {Button} from "../../components/Button";

class Submitwork extends Component {
  state = {
    images: [],
    jobId: null,
    loading: true
  };
  database = fire.database();
  storage = fire.storage();

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.jobid)
      this.setState({
        jobId: nextProps.match.params.jobid,
        loading: nextProps.loading
      });
  }

  showPhotos = (images) => {
    this.setState({images: images});
  };

  removeImage = id => {
    this.removeFromDatabaseAndStorage(id);
  };

  async removeFromDatabaseAndStorage (id) {
    const {jobId} = this.state;
    const {user} = this.props;
    try {
      await this.database.ref(`photographer/${user.uid}/applied-jobs/${jobId}/submitted-work/`).child(id).remove();
      await this.storage.ref(`${user.uid}/submitted-works/${jobId}`).child(id).delete();
      const index = this.state.images.findIndex(image => image.id === id);
      this.setState(prevState => ({images: prevState.images.splice(index, 1)}));
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const {jobId, images} = this.state;
    const {user} = this.props;
    return (
      this.state.loading === false ? (
        <div className="section-content with-padding">
          Submit your work here!
          <WithModal className="portofolio-add">
            {({showModal, closeModalListener}) => (
              <PhotoUpload databaseRef={`photographer/${user.uid}/applied-jobs/${jobId}/submitted-work`}
                           storageRef={`${user.uid}/submitted-works/${jobId}`}
                           closeModalListener={closeModalListener}
                           showModal={showModal}
                           callBackFunction={this.showPhotos}
                           descriptionField={false}
              />
            )}
          </WithModal>

          <div className="image-container">
            {
              images.map((img, key) =>
                <div className="single-image-container">
                  <img src={img.url} key={img.id}/>
                  <div className="img-hover" onClick={this.removeImage(img.id)}>REMOVE</div>
                </div>
              )
            }
            {
              images.length > 0 &&
              <Button classes="gb-btn gb-btn-medium gb-btn-primary">Submit to company</Button>
            }
          </div>
        </div>
      ) : (
        <LoadingPage/>
      )
    );
  }
}

const SubmitWork = NavFooterWrapper(Submitwork);
export default SubmitWork;