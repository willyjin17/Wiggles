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
        method:"GET",
        credentials:"include",
      })
      .catch((err)=>{
        console.log(err);
      })
      let data= await response.json();
          
      if(data.status==="ok"){
        setAuthorized(true);
      }
      else{
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
        <AboutCreatorsCard creatorName="Devansh Sahni" creatorPhoto={devansh} github="https://github.com/DevanshSahni" linkedin="https://www.linkedin.com/in/devansh-sahni/" mail="devanshsahni@gmail.com"/>
        <AboutCreatorsCard creatorName="Anushaka" creatorPhoto={anushaka} github="https://github.com/reach-anu" linkedin="https://www.linkedin.com/in/anushaka-rajput-0036b322b/" mail="reachanuuu@gmail.com"/>
        <AboutCreatorsCard creatorName="Anurag Wadhwa" creatorPhoto={anurag} github="https://github.com/anu0108" linkedin="https://www.linkedin.com/in/anurag-wadhwa-8148621b7/" mail="anuragwadhwa786@gmail.com"/>
        <AboutCreatorsCard creatorName="Deepa Jha" creatorPhoto={deepa} github="https://github.com/Deepajha14" linkedin="https://www.linkedin.com/in/deepajha14/" mail="deepadj1415@gmail.com"/>
        </div>
    </div>
    </>
  )
}


const AboutCreatorsCard = ({creatorName,creatorPhoto,github,linkedin, mail}) => {
  const description={
    "Devansh Sahni": <p> Hi, I am a MERN stack web developer and a final year CSE undergrad. I love to create original projects with beautiful designs that impact lives. Wiggles is an idea that is really close to my heart, and we will consider ourselves lucky and successful if we can even affect one pet parent's life. <br/> Feel free to connect with me anytime. Cheers!!! </p>,
    "Anushaka": <p>Hi there, I'm the frontend developer of team Wiggles. Combining my love for canines with technical expertise, I've crafted an engaging digital experience. Through Wiggles we aim on creating a community where dog lovers can connect and share their affection. If you're interested in joining this journey or have any questions, please feel free to contact me. Thanks for being part of our vibrant community, celebrating the cherished bond between humans and their furry companions.</p>, 
    "Anurag Wadhwa":<p>I'm a final-year B.Tech student majoring in Computer Science Engineering, specializing in MERN stack development. With a passion for crafting seamless web applications on both the front end with React and the back end, I've created several projects showcasing my proficiency in building robust server-side solutions. Additionally, I've had the opportunity to work on Wiggles, contributing to both front-end and backend development. I've also gained practical experience as a front-end developer intern at Bharat Heavy Electricals Limited (BHEL) in New Delhi.</p>, 
    "Deepa Jha":<p>Hey there, I'm Deepa Jha, a final-year B. Tech student known for crafting visually captivating, user-centric websites. While I specialize in frontend development, I'm also delving into backend technologies. As a co-creator of Wiggles, my deep affection for pets has driven this tech-infused project. I invite you to star the repository and share your valuable suggestions. If you share my enthusiasm for exciting projects and have a soft spot for Wiggles, I'd love to collaborate! Feel free to reach out!</p>
  }
  const resume={
    "Devansh Sahni": "https://portfolio-devanshsahni.vercel.app/Resume", 
    "Anushaka": "https://anushaka.netlify.app", 
    "Anurag Wadhwa": "https://drive.google.com/file/d/1e1YRJOXZ3he99479JcaeUcyizTcd3CeC/view?usp=sharing", 
    "Deepa Jha": "https://deepajha.netlify.app " 
  }

  return (
    <div className='creatorsCardContainer'>
      <div className='creatorsCardPrimary'>
        <div>
          <h1>{creatorName}</h1>
          <IconContext.Provider value={{className:"creatorIcons"}}>
          <a href={github} target="_blank"><AiFillGithub/></a>
          <a href={linkedin} target="_blank"><AiFillLinkedin /></a>
          <a href={`mailto:${mail}`} target="_blank"><AiFillMail /></a>
          <a href={resume[creatorName]} target="_blank"><IoDocumentTextSharp /></a>
          </IconContext.Provider>
        </div>
        <img src={creatorPhoto} alt="creator-avatar" loading='lazy'/> 
      </div> 
      {description[creatorName]}
    </div>
  )
}

export default AboutCreators