import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import circle from '../images/icons/circle.png';
import edit from '../images/icons/Edit.png';
import up from '../images/icons/Up.png';
import down from '../images/icons/Down.png';
import plus from '../images/icons/Plus.png';
import time from '../images/icons/Time.png';
import sleep from '../images/icons/Sleep.png';
import check from '../images/icons/Check.png';
import trash from '../images/icons/Trash.png';
import mood1 from '../images/icons/moods/mood1.png';
import mood2 from '../images/icons/moods/mood2.png';
import mood3 from '../images/icons/moods/mood3.png';
import mood4 from '../images/icons/moods/mood4.png';
import mood5 from '../images/icons/moods/mood5.png';
import mood6 from '../images/icons/moods/mood6.png';
import mood7 from '../images/icons/moods/mood7.png';
import mood8 from '../images/icons/moods/mood8.png';
import mood9 from '../images/icons/moods/mood9.png';
import mood10 from '../images/icons/moods/mood10.png';
import mood11 from '../images/icons/moods/mood11.png';
import mood12 from '../images/icons/moods/mood12.png';
import mood13 from '../images/icons/moods/mood13.png';
import mood14 from '../images/icons/moods/mood14.png';
import mood15 from '../images/icons/moods/mood15.png';
import mood16 from '../images/icons/moods/mood16.png';
import mood17 from '../images/icons/moods/mood17.png';
import mood18 from '../images/icons/moods/mood18.png';
import mood19 from '../images/icons/moods/mood19.png';
import mood20 from '../images/icons/moods/mood20.png';
import mood21 from '../images/icons/moods/mood21.png';
import mood22 from '../images/icons/moods/mood22.png';
import mood23 from '../images/icons/moods/mood23.png';
import mood24 from '../images/icons/moods/mood24.png';
import x from '../images/icons/X.png';
import gold from '../images/Gold.png';
import ScriptTag from 'react-script-tag';
import '../styles/ActivityBook.css';
import Header from './Header';
import Footer from './Footer';
import Axios from 'axios';

