import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/login.css";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { postData } from "../utils/api";

const SecondaryRegister = ({
  phone,
  email,
  password,
  petName,
  setPetName,
  dob,
  setDob,
  gender,
  setGender,
  breed,
  setBreed,
  vaccinated,
  setVaccinated,
  image,
  setImage,
  bio,
  setBio,
  setShowPrimary,
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();

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

  const colorStyles = {
    control: (styles, { isFocused, isHovered }) => ({
      ...styles,
      color: "black",
      borderRadius: 10,
      fontSize: 13,
      borderColor: isFocused ? "transparent" : styles.borderColor,
      boxShadow: "none",
      "&:hover": {
        borderColor: isHovered ? "transparent" : styles.borderColor,
      },
    }),
    input: (styles) => ({
      ...styles,
      color: "black",
      input: "50px 0",
    }),
    placeholder: (styles, { isFocused, hasValue }) => ({
      ...styles,
      color:
        hasValue || isFocused ? "black" : breed === null ? "gray" : "black",
    }),
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (petName === "") {
      toast.error("Please mention your pet's name");
      return;
    }
    if (dob === "") {
      toast.error("Please mention your pet's data of birth");
      return;
    }
    if (breed === null) {
      toast.error("Please mention your pet's breed");
      return;
    }
    if (gender === "") {
      toast.error("Please select your pet's gender");
      return;
    }
    if (vaccinated === "") {
      toast.error("Please select if your pet is vaccinated");
      return;
    }
    if (bio === "") {
      toast.error("Please write a bio for your pet's profile");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", petName);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("vaccinated", vaccinated === "yes");
      formData.append("image", image); // Append the image file to the FormData
      formData.append("bio", bio);

      const response = await postData("register", formData);

      if (response.status === 200) {
        toast.success("Registration Successful!");
        navigate("/profile");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("inputImage").click();
  };

  return (
    <>
      <div className="secondaryRegisterContainer">
        <form className="secondaryRegisterationForm" onSubmit={handleSubmit}>
          <div className="secondaryRegisterationInputs">
            <div className="dogInfoLeft">
              <input
                className="inputTabs"
                type="text"
                placeholder="Pet's Name"
                value={petName}
                onChange={(event) => {
                  setPetName(event.target.value);
                }}
              />
              <input
                className="inputTabs"
                type="text"
                placeholder="Date of Birth"
                value={dob}
                max={currentDate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(event) => {
                  setDob(event.target.value);
                }}
              />
              <div className="dropdownBox">
                <div>
                  <CreatableSelect
                    className="dropdown"
                    options={breedOptions}
                    placeholder={breed ? breed : "Breed"}
                    value={breed}
                    onChange={(selected) => {
                      setBreed(selected ? selected.value : null);
                    }}
                    styles={colorStyles}
                    isSearchable
                    isClearable
                  />
                </div>
              </div>
              <div className="dropdownBox">
                <Select
                  className="dropdown"
                  name="gender"
                  onChange={(selected) => {
                    setGender(selected ? selected.value : null);
                  }}
                  value={gender}
                  styles={colorStyles}
                  placeholder={gender ? gender : "Gender"}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                />
              </div>
              <div className="dropdownBox">
                <Select
                  className="dropdown"
                  name="vaccination"
                  onChange={(selected) => {
                    setVaccinated(selected ? selected.value : null);
                  }}
                  value={vaccinated}
                  styles={colorStyles}
                  placeholder={vaccinated ? vaccinated : "Vaccinated"}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
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
                <div
                  className="circularContainer"
                  onClick={handleCircularClick}
                >
                  {image ? (
                    <img
                      className="profilePicture"
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      loading="lazy"
                    />
                  ) : (
                    <PiDogFill className="profileIcon" />
                  )}
                </div>
              </div>

              <span className="textSection">
                <textarea
                  id="Bio"
                  name="Message"
                  value={bio}
                  maxLength={100}
                  placeholder="Enter your bio (max 100 characters)"
                  rows="2"
                  onChange={handleOnChange}
                >
                  {bio}
                </textarea>
                <span className="textareaCount">{characterCount}/100</span>
              </span>
            </div>
          </div>

          <div className="secondaryBtnContainer">
            <div
              className="btn btnBack"
              onClick={() => {
                setShowPrimary(true);
              }}
            >
              &lt; Back
            </div>
            <button type="submit" className="btn btnNext">
              Register &gt;
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SecondaryRegister;
