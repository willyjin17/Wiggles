import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export default function EditProfile({
  closeEditProfile,
  name,
  setName,
  bio,
  setBio,
  dob,
  setDob,
  breed,
  setBreed,
  address,
  setAddress,
  gender,
  setGender,
  image,
  setImage,
}) {
  const [characterCount, setCharacterCount] = useState(0);

  const handleSubmit = async(e)=>{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("breed", breed);
    formData.append("image", image); // Append the image file to the FormData
    formData.append("bio", bio);

    const response = await fetch("http://localhost:3001/updateProfile",{
        method:"POST",
        body:formData,
        credentials: "include",
        // headers: { "Content-type": "application/json",},
      })
      .catch((err) => {
        toast.error("There was an error. Kindly referesh the page.");
    });

  }

  const handleOnChange = (e) => {
    setBio(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file); // Read the selected file as data URL
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("inputImage").click();
  };

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <div className="editProfileWrapper">
      <div className="editProfileContainer">
        <div className="editProfileHeader">
          <h4 className="header">EDIT PROFILE</h4>
          <button className="closeBtn" onClick={() => closeEditProfile(false)}>
            <IoCloseSharp />
          </button>
        </div>
        <div className="editProfileForm">
          <div className="editProfilePrimary">
            <input
              id="inputImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="circular-container" onClick={handleCircularClick}>
              {isValidUrl(image) ? (
                <img
                  className=" editProfilePhoto profilePicture"
                  src={image}
                  alt="Selected Image"
                />
              ) : (
                <img
                  className=" editProfilePhoto profilePicture"
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                />
              )}
            </div>
            <button onClick={handleSubmit} type="submit" className="btn editBtn">
              Save Changes
            </button>
          </div>
          <div className="editProfileSecondary">
            <div className="inputSection">
              <label id="name">
                Pet's Name
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </label>
              <label id="breed">
                Breed
                <input
                  type="text"
                  name="breed"
                  value={breed}
                  onChange={(event) => {
                    setBreed(event.target.value);
                  }}
                />
              </label>
            </div>
            <label id="bio" className="inputSection">
              Bio
              <textarea
                type="text"
                name="bio"
                rows={2}
                value={bio}
                maxLength={100}
                onChange={handleOnChange}
              />
              <span className="textareaCount">{characterCount}/100</span>
            </label>
            <div className="inputSection">
              <label id="dob">
                DOB
                <input
                  type="date"
                  value={dob}
                  onFocus={(e) => (e.target.type = "date")}
                  onChange={(event) => {
                    setDob(event.target.value);
                  }}
                />
              </label>
              <label id="gender">
                Gender
                <select
                  name="gender"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                >
                  <option value="male" selected={gender === "Male"}>
                    Male
                  </option>
                  <option value="female" selected={gender === "Female"}>
                    Female
                  </option>
                </select>
              </label>
            </div>
            <label id="address" className="inputSection">
              Address
              <input
                type="text"
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
