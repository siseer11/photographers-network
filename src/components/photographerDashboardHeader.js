import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {PhotographerPortfolioList} from '../components/gb-card-photographer-portfolio-list';
import {MyJobsPhotographerList} from '../components/gb-card-myjobs-photographer-list';


export const PhotographerDashboardHeader = ({  children }) => {
    return (  
        <div>
            <Router>
                <div>
                    <div className="gb-card-7-wrapper">
                        <div className="gb-card-7-height gb-background-primary">
                            <div className="card-7-shadow-overlay" />
                            <div className="card-7-content">
                                <h1 className="gb-title-xx-large gb-text-white gb-margin-bottom-40 gb-text-align-center">{children}</h1>
                                <div className="gb-display-flex">
                                    <Link to="/dashboard"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">home</button></Link>
                                    <Link to="/appliedJobs"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">Applied Jobs</button></Link>
                                    <Link to="/empty"><button className="gb-btn gb-btn-small gb-btn-outlined gb-margin-right-16">profile</button></Link>
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

                    <Route path="/appliedJobs" render={() => <MyJobsPhotographerList
                        data={
                            [{
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
                            ]}
                    />
                    } />

                </div>
            </Router>
        </div>
    );
};

PhotographerDashboardHeader.propTypes = {
    children: PropTypes.string.isRequired 
};