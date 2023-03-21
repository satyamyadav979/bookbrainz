/*
 * Copyright (C) 2016  Max Prettyjohns
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import * as bootstrap from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';


const {Card, Form} = bootstrap;
const {useState, useCallback} = React;

/**
* The Achievement interface, defining the properties of an achievement.
* @typedef
* @property {string} name - The name of the achievement.
* @property {string} src - The source URL of the achievement's badge image.
* @property {string} id - The ID of the achievement.
*/
type Achievement = {
	name: string;
	src: string;
	id: string;
};
/**
 * Props for DragAndDropImage component
 * @typedef {Object} Props
 * @property {string} name - The name of the DragAndDrop component.
 */
type Props = {
  name: string;
};

/**
* A component for a drag-and-drop card that displays an achievement.
* The card displays an image of the achievement and allows the user to drag and drop a different achievement onto it.
* When a new achievement is dropped onto the card, it is displayed instead of the original achievement.
* @param {Props} props - The props object containing the following:
* @returns {JSX.Element} A React component that displays a drag-and-drop card for an achievement.
*/
function DragAndDrop({name}: Props) {
	const [achievement, setAchievement] = useState<Achievement>({
		name: 'drag badge to set',
		src: '/images/blankbadge.svg'
	});
	const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setAchievement({
			name: 'drag badge to set',
			src: '/images/blankbadge.svg'
		});
	});
	const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	});
	const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		let data;

		try {
			data = JSON.parse(event.dataTransfer.getData('text'));
		}
		catch (error) {
			return;
		}
		setAchievement(data);
	});
	return (
		<Card
			bg="light"
			onClick={handleClick}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<Card.Img
				className="mt-4"
				height={100}
				src={achievement.src}
				variant="top"
			/>
			<Card.Body className="text-center">
				<Form.Group>
					<Form.Control
						name={name}
						type="hidden"
						value={achievement.id}
					/>
				</Form.Group>
				<div className="h3">
					{achievement.name}
				</div>
			</Card.Body>
		</Card>
	);
}

DragAndDrop.displayName = 'DragAndDrop';
DragAndDrop.propTypes = {
	name: PropTypes.string.isRequired
};

export default DragAndDrop;
