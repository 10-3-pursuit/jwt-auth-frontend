import { Link } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import woman1 from "../images/woman1.jpeg";
import woman2 from "../images/woman2.jpeg";
import woman3 from "../images/woman3.jpeg";
import woman4 from "../images/woman4.jpeg";
import woman5 from "../images/woman5.jpeg";
import woman6 from "../images/woman6.jpeg";
import woman7 from "../images/woman7.jpeg";
import woman8 from "../images/woman8.jpeg";
import woman9 from "../images/woman9.jpeg";
import woman10 from "../images/woman10.jpeg";

function LandingPage() {
  const [count, setCount] = useState(0);
  const [margin, setMargin] = useState("0%");
  const [forward, setForward] = useState(true);

  // create a function where the percentage of the shift of the image is based on the count
  const shiftImage = (count) => {
    switch (count) {
      case 0:
        setMargin("0%");
        break;
      case 1:
        setMargin("-10%");
        break;
      case 2:
        setMargin("-20%");
        break;
      case 3:
        setMargin("-30%");
        break;
      case 4:
        setMargin("-40%");
        break;
      case 5:
        setMargin("-50%");
        break;
      case 6:
        setMargin("-60%");
        break;
      case 7:
        setMargin("-70%");
        break;
      case 8:
        setMargin("-80%");
        break;
      case 9:
        setMargin("-90%");
        break;
    }
  };

  // function for the sliding functionality
  if (forward) {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        if (count === 10) {
          setForward(false);
        } else {
          setCount(count + 1);
          shiftImage(count);
        }
      }, 2000);
      // check if the function is working
      // console.log(count);
    }
  } else {
    for (let i = 10; i > 0; i--) {
      setTimeout(() => {
        if (count === 0) {
          setForward(true);
        } else {
          setCount(count - 1);
          shiftImage(count);
        }
      }, 2000);
    }
  }

  return (
    <>
      <div className="welcome">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/trips">
            <button
              className="get-started-button"
              style={{
                backgroundColor: "skyBlue",
                color: "white",
                border: "none",
              }}
            >
              CLICK TO GET STARTED
            </button>
          </Link>
        </div>
      </div>
      <div className="carousel-container">
        <div className="images-container">
          <div className="image" style={{ marginLeft: margin }}>
            <img src={woman1} alt="woman 1" />
          </div>
          <div className="image">
            <img src={woman2} alt="woman 2" />
          </div>

          <div className="image">
            <img src={woman3} alt="woman 3" />
          </div>

          <div className="image">
            <img src={woman4} alt="woman 4" />
          </div>

          <div className="image">
            <img src={woman5} alt="woman 5" />
          </div>
          <div className="image">
            <img src={woman6} alt="woman 6" />
          </div>

          <div className="image">
            <img src={woman7} alt="woman 7" />
          </div>

          <div className="image">
            <img src={woman8} alt="woman 8" />
          </div>

          <div className="image">
            <img src={woman9} alt="woman 9" />
          </div>
          <div className="image">
            <img src={woman10} alt="woman 10" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
