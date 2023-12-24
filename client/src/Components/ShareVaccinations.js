import React, { useState } from 'react';
import '../CSS/Vaccination.css';
import { BsSave, BsWhatsapp } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import html2canvas from 'html2canvas';
import {jsPDF }from 'jspdf';

const Share=({show, print, setPrint, userID})=>{
    const[copyText, setCopyText]=useState("Copy link")
    const website=document.location.href;
    const domain = website.split("/");
    const url=`${domain[0]}//${domain[2]}/verify/vaccination/${userID}`;

    const handleCopyLink=()=>{
        navigator.clipboard.writeText(url);
        setCopyText("Copied");
        setTimeout(() => {
          setCopyText("Copy link");
        }, 2000);
    }

    const handleSave=async()=>{
        await setPrint(1);
        const card=document.querySelector('.vaccinationWrapper');

        html2canvas(card, {scale:"3"}).then((canvas)=>{
            const data = canvas.toDataURL('img/png');
            const doc = new jsPDF('p','px');
            const docWidth= doc.internal.pageSize.getWidth();
            const docHeight= doc.internal.pageSize.getHeight();
            doc.addImage(data, 'PNG', 0, 0, docWidth, docHeight);
            doc.save('Pet Health Card.pdf');
        })
        setPrint(0);
    }

    return(
        <div className='sharePannel' style={{display: (show && !print) ? "flex":"none"}}>
            <button type='button' title="Copy" onClick={handleCopyLink}>
                <div>
                    <MdContentCopy/> &nbsp; {copyText}
                </div>
            </button>
            <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=${"Hey, Check out my dog's vaccinations:"} ${document.location.href + "/" +userID}`}>
                <div> 
                    <BsWhatsapp/> &nbsp; Share
                </div>
            </a>
            <button type='button' onClick={handleSave}>
                <div> 
                    <BsSave/> &nbsp; Save as pdf
                </div>
            </button>
        </div>
    )
}

export default Share;