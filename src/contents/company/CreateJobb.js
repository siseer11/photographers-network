import React from "react";
import LoadingPage from '../../components/LoadingPage';
import {Redirect} from 'react-router-dom';
import fire from '../../config/Fire'
import {CreateJobbForm} from '../../components/CreateJobbForm';
import NavFooterWrapper from "../shared/NavFooterWrapper";

class CreateJob extends React.Component {
  state = {
    jobbTitle: "",
    jobbLocation: "",
    jobbType: 'nature',
    jobbBudget: '',
    jobbDate: '',
    jobbDescription: '',
    today: '',
  };

  /**
   * Create a date with format YYYY-MM-DD
   **/
  createValidDate = date => {
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`;
  };

  /**
   * When the component mounts, after the loading is done
   * if the user is not a company redirect him to his dashboard
   **/
  componentDidMount() {
    if (this.props.loading === false && this.props.user.type !== 'company') {
      this.props.history.replace('/dashboard');
    }
    const today = this.createValidDate(new Date());
    this.setState({
      jobbDate: today,
      today: today,
    })
  }

  /**
   * Function that deal with the custom select
   **/
  optionSelectHandler = (type) => {
    this.setState({
      jobbType: type,
    })
  };

  showCustomSelectHandler = () => {
    this.setState(
      prevState => ({
        showCustomSelect: !prevState.showCustomSelect
      }),
      () => {
        if (this.state.showCustomSelect === true) {
          window.addEventListener("click", e => {
            if (!e.target.classList.contains("custom-select")) {
              this.setState({
                showCustomSelect: false
              });
            }
          });
        }
      }
    );
  };

  /**
   * Input change handler that updates the state of the component
   **/
  changeHandler = (e) => {
    this.setState({
      [`jobb${e.target.name}`]: e.target.value
    })
  };

  /**
   * Function that check if all the inputs are completed with the right data
   * before sending the form
   **/
  inputChecker = () => {
    const {jobbTitle, jobbLocation, jobbType, jobbBudget, jobbDate} = this.state;
    if (!jobbTitle) {
      return 'Title must be not empty'
    }
    if (!jobbLocation) {
      return 'Location must be not empty'
    }
    if (!jobbType) {
      return 'Type must be completed'
    }
    if (!jobbBudget || Number(jobbBudget) <= 0) {
      return 'Budget must be completed and greater then 0';
    }
    if (!jobbDate) {
      return 'Date must be selected'
    }
    return true;
  };

  /**
   * Function called when the form is submited
   **/
  submitHandler = (e) => {
    e.preventDefault();
    const {jobbTitle, jobbLocation, jobbType, jobbBudget, jobbDate, jobbDescription} = this.state;
    const jobbId = fire.database().ref('requests').push().key;
    if (this.inputChecker() === true) {
      fire.database()
        .ref('requests')
        .child(jobbId)
        .set({
          'title': jobbTitle,
          'description': jobbDescription,
          'price': Number(jobbBudget),
          'location': jobbLocation,
          'type': jobbType,
          'date': jobbDate,
          'status': 'open',
          'payment': 'soooooon',
          'phootgrapher': 'none',
          'companyId': this.props.user.uid,
          'companyName': this.props.user.displayName,
          'jobbId': jobbId,
        })
        .then(() => {
          fire.database()
            .ref('company')
            .child(this.props.user.uid)
            .child('postedJobs')
            .child(jobbId)
            .set({
              'jobId': jobbId
            }).then(() => {
            setTimeout(() => {
              this.props.history.push('/dashboard');
            }, 1000)
          }).catch((err) => console.log(err));

        })
        .catch((err) => console.log(err))
    } else {
      console.log(this.inputChecker())
    }
  };

  render() {
    return (
      <React.Fragment>
        {
          this.props.loading === false ? (
            this.props.user.type !== 'company' ? (
              <Redirect to='/dashboard'/>
            ) : (
              <CreateJobbForm
                submitHandler={this.submitHandler}
                changeHandler={this.changeHandler}
                showCustomSelectHandler={this.showCustomSelectHandler}
                optionSelectHandler={this.optionSelectHandler}
                {...this.state}
              />
            )
          ) : (
            <LoadingPage/>
          )
        }
      </React.Fragment>
    );
  }
}

const CreateJobb = NavFooterWrapper(CreateJob);
export default CreateJobb;