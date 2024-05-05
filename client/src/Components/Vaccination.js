import React, { useEffect, useState } from "react";
import { VaccinationTableSkeleton } from "../Components/Skeleton/FriendsSkeleton";
import ShareVaccination from "./ShareVaccinations";
import "../CSS/Vaccination.css";
import Logo from "../images/wigglesLogo.png";
import { BsShareFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { VaccinationCardSkeleton } from "./Skeleton/FriendsSkeleton";

const Vaccination = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(0);
  const [print, setPrint] = useState(false);
  const [userID, setUserID] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [vetName, setVetName] = useState("");
  const [vetNumber, setVetNumber] = useState("");
  const [vetAddress, setVetAddress] = useState("");
  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visit, setVisit] = useState({
    name: "",
    batchNumber: null,
    date: null,
    dueDate: null,
  });
  const [inactive, setInactive] = useState(true);
  const [addVaccination, setAddVaccination] = useState(false);
  const [editbtn, setEditbtn] = useState("Edit");
  const [editIcon, setEditIcon] = useState("0");

  function onFocus(e) {
    e.currentTarget.type = "date";
  }
  function onBlur(e) {
    e.currentTarget.type = "text";
    e.currentTarget.placeholder = "Date";
  }
  useEffect(() => {
    document
      .querySelector(".vaccinationContainer")
      .addEventListener("click", (e) => e.stopPropagation());
    const handleContent = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/profiledata`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        toast.error("Kindly login first!");
        navigate("/verify/login");
        return;
      }

      if (!response.ok) {
        toast.error("Please refresh");
        return;
      }
      const data = await response.json();
      setLoading(false);
      setUserID(data.foundUser._id);
      setPetName(data.foundUser.name);
      setBreed(data.foundUser.breed);
      setWeight(data.foundUser.weight);
      setAllergies(data.foundUser.allergies);
      setConditions(data.foundUser.conditions);
      setVetName(data.foundUser.vetName);
      setVetNumber(data.foundUser.vetNumber);
      setVetAddress(data.foundUser.vetAddress);
      setVaccinations(data.foundUser.vaccinations);
    };
    handleContent();
  }, [addVaccination, userID]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (editbtn === "Edit") {
      setInactive(false);
      setEditbtn("Save");
      setEditIcon(!editIcon);
      return;
    }
    if (
      vetNumber &&
      vetNumber.toString() !== "" &&
      !vetNumber.toString().match(/^[0-9]{10}$/)
    ) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (weight <= 0) {
      toast.error("Please enter a valid weight");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(vetName) || vetName === "") {
      toast.error("Please enter a valid veterinarian name");
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/updateProfile`,
      {
        method: "POST",
        body: JSON.stringify({
          name: petName,
          breed,
          weight,
          allergies,
          conditions,
          vetName,
          vetNumber,
          vetAddress,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast.error("Please refresh");
      return;
    }

    toast.success("Successfully updated!");
    setInactive(true);
    setEditbtn("Edit");
    setEditIcon(!editIcon);
  };

  document.addEventListener("click", () => setAddVaccination(false));

  const getNextDay = (selectedDate) => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const handleAddVaccine = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addVaccination) {
      setAddVaccination(!addVaccination);
      return;
    }

    if (new Date(visit.dueDate) <= new Date(visit.date)) {
      toast.error("Next visit date should be after the vaccination date.");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/updateVaccinations`,
      {
        method: "POST",
        body: JSON.stringify({
          visit,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      toast.error("Please refresh");
      return;
    }

    toast.success("Successfully updated!");
    setAddVaccination(!addVaccination);
    setVisit({
      name: "",
      batchNumber: null,
      date: null,
      dueDate: null,
    });
  };

  return (
    <>
      <div className="vaccinationWrapper">
        <div
          className="shareIconContainer"
          onClick={() => (show ? setShow(0) : setShow(1))}
          style={{ opacity: print ? 0 : 1 }}
        >
          <BsShareFill />
        </div>
        <ShareVaccination
          show={show}
          print={print}
          setPrint={setPrint}
          userID={userID}
        />
        <div className="headerContainer">
          <div className="logoInfoContainer">
            <img src={Logo} alt="Website logo" loading="lazy"></img>
            <h3>Wiggles</h3>
          </div>
          <h1>PET HEALTH RECORD</h1>
        </div>
        <div className="healthInfoWrapper">
          <button
            id="vaccinationButton"
            className="editButton"
            onClick={handleEdit}
            style={{ opacity: print ? 0 : 1 }}
          >
            {" "}
            {editIcon ? (
              <AiOutlineEdit className="editIcon" />
            ) : (
              <AiOutlineSave className="editIcon" />
            )}
            &nbsp;{editbtn}
          </button>
          {loading && <VaccinationCardSkeleton />}
          {!loading && (
            <>
              <div className="HealthInfoContainer">
                <h1 id="vaccination-subheading">Pet's Details</h1>
                <h1>
                  Name: <span>{petName}</span>
                </h1>
                <div className="dogHealthInfo">
                  <h1>
                    Breed: <span>{breed}</span>
                  </h1>
                  <div className="dogWeight">
                    <h1>
                      Weight:
                      <input
                        id="weight"
                        disabled={inactive}
                        type="number"
                        value={weight ?? ""}
                        onChange={(e) => {
                          setWeight(e.target.value);
                        }}
                        placeholder=""
                      />
                    </h1>
                    <h1 className="dogWeightunit">{weight ? "kg" : ""}</h1>
                  </div>
                  <div>
                    <h1>
                      Allergies:
                      <input
                        disabled={inactive}
                        type="text"
                        value={allergies ?? ""}
                        onChange={(e) => {
                          setAllergies(e.target.value);
                        }}
                      />
                    </h1>
                  </div>
                  <div>
                    <h1>
                      Conditions:
                      <input
                        disabled={inactive}
                        type="text"
                        value={conditions ?? ""}
                        onChange={(e) => {
                          setConditions(e.target.value);
                        }}
                      />
                    </h1>
                  </div>
                </div>
              </div>
              <div className="HealthInfoContainer">
                <h1 id="vaccination-subheading">Veterinarian's Details</h1>
                <h1 className="vetNameInfo">
                  Name:
                  <h1 className="vetHonorific">{vetName ? "Dr." : ""}</h1>
                  <input
                    disabled={inactive}
                    type="text"
                    value={vetName ?? ""}
                    onChange={(e) => {
                      setVetName(e.target.value);
                    }}
                    className="vetName"
                  />
                </h1>
                <div className="vetInfo">
                  <h1>
                    Contact Number:
                    <input
                      disabled={inactive}
                      type="number"
                      value={vetNumber ?? ""}
                      maxLength={10}
                      onChange={(e) => {
                        setVetNumber(e.target.value);
                      }}
                    />
                  </h1>
                  <h1>
                    Location:
                    <input
                      disabled={inactive}
                      type="text"
                      value={vetAddress ?? ""}
                      onChange={(e) => {
                        setVetAddress(e.target.value);
                      }}
                    />
                  </h1>
                </div>
              </div>
            </>
          )}
          <div className="vaccinationContainer">
            <div className="vaccinationInfoPrimary">
              <h1 id="vaccination-subheading">Vaccinations</h1>
              <button
                id="vaccinationButton"
                form="vaccinationForm"
                style={{ opacity: print ? 0 : 1 }}
              >
                {addVaccination ? (
                  <AiOutlineSave className="addIcon" />
                ) : (
                  <AiOutlinePlus className="addIcon" />
                )}
                &nbsp;{addVaccination ? "Save" : "Add"}{" "}
              </button>
            </div>
            <form
              name="Vaccination Form"
              id="vaccinationForm"
              onSubmit={handleAddVaccine}
            ></form>
            <table className="vaccinationTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Batch Number</th>
                  <th>Date</th>
                  <th>Next visit</th>
                  {/* {!editIcon && <th className='deletedVaccination'>Action</th>} */}
                </tr>
              </thead>
              <tbody>
                {addVaccination && (
                  <tr className="addVaccinationForm">
                    <td>
                      <input
                        required
                        type="text"
                        placeholder="Name"
                        form="vaccinationForm"
                        value={visit.name ?? ""}
                        onChange={(e) =>
                          setVisit((visit) => ({
                            ...visit,
                            name: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        required
                        type="number"
                        placeholder="Batch no"
                        className="batch"
                        form="vaccinationForm"
                        value={visit.batchNumber ?? ""}
                        onChange={(e) =>
                          setVisit((visit) => ({
                            ...visit,
                            batchNumber: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        required
                        placeholder="Date"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        form="vaccinationForm"
                        value={visit.date ?? ""}
                        onChange={(e) =>
                          setVisit((visit) => ({
                            ...visit,
                            date: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        required
                        placeholder="Next Visit"
                        onFocus={onFocus}
                        onBlur={onBlur}
                        form="vaccinationForm"
                        value={visit.dueDate ?? ""}
                        // min={visit.date}
                        min={visit.date ? getNextDay(visit.date) : ""}
                        disabled={!visit.date}
                        onChange={(e) =>
                          setVisit((visit) => ({
                            ...visit,
                            dueDate: e.target.value,
                          }))
                        }
                      />
                    </td>
                  </tr>
                )}
                {vaccinations &&
                  vaccinations.map((vaccination) => (
                    <tr key={vaccination._id}>
                      <td>{vaccination.name}</td>
                      <td>{vaccination.batchNumber}</td>
                      <td>{vaccination.date.slice(0, 10)}</td>
                      <td>{vaccination.dueDate.slice(0, 10)}</td>
                      {/* {!editIcon && <td><AiFillDelete className='addIcon'/></td>} */}
                    </tr>
                  ))}
                {loading && (
                  <>
                    <VaccinationTableSkeleton />
                    <VaccinationTableSkeleton />
                    <VaccinationTableSkeleton />
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vaccination;
