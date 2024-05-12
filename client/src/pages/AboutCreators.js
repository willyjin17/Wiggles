import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/aboutCreators.css";
import devansh from "../assets/images/devansh.png";
import anurag from "../assets/images/anurag.png";
import anushaka from "../assets/images/anushaka.png";
import deepa from "../assets/images/deepa.png";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { IoDocumentTextSharp } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { getData } from "../utils/api";

const AboutCreators = () => {
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData("");
        let data = response.data;

        if (data.status === "ok") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {authorized ? <Navbar /> : <></>}
      <div className="creatorsContainer">
        <h1 className="creatorsContainerHeading">Creators</h1>
        <div className="verticalLine"></div>
        <div className="creatorsCardWrapper">
          <AboutCreatorsCard
            creatorName="Devansh Sahni"
            creatorPhoto={devansh}
            github="https://github.com/DevanshSahni"
            linkedin="https://www.linkedin.com/in/devansh-sahni/"
            mail="devanshsahni@gmail.com"
          />
          <AboutCreatorsCard
            creatorName="Anushaka"
            creatorPhoto={anushaka}
            github="https://github.com/reach-anu"
            linkedin="https://www.linkedin.com/in/anushaka-rajput-0036b322b/"
            mail="reachanuuu@gmail.com"
          />
          <AboutCreatorsCard
            creatorName="Anurag Wadhwa"
            creatorPhoto={anurag}
            github="https://github.com/anu0108"
            linkedin="https://www.linkedin.com/in/anurag-wadhwa-8148621b7/"
            mail="anuragwadhwa786@gmail.com"
          />
          <AboutCreatorsCard
            creatorName="Deepa Jha"
            creatorPhoto={deepa}
            github="https://github.com/Deepajha14"
            linkedin="https://www.linkedin.com/in/deepajha14/"
            mail="deepadj1415@gmail.com"
          />
        </div>
      </div>
    </>
  );
};

const AboutCreatorsCard = ({
  creatorName,
  creatorPhoto,
  github,
  linkedin,
  mail,
}) => {
  const description = {
    "Devansh Sahni": (
      <p>
        {" "}
        Hi, I am a MERN stack web developer and a final year CSE undergrad. I
        love to create original projects with beautiful designs that impact
        lives. Wiggles is an idea that is really close to my heart, and we will
        consider ourselves lucky and successful if we can even affect one pet
        parent's life. <br /> Feel free to connect with me anytime. Cheers!!!{" "}
      </p>
    ),
    Anushaka: (
      <p>
        Hi there, I'm the frontend developer of team Wiggles. Combining my love
        for canines with technical expertise, I've crafted an engaging digital
        experience. Through Wiggles we aim on creating a community where dog
        lovers can connect and share their affection. If you're interested in
        joining this journey or have any questions, please feel free to contact
        me. Thanks for being part of our vibrant community, celebrating the
        cherished bond between humans and their furry companions.
      </p>
    ),
    "Anurag Wadhwa": (
      <p>
        Hey there! I'm a full-stack developer at Wiggles, passionate about
        crafting a fantastic platform for pets and their people. Our goal is to
        build a thriving community where pet lovers can connect and share their
        joy. Wiggles is close to my heart, and I'm thrilled to be a part of this
        journey. If you're interested in joining or have any questions, feel
        free to reach out. Thanks for celebrating the bond between humans and
        their beloved pets with us!
      </p>
    ),
    "Deepa Jha": (
      <p>
        Hey there, I'm Deepa Jha, a final-year B. Tech student known for
        crafting visually captivating, user-centric websites. While I specialize
        in frontend development, I'm also delving into backend technologies. As
        a co-creator of Wiggles, my deep affection for pets has driven this
        tech-infused project. I invite you to star the repository and share your
        valuable suggestions. If you share my enthusiasm for exciting projects
        and have a soft spot for Wiggles, I'd love to collaborate! Feel free to
        reach out!
      </p>
    ),
  };
  const resume = {
    "Devansh Sahni": "https://portfolio-devanshsahni.vercel.app/Resume",
    Anushaka: "https://anushaka.netlify.app",
    "Anurag Wadhwa": "https://anuragwadhwa.vercel.app/resume",
    "Deepa Jha": "https://deepajha.netlify.app ",
  };

  return (
    <div className="creatorsCardContainer">
      <div className="creatorsCardPrimary">
        <div>
          <h1>{creatorName}</h1>
          <IconContext.Provider value={{ className: "creatorIcons" }}>
            <a href={github} target="_blank">
              <AiFillGithub />
            </a>
            <a href={linkedin} target="_blank">
              <AiFillLinkedin />
            </a>
            <a href={`mailto:${mail}`} target="_blank">
              <AiFillMail />
            </a>
            <a href={resume[creatorName]} target="_blank">
              <IoDocumentTextSharp />
            </a>
          </IconContext.Provider>
        </div>
        <img src={creatorPhoto} alt="creator-avatar" loading="lazy" />
      </div>
      {description[creatorName]}
    </div>
  );
};

export default AboutCreators;
