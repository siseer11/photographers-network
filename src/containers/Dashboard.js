// dependencies
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import fire from '../config/Fire';

// components
import {DashboardViewWithNav} from "../components/dashboardComponents/DashboardView";
import {MyJobsPhotographerList} from "../components/dashboardComponents/gb-card-myjobs-photographer-list";
import {PhotographerPortfolioList} from "../components/dashboardComponents/gb-card-photographer-portfolio-list";
import {CompanyPortfolioList} from "../components/dashboardComponents/gb-card-company-portfolio-list";

export default class Dashboard extends Component {
  state = {
    photographer: {
      headerLinks: [
        {
          name: "Home",
          component: (<CompanyPortfolioList card={companyPortfolioList}/>),
          active: true
        },
        //{name: "Applied Jobs", component: (), active: false}
      ]
    },
    company: {
      headerLinks: [
        {
          name: "Home",
          component: (<PhotographerPortfolioList card={dataPortfolioList}/>),
          active: true
        },
        {
          name: "My jobs",
          component: (<MyJobsPhotographerList data={dataMyJobs}/>),
          active: false
        },
      ]
    },
  };
  database = fire.database().ref();


  /**
   * Logs out the user and redirects him to home.
   */
  logout = () => {
    fire.auth().signOut();
    this.props.history.push("/");
  };

  /**
   * Sets the clicked element to active.
   *
   * @param name
   * @param type
   */
  setComponentToShow = (name, type) => {
    const activeType = this.state[type];
    let headerLinks = [...activeType.headerLinks];
    headerLinks.forEach(link => {
      link.active = link.name === name;
    });
    this.setState({[type]: {headerLinks}});
  };

  render() {
    const {user, loading, authenticated} = this.props;
    let activeType = '';
    if (!loading && user) {
      activeType = this.state[user.type];
    } // either company or photographer

    // checks, if there is already a response of the database
    // if not, shows the loading page
    // if yes, checks, if there is actually a user (to avoid to get to the dashboard
    // by just typing dashboard into the url), if there's none, redirects to home
    return (
      <React.Fragment>
        {
          loading ? <LoadingPage/> : user ?
            <DashboardViewWithNav {...this.props} type={user.type} user={user} logoutHandler={this.logout}
                                  linkHandler={this.setComponentToShow} headerLinks={activeType.headerLinks}
                                  activeComponent={activeType.headerLinks.map((link) => {
                                    if (link.active) return (link.component);
                                  })}/> : <Redirect to='/'/>
        }
      </React.Fragment>
    );
  }
}

const companyPortfolioList = [{
  category: "Company-Event-1",
  buttonLink: "www.globuzzer.com",
  buttonValue: "following",
  buttonClass: "gb-btn gb-btn-small gb-btn-white",

  background: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340",
  follower:
    [{
      url: "http://fakeimg.pl/200/?text=img1",
      'alt': 'follower1',
    },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower2',
      },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower3',
      },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower4',
      }]

},

  {
    category: "Company-Event-2",
    buttonLink: "www.globuzzer1.com",
    buttonValue: "follow",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",
    background: "https://picsum.photos/1800/800?image=0",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img2",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img3",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img4",
          'alt': 'follower4',
        }]

  },
  {
    category: "Company-Event-3",
    buttonLink: "www.globuzzer.com",
    buttonValue: "following",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",

    background: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower4',
        }]

  },
  {
    category: "Company-Event-4",
    buttonLink: "www.globuzzer1.com",
    buttonValue: "follow",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",
    background: "https://picsum.photos/1800/800?image=0",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img2",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img3",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img4",
          'alt': 'follower4',
        }]

  },

];

const dataPortfolioList = [{
  category: "Photographer-work-1",
  buttonLink: "www.globuzzer.com",
  buttonValue: "following",
  buttonClass: "gb-btn gb-btn-small gb-btn-white",

  background: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340",
  follower:
    [{
      url: "http://fakeimg.pl/200/?text=img1",
      'alt': 'follower1',
    },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower2',
      },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower3',
      },
      {
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower4',
      }]

},

  {
    category: "Photographer-work-2",
    buttonLink: "www.globuzzer1.com",
    buttonValue: "follow",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",
    background: "https://picsum.photos/1800/800?image=0",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img2",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img3",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img4",
          'alt': 'follower4',
        }]

  },
  {
    category: "Photographer-work-3",
    buttonLink: "www.globuzzer.com",
    buttonValue: "following",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",

    background: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img1",
          'alt': 'follower4',
        }]

  },
  {
    category: "Photographer-work-4",
    buttonLink: "www.globuzzer1.com",
    buttonValue: "follow",
    buttonClass: "gb-btn gb-btn-small gb-btn-white",
    background: "https://picsum.photos/1800/800?image=0",
    follower:
      [{
        url: "http://fakeimg.pl/200/?text=img1",
        'alt': 'follower1',
      },
        {
          url: "http://fakeimg.pl/200/?text=img2",
          'alt': 'follower2',
        },
        {
          url: "http://fakeimg.pl/200/?text=img3",
          'alt': 'follower3',
        },
        {
          url: "http://fakeimg.pl/200/?text=img4",
          'alt': 'follower4',
        }]
  },
];

const dataMyJobs = [{
  heading: "Web developer",
  paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  source: "Globuzzer.com",
  date: "Apr 5, 2015",
  link: "#"
},

  {
    heading: "Web designer",
    paragraph: "Fusce ultrices nisl at augue vehicula, in pellentesque lacus ornare ",
    source: "Globuzzer2.com",
    date: "Apr 3, 2014",
    link: "#"
  },
  {
    heading: "content writer",
    paragraph: "Nunc sit amet sem rutrum, vehicula sapien sit amet, auctor felis.",
    source: "Globuzzer3.com",
    date: "Dec 3, 2015",
    link: "#"
  },
  {
    heading: "UX designer",
    paragraph: "Pellentesque vel enim nunc. Suspendisse non mattis mi ",
    source: "Globuzzer4.com",
    date: "Feb 1, 2016",
    link: "#"
  },
];