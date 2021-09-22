import axios from 'axios';
import React from 'react';
import Header from './Header';
import { Redirect } from 'react-router';
import defaultPic from '../images/Default_profile_pic.jpg';
import coinPic from '../images/coin.png';
import Footer from './Footer';
import '../styles/Profile.css';

const Profile = ({ appUser, setAppUser }) => {
  const [uid, setUid] = React.useState("");
  const [regTime, setRegTime] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [curr, setCurr] = React.useState("");
  const getData =() => {
	  const body = {
		  uname: appUser
	  };
  // Request User Data from Backend

		/*// This should probably be in the form of a GET request instead of post
		axios.post('/users/api/data', body).then((res) => {
			setFname(res.data.fname);
			setUid(res.data.uid);
			setRegTime(res.data.rtime);
			setEmail(res.data.email);
			console.log('Data is res: ' + res.data);
		});
		//console.log("This is User ID" + userid);
	};*/

    // This should probably be in the form of a GET request instead of post
    axios.post("/users/api/data", body).then((res) => {
      setCurr(res.data.currency);
      setFname(res.data.fname);
      setUid(res.data.uid);
      setRegTime(res.data.rtime);
      setEmail(res.data.email);
      //console.log("here is res first name: " + res.data.fname)
      //console.log("here is res: " + res.data.uid);
      //console.log("here is curr:"  + res.data.currency);
    });
};

  React.useEffect(() => {
    getData();
    return;
  }, []);
  
  //testing currency if it comes
  //console.log("received currency: " + curr);

	const logout = () => {
		setAppUser(null);
	};

	if (!appUser) return <Redirect to="/login" />;

	//console.log("This is Profile     " + appUser);

	//this is what the user will see once they login
	return (
		<div>
			<Header appUser={appUser} setAppUser={setAppUser}/>
			<div class="Profile-body">
				<div class="Main-Profile">
					<div>
						<h1> Welcome {fname}! </h1>
					</div>
					<div>
						<img class="Profile-Picture" src={defaultPic} />
					</div>
					<div class="the-user">{appUser}</div>
					<div class="user-currency-amount">
						<img class="coin-img" src={coinPic} /> {curr}
					</div>
					<div class="Profile-currency-description">Your EvoBook coins can be used to Shop items</div>
					<div class="last-signin">
						{' '}
						Last Sign As: {email} , Account Created On: {regTime}{' '}
					</div>
				</div>
				<div>
					<button class="Logout-button" onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
			<Footer />
		</div>
	);
};

/*
<div>
<h2> User ID: {userid} </h2>
</div>*/
export default Profile;
