import React from 'react';
import fire from '../config/Fire';
import {Link} from 'react-router-dom';
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

const SingleJobView = ({companyId,companyName,date,description,location,status,price,title,type}) => (
 <React.Fragment>
  <h2 style={{marginBottom:50}}>Single Job Page</h2>
  <p>Job Title: {title}</p><hr/>
  <p>Job Descrition: {description}</p><hr/>
  <p>Job for the date of : {date}</p><hr/>
  <p>Job in : <Link to={`../jobs?location=${location}`}>{location}</Link></p><hr/>
  <p>Bugdget of : {price} SEK</p><hr/>
  <p>Type of job : <Link to={`../jobs?type=${type}`}>{type}</Link> </p><hr/>
  <p>Posted by: <Link to={`../profile/${companyId}`}>{companyName}</Link></p><hr/>
 </React.Fragment>
)