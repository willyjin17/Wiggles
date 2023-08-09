import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Base from "./Base";

const SecondaryRegister = () => {
  const [petName, setPetName] = useState("");
  const [petNameError, setPetNameError] = useState("");
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [breed, setBreed] = useState("");
  const [breedError, setBreedError] = useState("");
  const [playdates, setPlaydates] = useState("");
  const [playdatesError, setPlaydatesError] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state
    setImageError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store the image preview in the state
    };
    if (file) {
      reader.readAsDataURL(file); // Read the selected file as data URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (petName === "") {
      setPetNameError("Please Enter your Pet's Name");
      return;
    }
    if (breed === "") {
      setBreedError("Please Enter your Pet's Breed");
      return;
    }
    if (gender === "") {
      setGenderError("Please select your pet's gender");
      return;
    }
    if (playdates === "") {
      setPlaydatesError("Please select availability for playdates");
      return;
    }
    if (image === null) {
      setImageError("Please select a profile picture");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", petName);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("playdate", playdates === "yes");
      formData.append("image", image); // Append the image file to the FormData

      const response = await fetch(
        "http://localhost:3001/auth/secondaryregister",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("registration completed");
        navigate("/profile");
      } else {
        alert("registration failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("image-input").click();
  };

  return (
    <>
      <Base />
      <div class ="sec-reg">
        <div className="sec-reg-container">
          <form className="sec-reg-form" action="" onSubmit={handleSubmit}>
            <div className="top-inputs-section">
              {/* left section */}
              <div className="dog-info-tabs">
                <input
                  className="input-tabs"
                  type="text"
                  placeholder="Pet's Name"
                  value={petName}
                  onChange={(event) => {
                    setPetName(event.target.value);
                    setPetNameError("");
                  }}
                />
                {petNameError && <p>{petNameError}</p>}
                <input
                  className="input-tabs"
                  type="text"
                  placeholder="Date of Birth"
                  value={dob}
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(event) => {
                    setDob(event.target.value);
                    setDobError("");
                  }}
                />
                {dobError && <p>{dobError}</p>}
                <input
                  className="input-tabs"
                  type="text"
                  placeholder="Breed"
                  value={breed}
                  onChange={(event) => {
                    setBreed(event.target.value);
                    setBreedError("");
                  }}
                />
                {breedError && <p>{breedError}</p>}
                <div className="gender">
                  Gender
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "Male"}
                    onChange={() => {
                      setGender("Male");
                      setGenderError("");
                    }}
                  />
                  <label htmlFor="male">Male</label>
                  <br />
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => {
                      setGender("Female");
                      setGenderError("");
                    }}
                  />
                  <label htmlFor="female">Female</label>
                  <br />
                </div>
                {genderError && <p>{genderError}</p>}
                <div className="playdate">
                  Playdates
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
                    onChange={() => {
                      setPlaydates("no");
                      setPlaydatesError("");
                    }}
                  />
                  <label htmlFor="no">No</label>
                  <br />
                </div>
                {playdatesError && <p>{playdatesError}</p>}
              </div>

              {/* right section  */}
              <div className="prof-pic">
                <label htmlFor="">Profile Picture</label>
                <div
                  className="circular-container"
                  onClick={handleCircularClick}
                >
                  {image ? (
                    <img
                      className="selected-image"
                      src={URL.createObjectURL(image)}
                      alt="Selected Image"
                    />
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
                {imageError && <p>{imageError}</p>}
              </div>
            </div>

            <div className="bottom-section">
              <div className="back-next-btns">
                <Link to="/register">
                  <button className="btn button-back">Back</button>
                </Link>

                <button type="submit" className="btn button-next">
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SecondaryRegister;
