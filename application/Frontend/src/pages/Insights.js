import React from 'react';
import ReactModal from 'react-modal';
import time from '../images/icons/Time.png';
import trash from '../images/icons/Trash.png';
import '../styles/ActivityBook.css';
import '../styles/Insights.css';
import Header from './Header';
import Footer from './Footer';

const Insights = ({ appUser, setAppUser }) => {
	const ModalComponent = ReactModal;

	// Hooks
	const [ showDelete, setShowDelete ] = React.useState(false);

	// Handles deleting an item from the insights
	const deleteItem = () => {
		alert(`You are attempting to delete an item from your insights.\n
    This requires more backend development. Please check back later!`);
		setShowDelete(false);
	};

	//console.log('This is Insights     ' + appUser);
	return (
		<div>
			<Header appUser={appUser} setAppUser={setAppUser} />

			{/* Item Deletion Confirmation Popup Window */}
			<ModalComponent
				isOpen={showDelete}
				onRequestClose={() => setShowDelete(false)}
				className="popUpWindow centerJust"
				overlayClassName="Overlay"
			>
				<p class="brownText popNormalText">Are you sure you want to delete this?</p>

				<div class="flexRow centerJust">
					<p class="bigRedOutlineButton" onClick={(e) => setShowDelete(false)}>
						No
					</p>
					<p class="bigGreenButton" onClick={deleteItem}>
						Yes
					</p>
				</div>
			</ModalComponent>

			{/* Main content of the page */}
			<div class="activityBook">
				<h1>Insights</h1>
				<div class="topBook">
					{/* Habits Section */}
					<div class="habits">
						<h2>0 Habits Developed/Broken</h2>
						<div class="topBookList">
							
							{/* <div class="habitInsight">
								<div class="listItemDetails">
									<h3>Meditation</h3>
									<p class="description">What are 3 things you are grateful for today?</p>
									<p class="description">Do by 3:00 AM every day.</p>
									<div class="insightBar">
										<img
											src={trash}
											class="trashIcon clickable"
											onClick={() => setShowDelete(true)}
										/>
										<p class="label">Mental</p>
									</div>
								</div>
								<div class="habitInsightTracker">
									<p>Completed</p>
									<p>April 3, 2021</p>
								</div>
							</div>

							<div class="habitInsight">
								<div class="listItemDetails">
									<h3>Biting Nails</h3>
									<p class="description">Refrain from doing this every day.</p>
									<div class="insightBar">
										<img
											src={trash}
											class="trashIcon clickable"
											onClick={() => setShowDelete(true)}
										/>
									</div>
								</div>
								<div class="habitInsightTracker">
									<p>Completed</p>
									<p>May 28, 2021</p>
								</div>
							</div> */}
							
							
							<div class="endInsightList">
								<p class="plusDescription">Keep up the good work!</p>
							</div>
						</div>
					</div>
					<div class="tasks">
						<h2>0 Tasks Completed</h2>
						<div class="topBookList">
							{/* <div class="task">
								<div class="taskMainContent">
									<input type="checkbox" class="taskCheckbox" checked="checked" />
									<div class="listItemDetails">
										<h3>Cook Meal Prep</h3>
										<p class="description">Remember to buy beef and broccoli</p>
										<div class="taskDeadline">
											<img src={time} class="timeIcon" />
											<p class="taskDeadlineDesc">SUN 04/18 11:59 PM</p>
										</div>
										<p class="label">Nutrition</p>
									</div>
								</div>

								<div class="listItemButtons">
									<img src={trash} class="trashIcon clickable" onClick={() => setShowDelete(true)} />
								</div>
							</div>

							<div class="task">
								<div class="taskMainContent">
									<input type="checkbox" class="taskCheckbox" checked="checked" />
									<div class="listItemDetails">
										<h3>Order Cap and Gown</h3>
										<p class="description">maybe a diploma frame too</p>
										<div class="taskDeadline">
											<img src={time} class="timeIcon" />
											<p class="taskDeadlineDesc">FRI 04/23 11:59PM</p>
										</div>
									</div>
								</div>

								<div class="listItemButtons">
									<img src={trash} class="trashIcon clickable" onClick={() => setShowDelete(true)} />
								</div>
							</div> */}

							<div class="endInsightList">
								<p class="plusDescription">Nice work! Keep it up!</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="habitCreation" />
			<Footer />
		</div>
	);
};

export default Insights;
