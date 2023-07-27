import { useState } from "react";

const DogInformation = () => {
  return (
    <div className="dogInfo">
      <div className="dogInfoTabs">
        <InfoTabs />
        <div className="dogInfoBackNext">
          <button className="">Back</button>
          <button className="">Next</button>
        </div>
      </div>
      <div className="dogInfoProfile">
        {/* <p></p>  */}
        {/* <input type="file" /> */}
        <ProfPic />
      </div>
    </div>
  );
};

export default DogInformation;

const InfoTabs = () => {
  const [petName, setPetName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [playdates, setPlaydates] = useState("");
  
  return (
    <form className="InfoTabs">
      <input
        type="text"
        placeholder="Pet's Name"
        value={petName}
        onChange={(event) => setPetName(event.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(event) => setDob(event.target.value)}
      />
      <input
        type="text"
        placeholder="Breed"
        value={breed}
        onChange={(event) => setBreed(event.target.value)}
      />

      <div className="radio1">
        Gender
        <input type="radio" id="male" name="gender" value="male" /> {" "}
        <label for="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" /> {" "}
        <label for="male">Female</label>
        <br />
      </div>

      <div className="radio2  ">
        Open for Playdates?
        <input type="radio" id="yes" name="playdate" value="yes" /> {" "}
        <label for="yes">Yes</label>
        <br />
        <input type="radio" id="no" name="playdate" value="no" /> {" "}
        <label for="no">No</label>
        <br />
      </div>
    </form>
  );
};

const ProfPic = () => {
  return(
    <form className="ProfPic">
    <label>
      +
      <input type="file" />
    </label>
  </form>
  )
  
};

