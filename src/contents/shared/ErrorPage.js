import React, { Component } from 'react';
import NavFooterWrapper from './NavFooterWrapper';

class ErrorPages extends Component {

	render() {
		return (
			<div className="section-content with-padding">
			
				<h1>This page isn't available</h1>
				<p>The link you followed may be broken, or the page may have been removed.</p>
			
			</div>
		);
	}
}

const ErrorPage = NavFooterWrapper(ErrorPages);
export default ErrorPage;
