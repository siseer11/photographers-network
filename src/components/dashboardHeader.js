import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {PhotographerPortfolioList} from '../components/gb-card-photographer-portfolio-list';
import {ProfileCard} from "../components/ProfileCard";

export const DashboardHeader = ({  children }) => {
   
      const Topics = () => (
        <div>
          <h2>Topic</h2>
        </div>
      );

    return (
         
        <div>


            <Router>
                <div>
                    <div className="gb-card-10-wrapper">

                        <div className="profile-card gb-background-primary">

                            <div className="card-10-shadow-overlay" />

                            <div className="card-10-content">
                                <h1 className="gb-title-xx-large gb-text-white gb-margin-bottom-40 gb-text-align-center">{children}</h1>
                                <div className="gb-display-flex">

                                    <Link to="/dashboard"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">home</button></Link>
                                    <Link to="/about"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">about</button></Link>
                                    <Link to="/topics"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">profile</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Route path="/dashboard" render={() => <PhotographerPortfolioList
                        card={
                            [{
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

                            ]
                        } />} />

                    <Route path="/about" render={() => <ProfileCard
                        backgroundImg='https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=981026b7c3ee99d54e0811e984995340'
                        profileImg="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=6dd9dc582c677370d110940fda65b992"
                    />} />
                    <Route path="/topics" component={Topics} />
                </div>
            </Router>
        </div>
    );
};

DashboardHeader.propTypes = {
    children: PropTypes.string.isRequired 
};