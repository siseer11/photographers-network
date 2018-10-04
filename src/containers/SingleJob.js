import React from 'react';
import fire from '../config/Fire';
import {SingleJobView} from '../components/SingleJobView';
import LoadingPage from '../components/LoadingPage';

export default class SingleJob extends React.Component {
 state = {
  jobDescription : null,
  loadingData : true,
 }
 componentDidMount(){
  const jobId = this.props.match.params.jobid;
  fire.database()
  .ref('requests')
  .child(jobId)
  .once('value',(snap)=>{
   this.setState({
    jobDescription : snap.val(),
    loadingData : false,
   })
  })
  .catch(err=>console.log(err))
  
 }
 render(){
  return(
   <div 
   className='single-job-page'
   style={{padding: 15}}
   >
    {
     this.state.loadingData?(
      <LoadingPage/>
     ):(
      <SingleJobView {...this.state.jobDescription}/>
     )
    }
    
   </div>
  )
 }
}
