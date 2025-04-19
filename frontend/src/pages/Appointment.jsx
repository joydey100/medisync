import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Appointment = () => {
  const { id } = useParams();
  const { doctors } = useAppContext();
  const [docInfo, setDocInfo] = useState({});

  const fetchDoctor = () => {
    const findDoc = doctors.find((doc) => doc._id === id);
    setDocInfo(findDoc);
  };

  return <section></section>;
};

export default Appointment;
