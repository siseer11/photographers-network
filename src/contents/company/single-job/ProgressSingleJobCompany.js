import React from "react";
import {ProgressSingleJobViewCompany} from "../../../components/single-job/progress/ProgressSingleJobViewCompany";
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import {connect} from "react-redux";
import {addNewNotification} from "../../../redux/actions/notifications-action";
import {acceptWork} from "../../../redux/actions/single-job-action-company";

const mapDispatchToProps = dispatch => ({
  addNotification: (notification, uid) => dispatch(addNewNotification(notification, uid)),
  acceptSubmittedWork: (jobId, acceptedApplicant) => dispatch(acceptWork(jobId, acceptedApplicant))
});

class ProgressSingleJobCompany extends React.Component {
  /**
   * Downloads zip file of submitted work.
   */
  downloadWork = () => {
    const {submittedWork} = this.props;
    let filesToDownload = [];
    //
    submittedWork.forEach(file => {
      // pushes Promise for download data to array
      filesToDownload.push(this.downloadURLAsAPromise(file.url));
      console.log(filesToDownload);
    });
    Promise.all(filesToDownload).then(values => {
      // create new zip file
      let zip = new JSZip();
      // add every value to the zip
      for(let i = 0; i < values.length; i++)
        zip.file(`submitted-work/${submittedWork[i].id}.jpg`, values[i]);

      zip.generateAsync({type: "blob"}).then(content => {
        // provides zip file for download
        FileSaver.saveAs(content, "download.zip");
      });
    });
  };

  /**
   * Creates Promise with the download data for current url.
   *
   * @param url
   * @returns {Promise}
   */
  downloadURLAsAPromise = url => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "blob";
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error("Ajax error for " + url + ": " + xhr.status));
          }
        }
      };
      xhr.send();
    });
  };

  acceptWork = () => {
    const {jobDescription, jobId, acceptedApplicant} = this.props;
    this.props.acceptSubmittedWork(jobId, acceptedApplicant);
    // add notification
    this.props.addNotification({
      title: `${
        jobDescription.companyName
        } has accepted your submitted work for ${jobDescription.title}.`,
      link: `/progress-job/${jobId}`,
      read: false,
      time: new Date().getTime()
    }, acceptedApplicant.uid);
  };

  render() {
    const {
      acceptedApplicant,
      submittedWork,
      acceptedWork
    } = this.props;

    return (
      <ProgressSingleJobViewCompany acceptedApplicant={acceptedApplicant}
                                    submittedWork={submittedWork}
                                    acceptedWork={acceptedWork}
                                    acceptWorkHandler={this.acceptWork}
                                    downloadHandler={this.downloadWork}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(ProgressSingleJobCompany);
