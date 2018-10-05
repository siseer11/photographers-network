import React from 'react';

export default class WithModal extends React.Component {
 state ={
  showModal : false,
 }

 modalHandler = (e) => {
  console.log(this.props.closeItemClass)
  let lastState = this.state.showModal;
  if(lastState==false){
   this.setState({
    showModal : true
   })
  }else if(e.target.classList.contains(this.props.closeItemClass)){
   this.setState({
    showModal : false
   })
  }
 }
 
 render(){
  return(
   <div className={this.props.className} onClick={this.modalHandler}>
    {this.props.children(this.state)}
   </div>
  )
 }

}