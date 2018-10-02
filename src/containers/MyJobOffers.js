import React from "react";
import fire from '../config/Fire';

export default class MyJobOffers extends React.Component {
	componentDidMount(){
		console.log(this.props)
	}

	shouldComponentUpdate(nextProps , nextState){
		console.log(nextProps , this.props);
		return true;
	}


  render() {
    return (
			<React.Fragment>
				{
					!this.props.loadedResponse?(
						<h2>looooooooading</h2>
					):(
						<MyJobOffersFetch {...this.props}/>
					)

				}
			</React.Fragment>
		)
  }
}

class MyJobOffersFetch extends React.Component {

	componentDidMount(){
		console.log(this.props);
		fire.database().ref('company').child(this.props.user.uid).once('value',(snap)=>console.log(snap.val()))
	}

	render(){
		return(
			<h2>DOne</h2>
		)
	}


}