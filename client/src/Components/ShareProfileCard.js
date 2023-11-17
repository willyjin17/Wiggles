import React from 'react';
import '../CSS/QRGenerator.css';
import { BsWhatsapp, BsTwitter, BsFacebook } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';

const Share=({userID})=>{
    const url=document.location.href + "/" +userID;

    const handleCopyLink=()=>{
        navigator.clipboard.writeText(url);
    }

    return(
        <div className='sharePannel' >
            <button type='button' title="Copy" onClick={handleCopyLink}>
                <div>
                    <MdContentCopy/>
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