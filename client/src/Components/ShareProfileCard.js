import React, { useState } from 'react';
import '../CSS/QRGenerator.css';
import { BsWhatsapp, BsTwitter, BsFacebook } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { TiTick } from "react-icons/ti";

const Share=({userID})=>{
    const website=document.location.href;
    const domain = website.split("/");
    const url=`${domain[0]}//${domain[2]}/verify/generateqr/${userID}`;
    const [copy, setCopy] = useState(false);

    const handleCopyLink=()=>{
        setCopy(true);
        navigator.clipboard.writeText(url);
        setTimeout(() => {
            setCopy(false);
        }, 1000);

    }

    return(
        <div className='shareProfileCardPannel' >
            <button type='button' title="Copy" onClick={handleCopyLink}>
                <div>
                    { copy ? <TiTick className="shareProfileCardTickIcon"/> : <MdContentCopy/> }
                </div>
            </button>
            <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=${"Hey, Check out my dog's account on Wiggles: "} ${url}`}>
                <div> 
                    <BsWhatsapp/>
                </div>
            </a>
            <a target="_blank" rel="noreferrer" href={`https://twitter.com/share?url=${url}&text=[post-title]&via=[via]&hashtags=[hashtags]`}>
                <div> 
                    <BsTwitter/>
                </div>
            </a>
            <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup`}>
                <div> 
                    <BsFacebook/>
                </div>
            </a>
            
        </div>
    )
}

export default Share;