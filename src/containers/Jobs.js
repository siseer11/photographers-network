import React from 'react';
import fire from '../config/Fire';

export default class Jobs extends React.Component{
  state={
    loading : true,
    jobs : [],
  }

  componentDidMount(){
    fire.database().ref('requests')
      .once('value',(snap)=>{
        this.setState({
          jobs : Object.values(snap.val()),
          loading : false
        })
      }).then(()=>console.log(this.state.jobs))
  }

  render(){
    const {loading , jobs : jobsList} = this.state;
    return(
      <div className='jobs-page'>
        {
          loading?(
            <h2>Loading...</h2>
          ):(
            <ul>
							{
								jobsList.map((el,idx)=>(
									<li key={idx} style={{background:'rgba(0,0,0,.3)' , margin:10,padding:10}}>
										<h2>{el.title}</h2>
										<p>{el.location}</p>
										<p>{el.companyName} {el.company}</p>
										<p>{el.date}</p>
										<p>{el.description}</p>
										<p>{el.price}</p>
										<p>{el.type}</p>
									</li>
								))
							}
						</ul>
          )
        }
      </div>
    )
  }
}