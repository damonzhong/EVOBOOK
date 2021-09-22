import React from "react";
import tagLinePhoto from "../images/TaglinePhoto.png";
import healthierHabits from "../images/HealthierHabits.png";
import boringPlanners from "../images/BoringPlanners.png";
import rewardExperience from "../images/RewardingExperience.png";
import featureImage from "../images/FeatureImage.png";
import showcaseImage from "../images/ShowcaseImage.png";
import logo from "../images/Logo.png";
import { Link } from "react-router-dom";
import Axios from "axios";
import Footer from "./Footer";

const Home = () => {
  const [error, setError] = React.useState("");
  const [items, setItems] = React.useState([]);

  const handleSearch = () => {
    // use searchInput when you want specific results
    var searchInput = document.getElementById("searchInput").value;

    Axios.get("/api/getAllItems")
      .then((res) => {
        var data = res.data;

        // TODO: use data to display on page
        window.location.replace("/Register");
      })
      .catch(() => {
        setError("Failed to Search");
      });

    window.location.replace("/Results");
  };

  return (
    <div class="App">
      <header class="App-header">
        <img src={logo} />

        <div class="searchBar">
          <input
            placeholder={"Search items, themes, and more..."}
            id="searchInput"
          ></input>
          <button class="searchButton" onClick={handleSearch}>
            Search!
          </button>
        </div>
      </header>

      <body class="App-body">
        <div class="tagline-box">
          <img src={tagLinePhoto} />
          <p> a digital health planner that evolves with </p>
          <p class="YOU"> YOU</p>
        </div>

        <div class="introStrip">
          <div class="introBlock">
            <p class="introText">Ready to build healthier habits?</p>
            <img src={healthierHabits} className="introPic" />
            <p>
              Motivation is fleeting, discipline is key. Build your habits
              slowly and keep track of your progress with our planner.
            </p>
          </div>

          <div class="introBlock">
            <p class="introText">Is your schedule in disarray?</p>
            <img src={boringPlanners} class="introPic" />
            <p>
              Our planner will help you get everything sorted so you never lose
              track of what needs to get done. Leave the heavy lifting to us so
              you can focus on what's important.
            </p>
          </div>

          <div className="introBlock">
            <p className="introText">
              Looking for a more rewarding experience?
            </p>
            <img src={rewardExperience} className="introPic" />
            <p>
              Decorate your layout with items and themes. All earned by doing
              what you're supposed to.
            </p>
          </div>
        </div>

        <Link to="/Register">
          <button className="button">Get Started</button>{" "}
        </Link>

        <div className="quoteBox">
          <p>A better life starts here</p>
        </div>

        <div className="showcase">
          <div className="showcaseTexts">
            <div className="showcaseTextBlock">
              <p>Keep track of your tasks</p>
            </div>

            <div className="showcaseTextBlock">
              <p>Build habits</p>
            </div>

            <div className="showcaseTextBlock">
              <p>Maintain your streaks</p>
            </div>

            <div className="showcaseTextBlock">
              <p>See how well you're doing</p>
            </div>
          </div>

          <img src={showcaseImage} />
        </div>

        <div className="featuresText">
          <p>Features</p>
        </div>

        <div class="flex-grid-thirds">
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Get reminders</p>
            <p className="featureDesc">
              Never lose track of your goals with our notification system
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Get Rewarded</p>
            <p className="featureDesc">
              Every task and habit you complete rewards you with currency so you
              can enhance your experience
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Mood Journal</p>
            <p className="featureDesc">
              Get a feel of your day to day moods with our mood tracker
            </p>
          </div>
        </div>

        <div class="flex-grid-thirds">
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Communities</p>
            <p className="featureDesc">
              Join with like-minded users and help each other reach new
              milestones one step at a time.
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Graphs</p>
            <p className="featureDesc">
              Check out your progress weekly/monthly progress with our graphs.
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Calorie Counter</p>
            <p className="featureDesc">
              Keep track of your nutrition with our built in calorie log
            </p>
          </div>
        </div>

        <div class="flex-grid-thirds">
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Sleep Log</p>
            <p className="featureDesc">
              See how well you're sleeping with a sleep journal
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Achievements</p>
            <p className="featureDesc">
              Earn rewards for following through with your habits and tasks
            </p>
          </div>
          <div class="col">
            <img src={featureImage} className="featurePic" />
            <p className="featureTitle">Physical/Mental Health</p>
            <p className="featureDesc">
              Get a jump start on a new routine with our basic health plans
            </p>
          </div>
        </div>

        <div className="quoteBox">
          <p>
            Are you ready?<br></br>
            Start keeping track of your habits today!
          </p>
        </div>
        <Link to="/Register">
          <button className="button">Get Started</button>{" "}
        </Link>
      </body>

      <Footer></Footer>
    </div>
  );
};

export default Home;
