import React, { useEffect, useState } from "react";
import "../styles/vaccination.css";
import Logo from "../assets/images/wigglesLogo.png";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../utils/api";

const Vaccination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");
  const [vetName, setVetName] = useState("");
  const [vetNumber, setVetNumber] = useState("");
  const [vetAddress, setVetAddress] = useState("");
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    const handleContent = async () => {
      try {
        const response = await postData("userdata", {
          userID: id,
        });
        if (response.status != 200) {
          toast.error("Please refresh");
          return;
        }
        let data = response.data;

        setPetName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setWeight(data.foundUser.weight);
        setAllergies(data.foundUser.allergies);
        setConditions(data.foundUser.conditions);
        setVetName(data.foundUser.vetName);
        setVetNumber(data.foundUser.vetNumber);
        setVetAddress(data.foundUser.vetAddress);
        setVaccinations(data.foundUser.vaccinations);
      } catch (err) {
        toast.error("User Not Found");
        navigate("/login");
        return;
      }
    };
    handleContent();
  }, [id]);

  return (
    <>
      <div className="vaccinationWrapper">
        <div className="headerContainer">
          <div className="logoInfoContainer">
            <img src={Logo} alt="website logo" loading="lazy"></img>
            <h3>Wiggles</h3>
          </div>
          <h1>PET HEALTH RECORD</h1>
        </div>
        <div className="healthInfoWrapper">
          <div className="healthInfoContainer">
            <h1>
              Pet's name: <span>{petName}</span>{" "}
            </h1>
            <div className="dogHealthInfo">
              <h1>
                Breed: <span>{breed}</span>{" "}
              </h1>
              <div className="dogWeight">
                <h1>
                  Weight: <span>{weight}</span>{" "}
                </h1>
                <h1>{weight > 0 ? "kg" : ""}</h1>
              </div>
              <h1>
                Allergies: <span>{allergies}</span>{" "}
              </h1>
              <h1>
                Conditions: <span>{conditions}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="healthInfoContainer">
            <h1 className="vetNameInfo">
              Veterinarian:
              {vetName && (
                <>
                  <h1 className="vetHonorific">Dr.</h1> <span>{vetName}</span>
                </>
              )}
            </h1>
            <div className="vetInfo">
              <h1>
                Phone no.: <span>{vetNumber}</span>{" "}
              </h1>
              <h1>
                Address: <span>{vetAddress}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="vaccinationContainer">
            <div className="vaccinationInfoPrimary">
              <h1>Vaccinations</h1>
            </div>
            <table className="vaccinationTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Batch Number</th>
                  <th>Date</th>
                  <th>Next visit</th>
                </tr>
              </thead>
              <tbody>
                {vaccinations?.length ? (
                  vaccinations.map((vaccination) => (
                    <tr key={vaccination?._id}>
                      <td>{vaccination?.name}</td>
                      <td>
                        {vaccination?.batchNumber
                          ? vaccination?.batchNumber
                          : "-"}
                      </td>
                      <td>{vaccination?.date.slice(0, 10)}</td>
                      <td>{vaccination?.dueDate.slice(0, 10)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No vaccination records added </td>
                  </tr>
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
