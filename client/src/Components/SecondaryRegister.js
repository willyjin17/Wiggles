import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom"
import Base from "./Base";
 
const SecondaryRegister = () => {
  const [petName, setPetName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [playdates, setPlaydates] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  
  const navigate = useNavigate();
  
  const handleSubmit = async (event) =>{
    event.preventDefault();

    // const formData = new FormData();
    // formData.append("image", image);

    try{
      const response = await fetch("http://localhost:3001/auth/secondaryregister", {
        method: "POST",
        body: JSON.stringify({
          name:petName, dob, gender,breed,playdate: playdates === "yes",
        //   selectedImage,
          // userOwner:userID
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      // if (Image) {
      //   // Handle image upload logic here
      //   console.log("Selected image:", Image);
      // } else {
      //   alert("Please select an image.");
      // }
      if(response.ok){
        alert("registration completed")
        navigate("/profile")
      }else{
        alert("registration failed")
      }
    }
    catch(err){
      console.log(err)
    }

    

  }
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("image-input").click();
  };

  return (
    <>
    <Base/>
    
    <div className="sec-reg-container">
    
      <form action="" onSubmit={handleSubmit}>
        <div className="top-inputs-section">
          {/* left section */}
          <div className="dog-info-tabs">
            <input
              className="input-tabs"
              type="text"
              placeholder="Pet's Name"
              value={petName}
              onChange={(event) => setPetName(event.target.value)}
            />
            <input
              className="input-tabs"
              type="text"
              placeholder="Date of Birth"
              value={dob}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(event) => setDob(event.target.value)}
            />
            <input
              className="input-tabs"
              type="text"
              placeholder="Breed"
              value={breed}
              onChange={(event) => setBreed(event.target.value)}
            />

            <div className="gender">
              Gender
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              <label htmlFor="male">Male</label>
              <br />
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              <label htmlFor="female">Female</label>
              <br />
            </div>
            <div className="playdate">
              Open for Playdates?
              <input
                type="radio"
                id="yes"
                name="playdate"
                value="yes"
                checked={playdates === "yes"}
                onChange={() => setPlaydates("yes")}
              />
              <label htmlFor="yes">Yes</label>
              <br />
              <input
                type="radio"
                id="no"
                name="playdate"
                value="no"
                checked={playdates === "no"}
                onChange={() => setPlaydates("no")}
              />
              <label htmlFor="no">No</label>
              <br />
            </div>
          </div>

          {/* right section  */}
          <div className="prof-pic">
            <label htmlFor="">Upload Profile Picture</label>
          <div className="circular-container" onClick={handleCircularClick}>
      {selectedImage ? (
        <img className="selected-image" src={selectedImage} alt="Selected Image" />
      ) : (
        <div className="placeholder-text">+</div>
      )}
      <input
        type="file"
        accept="image/*"
        id="image-input"
        onChange={handleImageChange}
      />
    </div>
          </div>
        </div>

        <div className="bottomsection">
          <div className="back-next-btns">
            <Link to="/register">
             <button className="btn button-back">Back</button>
            </Link>
            
            <button type="submit" className="btn button-next">Next</button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default SecondaryRegister;
