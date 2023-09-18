import React, {useEffect, useState} from 'react'
import Navbar from "../Components/Navbar"
import "../CSS/AboutCreators.css"
import devansh from "../images/devansh.png"
import anurag from "../images/anurag.png"
import anushaka from "../images/anushaka.png"
import deepa from "../images/deepa.png"
import {AiFillGithub, AiFillLinkedin, AiFillMail} from "react-icons/ai"
import {IoDocumentTextSharp} from "react-icons/io5"
import { IconContext } from 'react-icons/lib'

const AboutCreators = () => {
    const [authorized,setAuthorized] = useState(false);
    useEffect(()=>{
        const fetchData = async () =>{
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/`,{
            method:"POST",
            credentials:"include",
            headers: {
              'Content-type': 'application/json',
          },
            
          })
          .catch((err)=>{
            console.log(err);
            // alert("There was an error. Kindly referesh the page.")
            console.log("no resp")
          })
          let data= await response.json();
              
          if(data.status==="ok")
          {
            setAuthorized(true);
          }
          else{
            // alert("Kindly login first.");
            setAuthorized(false);
          }      
        }
        fetchData()
      }, [])
  return (
    <>
    {authorized ?  <Navbar/>: <></>}
    <div className='creatorsContainer'>
        <h1 className='creatorsContainerHeading'>Creators</h1>
        <div className='verticalLine'></div>
        <div className='creatorsCardWrapper'>
        <AboutCreatorsCard creatorName="Devansh Sahni" creatorPhoto={devansh} github="https://github.com/DevanshSahni" linkedin="https://www.linkedin.com/in/devansh-sahni/"/>
        <AboutCreatorsCard creatorName="Anushaka" creatorPhoto={anushaka} github="https://github.com/reach-anu" linkedin="https://www.linkedin.com/in/anushaka-rajput-0036b322b/"/>
        <AboutCreatorsCard creatorName="Anurag Wadhwa" creatorPhoto={anurag} github="https://github.com/anu0108" linkedin="https://www.linkedin.com/in/anurag-wadhwa-8148621b7/"/>
        <AboutCreatorsCard creatorName="Deepa Jha" creatorPhoto={deepa} github="https://github.com/Deepajha14" linkedin="https://www.linkedin.com/in/deepajha14/"/>
        </div>
    </div>
    </>
  )
}


const AboutCreatorsCard = ({creatorName,creatorPhoto,github,linkedin}) => {
    return (
        <div className='creatorsCardContainer'>
            <div className='creatorsCardPrimary'>
                <div>
                    <h1>{creatorName}</h1>
                    <IconContext.Provider value={{className:"creatorIcons"}}>
                    <a href={github} target="_blank"><AiFillGithub/></a>
                    <a href={linkedin} target="_blank"><AiFillLinkedin /></a>
                    <AiFillMail />
                    <IoDocumentTextSharp />
                    </IconContext.Provider>
                </div>
            <img src={creatorPhoto} /> 
            </div>
        <p>t of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.</p>
        </div>
    )
}


export default AboutCreators