import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const GbCard50SkewedModal = ({
	list,
	buttonLink,
	buttonValue,
	closeModal
}) => (
		<div
			className="modal"
			onClick={e =>
				e.target.classList.contains("modal-list") && closeModal(false)
			}
		>
			<ul className="modal-list">
				{list.map((el, idx) => (
					<li key={idx} className="modal-list-item">
						{el.icon}
						<p className="gb-text-white gb-paragraph-small modal-list-item-description">
							{el.description}
						</p>
					</li>
				))}
			</ul>
			<Link
				to={buttonLink}
				className="modal-button gb-btn gb-btn-white gb-btn-small"
			>
				{buttonValue}
			</Link>
		</div>
	);

GbCard50SkewedModal.propTypes = {
	list: PropTypes.array.isRequired,
	buttonLink: PropTypes.string,
	buttonValue: PropTypes.string,
	closeModal: PropTypes.func.isRequired,
};