import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Base from "./Base";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PiDogFill} from "react-icons/pi";
import Footer from "./Footer";

const SecondaryRegister = () => {
  const [petName, setPetName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [vaccinated, setvaccinated] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);


  const showSuccessToast = () => {
    toast.success('Registration Successful!', {
      data: {
        title: 'Success toast',
      }
    });
  };

  const showErrorToast = () => {
    toast.error('Registration Failed!', {
      data: {
        title: 'Error toast',
      }
    });
  };
  
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store the image preview in the state
    };
    if (file) {
      reader.readAsDataURL(file); // Read the selected file as data URL
    }
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", e => {
      textarea.style.height = "auto";
      var scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
    setCharacterCount(e.target.value.length);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (petName === "") {
      alert("Please enter your pet's name");
      return;
    }
    if (breed === "") {
      alert("Please enter your pet's breed");
      return;
    }
    if (gender === "") {
      alert("Please select your pet's gender");
      return;
    }
    if (vaccinated === "") {
      alert("Please select availability for vaccinated");
      return;
    }
    if (image === null) {
      alert("Please select a profile picture");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", petName);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("vaccinated", vaccinated === "yes");
      formData.append("image", image); // Append the image file to the FormData
      formData.append("bio", text);

      const response = await fetch("http://localhost:3001/auth/secondaryregister",{
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
      
      if(response.ok){
        showSuccessToast();
        navigate("/profile")
      }
      else{
        showErrorToast();
      }
    } 
    catch (err) {
      console.log(err);
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("inputImage").click();
  };

  return (
    <>
      <Base />
      <div className="secondaryRegisterContainer">
        <form className="secondaryRegisterationForm" onSubmit={handleSubmit}>
          <div className="secondaryRegisterationInputs">
            <div className="dogInfoLeft">
              <input
                className="inputTabs"
                type="text"
                placeholder="Pet's Name"
                value={petName}
                onChange={(event) => { setPetName(event.target.value) }}
              />
              <input
                className="inputTabs"
                type="text"
                placeholder="Date of Birth"
                value={dob}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(event) => {setDob(event.target.value)}}
              />
              <input
                className="inputTabs"
                type="text"
                placeholder="Breed"
                value={breed}
                onChange={(event) => {setBreed(event.target.value)}}
              />
              <div className="inputRadio">
                Gender 
                &nbsp;
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "Male"}
                  onChange={() => {setGender("Male")}}
                />
                <label htmlFor="male">Male</label>
                &nbsp;
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "Female"}
                  onChange={() => {setGender("Female")}}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="inputRadio">
                Vaccinated
                &nbsp;
                <input
                  type="radio"
                  id="yes"
                  name="playdate"
                  value="yes"
                  checked={vaccinated === "yes"}
                  onChange={() => setvaccinated("yes")}
                />
                <label htmlFor="yes">Yes</label>
                &nbsp;
                <input
                  type="radio"
                  id="no"
                  name="playdate"
                  value="no"
                  checked={vaccinated === "no"}
                  onChange={() => {setvaccinated("no")}}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className="dogInfoRight">
              <div>
                <label htmlFor="inputImage">Profile Picture</label>
                <input
                  id="inputImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="circular-container" onClick={handleCircularClick}>
                  {image ? (
                    <img
                      className="profilePicture"
                      src={URL.createObjectURL(image)}
                      alt="Selected Image"
                    />
                  ) : (
                    <PiDogFill className="profileIcon"/>
                  )}
                </div>
              </div>

              <span className="textSection">
                <textarea 
                  id='Bio' 
                  name='Message' 
                  value={text} 
                  maxLength={100}
                  placeholder='Enter your bio(max 100 characters)' 
                  rows='2'
                  onChange = {handleOnChange} 
                  required>{text}
                </textarea>
                <span className="textareaCount">{characterCount}/100</span>
              </span>
            </div>
          </div>

          <div className="bottomSection">
            <Link to="/register">
              <button className="btn btn-back">&lt; Back</button>
            </Link>

            <button type="submit" className="btn btn-next">
              Next &gt;
            </button>
          </div>
                
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default SecondaryRegister;
