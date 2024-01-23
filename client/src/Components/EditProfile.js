import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatableSelect from "react-select/creatable";
import { PiDogFill } from "react-icons/pi";

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
  editImage,
}) {
  const [characterCount, setCharacterCount] = useState(0);
  const [focus, setFocus] = useState(false);
  const [image, setImage] = useState(editImage);
  const currentDate = new Date().toISOString().split("T")[0];
  const breedOptions = [
    { value: "Labrador", label: "Labrador" },
    { value: "Beagle", label: "Beagle" },
    { value: "Pomeranian", label: "Pomeranian" },
    { value: "Indian Pariah", label: "Indian Pariah" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "Pug", label: "Pug" },
    { value: "Indian Spitz", label: "Indian Spitz" },
    { value: "Shih Tzu", label: "Shih Tzu" },
    { value: "Siberian Husky", label: "Siberian Husky" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Cocker Spaniel", label: "Cocker Spaniel" },
    { value: "Bull Dog", label: "Bull Dog" },
    { value: "German Shepherd", label: "German Shepherd" },
    { value: "Great Dane", label: "Great Dane" },
    { value: "Rottweiler", label: "Rottweiler" },
    { value: "Boxer", label: "Boxer" },
    { value: "Dalmatian", label: "Dalmatian" },
    { value: "Doberman", label: "Doberman" },
    { value: "Pitbull", label: "Pitbull" },
    { value: "Lhasa Apso", label: "Lhasa Apso" },
    { value: "Pembroke Welsh Corgi", label: "Pembroke Welsh Corgi" },
    { value: "Australian Shepherd", label: "Australian Shepherd" },
    { value: "Yorkshire Terrier", label: "Yorkshire Terrier" },
  ];
  const handleBreedChange = (selectedOption) => {
    setBreed(selectedOption ? selectedOption.value : "");
    setFocus(false);
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      border: "1px solid #a6a7acd4",
      color: "black",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #a6a7acd4",
      },
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("breed", breed);
    formData.append("image", image); // Append the image file to the FormData
    formData.append("bio", bio);
    formData.append("address", address);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/updateProfile`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    ).catch((err) => {
      toast.error("There was an error. Kindly referesh the page.");
    });

    if (response.status === 200) {
      closeEditProfile(false);
      toast.success("Changes saved successfully")
    }
  };

  const handleOnChange = (e) => {
    setBio(e.target.value);
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", (e) => {
      textarea.style.height = "auto";
      var scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
    setCharacterCount(e.target.value.length);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state
    event.target.value = "";
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
      <form className="editProfileContainer" onSubmit={handleSubmit}>
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
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
            <AiOutlineEdit
              onClick={handleCircularClick}
              className="editImageIcon"
            />
            <div className="circular-container" onClick={handleCircularClick}>
              {image ? (
                <img
                  className=" editProfilePhoto profilePicture"
                  src={isValidUrl(image) ? image : URL.createObjectURL(image)}
                  alt="Selected"
                />
              ) : (
                <PiDogFill className="editProfilePhoto profileIcon" />
              )}
            </div>
            <div
              className="removeProfilePhoto"
              onClick={() => {
                setImage(null);
              }}
            >
              Remove Photo
            </div>
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
                  required
                />
              </label>
              <label id="breed">
                Breed
                <CreatableSelect
                  className="breedDropdown"
                  options={breedOptions}
                  placeholder={focus ? "" : breed}
                  value={breed}
                  onChange={handleBreedChange}
                  styles={colorStyles}
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    setFocus(false);
                  }}
                  isSearchable
                  isClearable
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
                required
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
                  max={currentDate}
                  required
                />
              </label>
              <label id="gender">
                Gender
                <select
                  name="gender"
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                  value={gender}
                >
                  <option value="Male">
                    Male
                  </option>
                  <option value="Female">
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

        <button type="submit" className="btn editBtn">
          Save Changes
        </button>
      </form>
    </div>
  );
}
