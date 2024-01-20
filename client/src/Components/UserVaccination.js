import React, { useEffect, useState } from 'react'
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const Vaccination = () => {
    const {id}=useParams();
    const navigate = useNavigate();
    const[petName, setPetName]=useState("");
    const[breed, setBreed]=useState("");
    const[weight, setWeight]=useState("");
    const[allergies, setAllergies]=useState("");
    const[conditions, setConditions]=useState("");
    const[vetName, setVetName]=useState("");
    const[vetNumber, setVetNumber]=useState("");
    const[vetAddress, setVetAddress]=useState("");
    const[vaccinations, setVaccinations]=useState([]);


    useEffect(()=>{
        const handleContent=async()=>{
            let response;
            try{
                response= await fetch(`${process.env.REACT_APP_BASE_URL}/userdata`,{
                method:"POST",
                body: JSON.stringify({
                    userID: id,
                }),
                credentials:"include",
                headers:{
                    "Content-type": "application/json",
                }
            })}
            catch(err){
                toast.error("User Not Find");
                navigate("/verify/login");
                return;
            }

            if(!response.ok){
                toast.error("Please refresh");
                return;
            }
            const data= await response.json();

            setPetName(data.foundUser.name);
            setBreed(data.foundUser.breed);
            setWeight(data.foundUser.weight);
            setAllergies(data.foundUser.allergies);
            setConditions(data.foundUser.conditions);
            setVetName(data.foundUser.vetName);
            setVetNumber(data.foundUser.vetNumber);
            setVetAddress(data.foundUser.vetAddress);
            setVaccinations(data.foundUser.vaccinations);
        }
        handleContent();
    },[id]);



    return (
    <>
    <div className='vaccinationWrapper'>
        <div className='headerContainer'>
            <div className='logoInfoContainer'>
                <img src={Logo} alt="website logo" loading='lazy'></img>
                <h3>Wiggles</h3>
            </div>
            <h1>PET HEALTH RECORD</h1>
        </div>
        <div className='healthInfoWrapper'>
            <div className='HealthInfoContainer'>
                <h1>Pet's name: <span>{petName}</span>  </h1>
                <div className='dogHealthInfo'>
                    <h1>Breed: <span>{breed}</span> </h1>
                    <div className='dogWeight'>
                        <h1>Weight: <span>{weight}</span> </h1>
                        <h1>{(weight > 0)? "kg" : ""}</h1>
                    </div>
                    <h1>Allergies: <span>{allergies}</span> </h1>
                    <h1>Conditions: <span>{conditions}</span> </h1>
                </div>
            </div>
            <div className='HealthInfoContainer'>
                <h1  className='vetNameInfo'>Veterinarian:<h1 className='vetHonorific'>Dr.</h1> <span>{vetName}</span></h1>
                <div className='vetInfo'>
                    <h1>Phone no.: <span>{vetNumber}</span> </h1>
                    <h1>Address: <span>{vetAddress}</span> </h1>
                </div>
            </div>
            <div className='vaccinationContainer'>
                <div className='vaccinationInfoPrimary'>
                    <h1>Vaccinations</h1>
                </div>
                <table className='vaccinationTable'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Batch Number</th>
                        <th>Date</th>
                        <th>Next visit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vaccinations && 
                        vaccinations.map((vaccination)=>(
                            <tr key={vaccination._id}>
                                <td>{vaccination.name}</td>
                                <td>{vaccination.batchNumber}</td>
                                <td>{vaccination.date.slice(0,10)}</td>
                                <td>{vaccination.dueDate.slice(0,10)}</td>
                            </tr>
                        ))
                    }   
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
    )
}

export default Vaccination
