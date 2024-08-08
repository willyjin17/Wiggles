import React from "react";
import Message from "../components/Message";
import "../styles/message.css";
import { useParams } from "react-router-dom";

export default function ProfileCard() {
  const { id } = useParams();
  return (
    <div className="profileCardWindow">
      <Message userID={id} />
    </div>
  );
}