const ActivityBook = ({ appUser, setAppUser }) => {
	const ModalComponent = ReactModal;

	// Hooks
	const [ habitComplete, setHabitCompletion ] = React.useState('Complete!');
	const [ anti, setAnti ] = React.useState(false);
	const [ editAnti, setEditAnti ] = React.useState(false);
	const [ moodChoice, setMoodChoice ] = React.useState(0);
	const [ showHabitCreate, setShowHabitCreate ] = React.useState(false);
	const [ showHabitEdit, setShowHabitEdit ] = React.useState(false);
	const [ showTaskCreate, setShowTaskCreate ] = React.useState(false);
	const [ showTaskEdit, setShowTaskEdit ] = React.useState(false);
	const [ showTaskReward, setShowTaskReward ] = React.useState(false);
	const [ showJournalView, setShowJournalView ] = React.useState(false);
	const [ showJournalCreate, setShowJournalCreate ] = React.useState(false);
	const [ showJournalEdit, setShowJournalEdit ] = React.useState(false);

	// [BACKEND] load tasks list
	// low priority
	//const [ taskList, setTaskList ] = React.useState([]);
	const [ uid, setUid ] = React.useState('');
	const getData = () => {
		const body = {
			uname: appUser
		};
		Axios.post('/users/api/data', body).then((res) => {
			const body2 = {
				uid: res.data.uid
			};
			Axios.post('/api/Task', body2).then((res) => {
				//console.log("///// front end dataarry with inventory items:  " + res.data.items)
				//console.log(res.data[1].taskName)
				loadTaskList(res.data);
			});
			setUid(res.data.uid);
		});
	};

	React.useEffect(() => {
		getData();
		return;
	}, []);

	// console.log(typeof allItems)
	// console.log(JSON.stringify(allItems))
	// console.log(JSON.stringify(allItems[1]))
	//console.log(allItems[1])
	// var aTask = (allItems.taskName)

	// console.log(JSON.parse(allItems))
	//console.log(allItems[1].taskId)

	//moving data from backend to frontend
	const loadTaskList = (taskData) => {
		//console.log(taskData.length);
    //my array of tasks
    var taskListArray = [];
		//looping through the data
		for (var i = 0; i < taskData.length; i++) {
      var taskListSubArray = [];
      //checking if task is complete
      if(taskData[i].taskCheck == 0){
        //console.log("This is a task not checked");
        taskListSubArray.push(taskData[i].taskName);
        taskListSubArray.push(taskData[i].taskDescription);
        taskListSubArray.push(taskData[i].taskFrequency);
        taskListSubArray.push(taskData[i].taskTime);
        taskListSubArray.push(false);

        //pushing the task into an array
        taskListArray.push(taskListSubArray)
      }
		}

    for (var i = 0; i < taskListArray.length; i++) {
      var task = taskListArray[i];
      addTask(task[0], task[1], task[2], task[3], task[4]);
    }
		/*
    var taskList = [
      ["title1", "desc1", "freq1", "time1", true],
      ["title2", "desc2", "freq2", "time2", false],
      ["title3", "desc3", "freq3", "freq3", false],
    ];

    for (var i = 0; i < taskList.length; i++) {
      var task = taskList[i];
      addTask(task[0], task[1], task[2], task[3], task[4]);
    }*/
	};

	// Changes the AntiHabit State to the opposite value
	const changeAnti = (event) => {
		if (anti == false) {
			setAnti(true);
		} else {
			setAnti(false);
		}
	};

	// Changes the Edited AntiHabit State to the opposite value
	const changeEditAnti = (event) => {
		if (editAnti == false) {
			setEditAnti(true);
		} else {
			setEditAnti(false);
		}
	};

	// Updates the Mood choice in the journal entry
	const changeMood = (event, mood) => {
		setMoodChoice(mood);
		var i;
		for (i = 1; i <= 24; i++) {
			document.getElementById(`moodIcon${i}`).style.backgroundColor = 'transparent';
		}
		document.getElementById(`moodIcon${mood}`).style.backgroundColor = '#989b6d';
	};

	// Responds to the user completing a habit once
	const completeHabit = (event) => {
		setHabitCompletion('Check back tomorrow!');
		document.getElementById('firstCircle').src = check;
	};

	// If toAdd is true, add a habit to the database. Else, just update the database
	const updateHabitCreate = (event, toAdd) => {
		var isAnti, habitName, habitFreq, habitTime, habitDesc, habitAlert;

		if (toAdd) {
			isAnti = anti;
			habitName = document.getElementById('habitNameInput').value;
			habitFreq = document.getElementById('habitFreqInput').value;
			habitTime = document.getElementById('habitTimeInput').value;
			habitDesc = document.getElementById('habitDescInput').value;
			habitAlert = 'You are attempting to add a ';

			if (isAnti) {
				habitAlert = habitAlert.concat('anti-habit ');
			} else {
				habitAlert = habitAlert.concat('habit ');
			}

			habitAlert = habitAlert.concat(`called \"${habitName}\", with frequency \"${habitFreq}\", by \"${habitTime}\", with description \"${habitDesc}\" \n
      This requires more backend development. Please check back later!`);
		} else {
			isAnti = editAnti;
			habitName = document.getElementById('habitNameEditInput').value;
			habitFreq = document.getElementById('habitFreqEditInput').value;
			habitTime = document.getElementById('habitTimeEditInput').value;
			habitDesc = document.getElementById('habitDescEditInput').value;
			habitAlert = 'You are attempting to edit your ';

			if (isAnti) {
				habitAlert = habitAlert.concat('anti-habit ');
			} else {
				habitAlert = habitAlert.concat('habit ');
			}

			habitAlert = habitAlert.concat(`called \"${habitName}\", with frequency \"${habitFreq}\", by \"${habitTime}\", with description \"${habitDesc}\" \n
      This requires more backend development. Please check back later!`);
		}

		alert(habitAlert);
		setShowHabitCreate(false);
		setShowHabitEdit(false);
	};

	// If toAdd is true, add a task to the database. Else, just update the database
	const updateTaskCreate = (event) => {
		var taskName, taskFreq, taskTime, taskDesc;

		taskName = document.getElementById('taskNameInput').value;
		taskFreq = document.getElementById('taskFreqInput').value;
		taskTime = document.getElementById('taskTimeInput').value;
		taskDesc = document.getElementById('taskDescInput').value;

		// [BACKEND] ADD TASK TO DATABASE
		const body = {
			uid: uid,
			taskName: taskName,
			taskDesc: taskDesc,
			taskFreq: taskFreq,
			taskTime: taskTime,
			taskComplete: false
		};
		event.preventDefault();
		Axios.post('/api/addtask', body)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					alert('Task Added :)');
				} else {
					alert("Error: Task Wasn't Added :(");
					alert(res.data.response);
				}
			})
			.catch(() => {});

		addTask(taskName, taskDesc, taskFreq, taskTime, false);
		setShowTaskCreate(false);
		setShowTaskEdit(false);
	};

	// If toAdd is true, add a journal entry to the database. Else, just update the database
	const updateJournalCreate = (event, toAdd) => {
		var feeling, mood, sleep, text, journalAlert;
		if (toAdd) {
			feeling = document.getElementById('journalFeelingInput').value;
			mood = moodChoice;
			sleep = document.getElementById('journalSleepInput').value;
			text = document.getElementById('journalTextInput').value;
			journalAlert = 'You are attempting to add ';
		} else {
			feeling = document.getElementById('journalFeelingEditInput').value;
			mood = moodChoice;
			sleep = document.getElementById('journalSleepEditInput').value;
			text = document.getElementById('journalTextEditInput').value;
			journalAlert = 'You are attempting to edit ';
		}

		journalAlert = journalAlert.concat(`a journal entry with feeling \"${feeling}\", mood \"${mood}\", sleep \"${sleep}\", with text \"${text}\" \n
    This requires more backend development. Please check back later!`);

		alert(journalAlert);
		setShowJournalCreate(false);
		setShowJournalEdit(false);
	};

	// Delete a habit
	const deleteHabit = () => {
		alert(`You are attempting to delete your habit.\n
    This requires more backend development. Please check back later!`);
		setShowHabitEdit(false);
	};

	// Delete a journal entry
	const deleteJournal = () => {
		alert(`You are attempting to delete your journal entry.\n
    This requires more backend development. Please check back later!`);
		setShowTaskEdit(false);
	};

	// Get rewarded for completing a task
	const getTaskReward = (isChecked, title) => {
		// var checked = document.getElementById("taskCheckbox").checked;
		if (isChecked) {
			// [BACKEND] SEND TASK UPDATE
			const body = {
				uid: uid,
				taskName: title,
				isChecked: true
			};
			Axios.post('/api/TaskChecked', body)
				.then((res) => {
					// console.log(res.data);
					if (res.data.success) {
						alert('it worked :)');
					} else {
						alert('it didnt work :(');
						alert(res.data.response);
					}
				})
				.catch(() => {});

			setShowTaskReward(true);
		} else {
			// [BACKEND] SEND TASK UPDATE
			const body = {
				uid: uid,
				taskName: title,
				isChecked: false
			};

			Axios.post('/api/TaskChecked', body)
				.then((res) => {
					// console.log(res.data);
					if (res.data.success) {
						alert('it worked :)');
					} else {
						alert('it didnt work :(');
						alert(res.data.response);
					}
				})
				.catch(() => {});
		}
	};

	// Switches from view journal screen to edit journal screen
	const journalEditSwitch = () => {
		setShowJournalView(false);
		setShowJournalEdit(true);
	};

	//console.log("This is Activity Book     " + appUser);
	// Handles deletion of a task
	var close = document.getElementsByClassName('trashIcon');
	var i;
	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement.parentElement;
			var taskName = this.parentElement.parentElement.children[0].children[1].children[0].textContent;
			// [BACKEND] SEND DELETE REQUEST
			const body = {
				uid: uid,
				taskName: taskName
				//include uid to know which task in the table
				//uid: uid,
			};
			Axios.post('/api/RemoveTask', body)
				.then((res) => {
					console.log(res.data);
					if (res.data.success) {
						alert('it worked :)');
					} else {
						alert('it didnt work :(');
						alert(res.data.response);
					}
				})
				.catch(() => {});
			div.style.display = 'none';
		};
	}

	function addTask(title, description, frequency, deadline, isChecked) {
		var taskDiv = document.createElement('div');
		taskDiv.className = 'task';

		var taskMainContentDiv = document.createElement('div');
		taskMainContentDiv.className = 'taskMainContent';
		taskDiv.appendChild(taskMainContentDiv);

		var taskCheckBox = document.createElement('input');
		taskCheckBox.type = 'checkbox';
		taskCheckBox.id = 'taskCheckBox';
		taskCheckBox.className = 'taskCheckbox';
		taskCheckBox.checked = isChecked;
		taskCheckBox.onclick = function() {
			getTaskReward(taskCheckBox.checked, title);
		};
		taskMainContentDiv.appendChild(taskCheckBox);

		var listItemDetailsDiv = document.createElement('div');
		listItemDetailsDiv.className = 'listItemDetails';
		taskMainContentDiv.appendChild(listItemDetailsDiv);

		var taskTitleHeader = document.createElement('h3');
		listItemDetailsDiv.appendChild(taskTitleHeader);

		var taskTitle = document.createTextNode(title);
		taskTitleHeader.appendChild(taskTitle);

		var taskDescriptionTag = document.createElement('p');
		taskDescriptionTag.className = 'description';
		listItemDetailsDiv.appendChild(taskDescriptionTag);

		var taskDescription = document.createTextNode(description);
		taskDescriptionTag.appendChild(taskDescription);

		var taskDeadlineDiv = document.createElement('div');
		taskDeadlineDiv.className = 'taskDeadline';
		listItemDetailsDiv.appendChild(taskDeadlineDiv);

		var deadlineImg = document.createElement('img');
		deadlineImg.src = time;
		deadlineImg.className = 'timeIcon';
		taskDeadlineDiv.appendChild(deadlineImg);

		var taskDeadlineDescTag = document.createElement('p');
		taskDeadlineDescTag.className = 'taskDeadlineDesc';
		taskDeadlineDiv.appendChild(taskDeadlineDescTag);

		var taskDeadlineDesc = document.createTextNode(frequency + ' by ' + deadline);
		taskDeadlineDescTag.appendChild(taskDeadlineDesc);

		var listItemButtonsDiv = document.createElement('div');
		listItemButtonsDiv.className = 'listItemButtons';
		taskDiv.appendChild(listItemButtonsDiv);

		var trashImg = document.createElement('img');
		trashImg.src = trash;
		trashImg.className = 'trashIcon clickable';
		listItemButtonsDiv.appendChild(trashImg);

		document.getElementById('taskList').appendChild(taskDiv);
	}

	return (
		<div>
			{/* Header */}
			<Header appUser={appUser} setAppUser={setAppUser} />

			{/* Habit Creation Popup Window */}
			<ModalComponent
				isOpen={showHabitCreate}
				onRequestClose={() => setShowHabitCreate(false)}
				className="popUpWindow" // className styles the Modal content
				overlayClassName="Overlay" // Overlay styles the stuff behind the Modal.
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowHabitCreate(false)} />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">I want to ...&nbsp;</p>

					<input type="radio" value="Start" name="habitType" onClick={() => setAnti(false)} />
					<p class="greenText popNormalText">&nbsp;Start&nbsp;</p>
					<input type="radio" value="Stop" name="habitType" onClick={() => setAnti(true)} />
					<p class="redText popNormalText">&nbsp;Stop&nbsp;</p>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<input id="habitNameInput" placeholder="enter a habit name" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">as often as&nbsp;</p>
					<input id="habitFreqInput" placeholder="Ex. daily, every Friday, etc." />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">by&nbsp;</p>
					<input type="time" id="habitTimeInput" placeholder="enter a time" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">for 21 days to develop this habit.</p>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<textarea class="descriptionBox" id="habitDescInput" placeholder="add a description" />
				</div>

				<div class="alignSelfFlexEnd">
					<p class="bigGreenButton" onClick={(e) => updateHabitCreate(e, true)}>
						Start!
					</p>
				</div>
			</ModalComponent>

			{/* Habit Edit Popup Window */}
			<ModalComponent
				isOpen={showHabitEdit}
				onRequestClose={() => setShowHabitEdit(false)}
				className="popUpWindow" // className styles the Modal content
				overlayClassName="Overlay" // Overlay styles the stuff behind the Modal.
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowHabitEdit(false)} />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">I want to ...&nbsp;</p>
					<p class="greenText popNormalText">start&nbsp;</p>
					<label class="switch">
						<input type="checkbox" onClick={(e) => changeEditAnti(e)} />
						<span class="slider" />
					</label>
					<p class="redText popNormalText">&nbsp;stop</p>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<input id="habitNameEditInput" placeholder="10 min Exercise" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">as often as&nbsp;</p>
					<input id="habitFreqEditInput" placeholder="every day" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">by&nbsp;</p>
					<input id="habitTimeEditInput" placeholder="10:00 PM" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">for 21 days to develop this habit.</p>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<textarea
						class="descriptionBox"
						id="habitDescEditInput"
						placeholder="Yoga, Dance, Kickboxing, or Running."
					/>
				</div>

				<div class="alignSelfFlexEnd flexRow">
					<p class="bigRedOutlineButton" onClick={deleteHabit}>
						Delete
					</p>
					<p class="bigGreenButton" onClick={(e) => updateHabitCreate(e, false)}>
						Save Changes
					</p>
				</div>
			</ModalComponent>

			{/* Task Creation Popup Window */}
			<ModalComponent
				isOpen={showTaskCreate}
				onRequestClose={() => setShowTaskCreate(false)}
				className="popUpWindow" // className styles the Modal content
				overlayClassName="Overlay" // Overlay styles the stuff behind the Modal.
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowTaskCreate(false)} />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">I need to ...&nbsp;</p>
					<input id="taskNameInput" placeholder="enter a task name" />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">as often as&nbsp;</p>
					<input id="taskFreqInput" placeholder="Ex. daily, every Friday, etc." />
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">by&nbsp;</p>
					<input type="time" id="taskTimeInput" placeholder="enter a time" />
					<p class="brownText popNormalText">.</p>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<textarea class="descriptionBox" placeholder="add a description" id="taskDescInput" />
				</div>

				<div class="alignSelfFlexEnd">
					<p class="bigGreenButton" onClick={(e) => updateTaskCreate(e)}>
						{/* <p class="bigGreenButton" onClick={addTask}> */}
						Create!
					</p>
				</div>
			</ModalComponent>

			{/* Task Reward Popup Window */}
			<ModalComponent
				isOpen={showTaskReward}
				onRequestClose={() => setShowTaskReward(false)}
				className="popUpWindow centerJust"
				overlayClassName="Overlay"
			>
				<div class="flexColumn centerJust">
					<p class="brownText popNormalText">Great job!</p>
					<p class="brownText popNormalText">You earned:</p>
				</div>

				<div class="popupCentered">
					<img src={gold} class="goldIcon" />
					<p class="brownText popNormalText">+100</p>
				</div>

				<p class="bigGreenButton centeredButton" onClick={(e) => setShowTaskReward(false)}>
					Okay
				</p>
			</ModalComponent>

			{/* Journal Creation Popup Window */}
			<ModalComponent
				isOpen={showJournalCreate}
				onRequestClose={() => setShowJournalCreate(false)}
				className="popUpWindow"
				overlayClassName="Overlay"
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowJournalCreate(false)} />
				</div>

				<p class="brownText popNormalText">Thursday April 22, 2021 7:30 PM</p>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">How are you feeling today?&nbsp;</p>
					<input id="journalFeelingInput" placeholder="Ex. Happy, sad, tired, etc." />
				</div>

				<div class="moodSelection">
					<div class="moodRow">
						<img src={mood1} id="moodIcon1" class="jEMoodIcon" onClick={(e) => changeMood(e, 1)} />
						<img src={mood2} id="moodIcon2" class="jEMoodIcon" onClick={(e) => changeMood(e, 2)} />
						<img src={mood3} id="moodIcon3" class="jEMoodIcon" onClick={(e) => changeMood(e, 3)} />
						<img src={mood4} id="moodIcon4" class="jEMoodIcon" onClick={(e) => changeMood(e, 4)} />
						<img src={mood5} id="moodIcon5" class="jEMoodIcon" onClick={(e) => changeMood(e, 5)} />
						<img src={mood6} id="moodIcon6" class="jEMoodIcon" onClick={(e) => changeMood(e, 6)} />
						<img src={mood7} id="moodIcon7" class="jEMoodIcon" onClick={(e) => changeMood(e, 7)} />
						<img src={mood8} id="moodIcon8" class="jEMoodIcon" onClick={(e) => changeMood(e, 8)} />
						<img src={mood9} id="moodIcon9" class="jEMoodIcon" onClick={(e) => changeMood(e, 9)} />
						<img src={mood10} id="moodIcon10" class="jEMoodIcon" onClick={(e) => changeMood(e, 10)} />
						<img src={mood11} id="moodIcon11" class="jEMoodIcon" onClick={(e) => changeMood(e, 11)} />
						<img src={mood12} id="moodIcon12" class="jEMoodIcon" onClick={(e) => changeMood(e, 12)} />
					</div>
					<div class="moodRow">
						<img src={mood13} id="moodIcon13" class="jEMoodIcon" onClick={(e) => changeMood(e, 13)} />
						<img src={mood14} id="moodIcon14" class="jEMoodIcon" onClick={(e) => changeMood(e, 14)} />
						<img src={mood15} id="moodIcon15" class="jEMoodIcon" onClick={(e) => changeMood(e, 15)} />
						<img src={mood16} id="moodIcon16" class="jEMoodIcon" onClick={(e) => changeMood(e, 16)} />
						<img src={mood17} id="moodIcon17" class="jEMoodIcon" onClick={(e) => changeMood(e, 17)} />
						<img src={mood18} id="moodIcon18" class="jEMoodIcon" onClick={(e) => changeMood(e, 18)} />
						<img src={mood19} id="moodIcon19" class="jEMoodIcon" onClick={(e) => changeMood(e, 19)} />
						<img src={mood20} id="moodIcon20" class="jEMoodIcon" onClick={(e) => changeMood(e, 20)} />
						<img src={mood21} id="moodIcon21" class="jEMoodIcon" onClick={(e) => changeMood(e, 21)} />
						<img src={mood22} id="moodIcon22" class="jEMoodIcon" onClick={(e) => changeMood(e, 22)} />
						<img src={mood23} id="moodIcon23" class="jEMoodIcon" onClick={(e) => changeMood(e, 23)} />
						<img src={mood24} id="moodIcon24" class="jEMoodIcon" onClick={(e) => changeMood(e, 24)} />
					</div>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">How much sleep did you get last night?&nbsp;</p>
					<input id="journalSleepInput" placeholder="Ex. 7.5 hours" />
				</div>

				<textarea id="journalTextInput" placeholder="How was your day?" />

				<div class="alignSelfFlexEnd">
					<p class="bigGreenButton" onClick={(e) => updateJournalCreate(e, true)}>
						Create!
					</p>
				</div>
			</ModalComponent>

			{/* Journal Entry View Popup Window */}
			<ModalComponent
				isOpen={showJournalView}
				onRequestClose={() => setShowJournalView(false)}
				className="popUpWindow"
				overlayClassName="Overlay"
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowJournalView(false)} />
				</div>
				<h3>Sunday April 11, 2021</h3>
				<div class="jEntryButtons">
					<div class="jEntryData">
						<img src={sleep} class="jEntryIcon" />
						<p class="jEntryLabel">6.5 hours</p>
					</div>
					<div class="jEntryData">
						<img src={mood24} class="jEntryIcon" />
						<p class="jEntryLabel">Drained</p>
					</div>
				</div>

				<p class="brownText journalViewDesc">
					I discovered I am extremely productive in the morning. I woke up at 8:30 AM today and I felt so
					accomplished getting so much done before 2:00 pm. I was working on UI Mockups for both my
					Multiplayer Game Development class and Software Engineering. I love graphic designing. I think if I
					hadn't chosen Computer Science as a major, I would definitely major in Graphic Design.
				</p>

				<img src={edit} class="editIcon clickable alignSelfFlexEnd" onClick={journalEditSwitch} />
			</ModalComponent>

			{/* Journal Entry Edit Popup Window */}
			<ModalComponent
				isOpen={showJournalEdit}
				onRequestClose={() => setShowJournalEdit(false)}
				className="popUpWindow"
				overlayClassName="Overlay"
			>
				<div class="alignSelfFlexEnd">
					<img src={x} class="xIcon" onClick={() => setShowJournalEdit(false)} />
				</div>

				<p class="brownText popNormalText">Sunday April 11, 2021 2:32 PM</p>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">How are you feeling today?&nbsp;</p>
					<input id="journalFeelingEditInput" placeholder="Drained" />
				</div>

				<div class="moodSelection">
					<div class="moodRow">
						<img src={mood1} id="moodIcon1" class="jEMoodIcon" onClick={(e) => changeMood(e, 1)} />
						<img src={mood2} id="moodIcon2" class="jEMoodIcon" onClick={(e) => changeMood(e, 2)} />
						<img src={mood3} id="moodIcon3" class="jEMoodIcon" onClick={(e) => changeMood(e, 3)} />
						<img src={mood4} id="moodIcon4" class="jEMoodIcon" onClick={(e) => changeMood(e, 4)} />
						<img src={mood5} id="moodIcon5" class="jEMoodIcon" onClick={(e) => changeMood(e, 5)} />
						<img src={mood6} id="moodIcon6" class="jEMoodIcon" onClick={(e) => changeMood(e, 6)} />
						<img src={mood7} id="moodIcon7" class="jEMoodIcon" onClick={(e) => changeMood(e, 7)} />
						<img src={mood8} id="moodIcon8" class="jEMoodIcon" onClick={(e) => changeMood(e, 8)} />
						<img src={mood9} id="moodIcon9" class="jEMoodIcon" onClick={(e) => changeMood(e, 9)} />
						<img src={mood10} id="moodIcon10" class="jEMoodIcon" onClick={(e) => changeMood(e, 10)} />
						<img src={mood11} id="moodIcon11" class="jEMoodIcon" onClick={(e) => changeMood(e, 11)} />
						<img src={mood12} id="moodIcon12" class="jEMoodIcon" onClick={(e) => changeMood(e, 12)} />
					</div>
					<div class="moodRow">
						<img src={mood13} id="moodIcon13" class="jEMoodIcon" onClick={(e) => changeMood(e, 13)} />
						<img src={mood14} id="moodIcon14" class="jEMoodIcon" onClick={(e) => changeMood(e, 14)} />
						<img src={mood15} id="moodIcon15" class="jEMoodIcon" onClick={(e) => changeMood(e, 15)} />
						<img src={mood16} id="moodIcon16" class="jEMoodIcon" onClick={(e) => changeMood(e, 16)} />
						<img src={mood17} id="moodIcon17" class="jEMoodIcon" onClick={(e) => changeMood(e, 17)} />
						<img src={mood18} id="moodIcon18" class="jEMoodIcon" onClick={(e) => changeMood(e, 18)} />
						<img src={mood19} id="moodIcon19" class="jEMoodIcon" onClick={(e) => changeMood(e, 19)} />
						<img src={mood20} id="moodIcon20" class="jEMoodIcon" onClick={(e) => changeMood(e, 20)} />
						<img src={mood21} id="moodIcon21" class="jEMoodIcon" onClick={(e) => changeMood(e, 21)} />
						<img src={mood22} id="moodIcon22" class="jEMoodIcon" onClick={(e) => changeMood(e, 22)} />
						<img src={mood23} id="moodIcon23" class="jEMoodIcon" onClick={(e) => changeMood(e, 23)} />
						<img src={mood24} id="moodIcon24" class="jEMoodIcon" onClick={(e) => changeMood(e, 24)} />
					</div>
				</div>

				<div class="flexRow leftJust baselineAlign">
					<p class="brownText popNormalText">How much sleep did you get last night?&nbsp;</p>
					<input id="journalSleepEditInput" placeholder="6.5 hours" />
				</div>

				<textarea
					id="journalTextEditInput"
					placeholder="I discovered I am extremely productive in the morning. I woke up at 8:30 AM today and I felt so accomplished getting so much done before 2:00 pm. I was working on UI Mockups for both my Multiplayer Game Development class and Software Engineering. I love graphic designing. I think if I hadn't chosen Computer Science as a major, I would definitely major in Graphic Design."
				/>

				<div class="alignSelfFlexEnd flexRow">
					<p class="bigRedOutlineButton" onClick={deleteJournal}>
						Delete
					</p>
					<p class="bigGreenButton" onClick={(e) => updateJournalCreate(e, false)}>
						Save Changes
					</p>
				</div>
			</ModalComponent>

			{/* Main content of the page */}
			<div class="activityBook">
				<h1>My Activity Book</h1>

				{/* Habits and Task Portion */}
				<div class="topBook">
					{/* Habits Section */}
					<div class="habits">
						<h2>Habits</h2>
						<p class="topBookItemDesc brownText">
							A Habit is a routine of behavior that is repeated regularly and tends to occur
							subconsciously. Developing or breaking habits are the key to real lifestyle changes.
						</p>
						<div class="topBookList">
							{/* <div class="habit">
                <div class="listItemDetails">
                  <h3>10 min Exercise</h3>
                  <p class="description">
                    Yoga, Dance, Kickboxing, or Running.
                  </p>
                  <p class="description">Do by 10:00 PM every day.</p>
                  <p class="label">Fitness</p>
                </div>
                <div class="habitTracker">
                  <div class="circles">
                    <div class="circleRow">
                      <img id="firstCircle" src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                    </div>
                    <div class="circleRow">
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                    </div>
                    <div class="circleRow">
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                      <img src={circle}></img>
                    </div>
                  </div>
                  <p
                    class="habitActivate clickable"
                    id="completeHabitButton"
                    onClick={completeHabit}
                  >
                    {habitComplete}
                  </p>
                </div>
                <div class="listItemButtons">
                  <img
                    src={edit}
                    class="editIcon clickable"
                    onClick={() => setShowHabitEdit(true)}
                  ></img>
                  <div class="moveButtons">
                    <img src={up} class="moveIcon clickable"></img>
                    <img src={down} class="moveIcon clickable"></img>
                  </div>
                </div>
              </div> */}

							<div class="newListItem" onClick={() => setShowHabitCreate(true)}>
								<img src={plus} class="plusIcon" />
								<p class="plusDescription">Add a new habit</p>
							</div>
						</div>
					</div>

					{/* Tasks Section */}
					<div class="tasks">
						<h2>Tasks</h2>
						<p class="topBookItemDesc brownText">
							A Task is an activity that needs to be accomplished within a defined period of time or by a
							deadline to work towards one's goals.
						</p>

						<div class="topBookList" id="taskList">
							<div class="newListItem" onClick={() => setShowTaskCreate(true)}>
								<img src={plus} class="plusIcon" />
								<p class="plusDescription">Add a new task</p>
							</div>

							{/* <button onClick={loadTaskList}>Load tasks</button> */}
						</div>
					</div>
				</div>

				{/* Journal and Calorie Calculator Portion */}
				<div class="botBook">
					{/* Journal Section */}
					<div class="journal">
						<h2>Journal</h2>
						<div class="botBookList">
							<div class="newListItem" onClick={() => setShowJournalCreate(true)}>
								<img src={plus} class="plusIcon" />
								<p class="plusDescription">Add a new journal entry</p>
							</div>

							{/* <div
                class="journalEntry clickable"
                onClick={() => setShowJournalView(true)}
              >
                <div class="jEntryPreview">
                  <h3>Sunday April 11, 2021</h3>
                  <p>
                    I discovered I am extremely productive in the morning. I
                    woke up at 8:30 AM today and I felt so accomplished getting
                    so much done before 2:00 pm. I was working on UI Mockups for
                    both my Multiplayer Game Development class and Software
                    Engineering. I love graphic ...
                  </p>
                </div>
                <div class="jEntryButtons">
                  <div class="jEntryData">
                    <img src={sleep} class="jEntryIcon"></img>
                    <p class="jEntryLabel">6.5 hours</p>
                  </div>
                  <div class="jEntryData">
                    <img src={mood24} class="jEntryIcon"></img>
                    <p class="jEntryLabel">Drained</p>
                  </div>
                </div>
              </div> */}
						</div>
					</div>

					{/* Calorie Calculator Section */}
					<div class="calorieCalc">
						<h2>Calorie Calculator</h2>
						<div class="calorieCalcContent">
							<ScriptTag
								type="text/javascript"
								async
								id="weight-loss-calculator"
								data-type="verywell-tool"
								data-vertical="verywellfit"
								src="https://www.verywellfit.com/static/4.216.0/components/tools/calculators/iframe-embed/embed.min.js?id=weight-loss-calculator"
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ActivityBook;
