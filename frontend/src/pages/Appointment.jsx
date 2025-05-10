import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Info } from "lucide-react";
import getAvailableDates from "../utils/getAvailableDates";
import AppointmentPicker from "../components/AppointmentPicker";
import { toast } from "react-toastify";
import axios from "axios";


const Appointment = () => {
  const { id } = useParams();
  const {
    doctors,
    setSelectedDate,
    setSelectedTime,
    userToken,
    selectedDate,
    fetchDoctors,
    selectedTime,
    userData,
  } = useAppContext();
  const [docInfo, setDocInfo] = useState({});
  const relatedDoctors = doctors.filter(
    (doc) => doc.speciality === docInfo.speciality && doc._id !== id
  );

  const navigate = useNavigate();


  const fetchDoctor = async () => {
    const findDoc = doctors.find((doc) => doc._id === id);
    setDocInfo(findDoc);

    // 🔥 Reset selectedDate and selectedTime when doctor changes
    setSelectedDate(null);
    setSelectedTime("");
  };

  useEffect(() => {
    if (doctors.length > 0 && id) {
      fetchDoctor();
    }
  }, [doctors, id]);

  useEffect(() => {
    if (docInfo?.availability?.days) {
      const availableDates = getAvailableDates(docInfo.availability.days);
    }
  }, [docInfo?.availability?.days]);

  const bookAppointment = async (e) => {
    try {
      if (!selectedDate) {
        return toast.error("Please select a date.");
      }

      if (!selectedTime) {
        return toast.error("Please select a time.");
      }

      console.log(userToken);

      if (!userToken) {
        toast.warn("Please login to book an appointment.");
        return navigate("/login");
      }

      // create a new  date

      const dateObj = new Date(selectedDate);

      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();

      const formattedDate = `${day}-${month}-${year}`;


      // make api call
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/book-appointment`,
        {
          userId: userData._id,
          docId: id,
          date: formattedDate,
          time: selectedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchDoctors();
        console.log(data);
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="mt-15">
      <div className="flex flex-col md:flex-row gap-4">
        {/* left side */}
        <div className="md:basis-[30%] mb-4 md:mb-0">
          <img
            src={docInfo?.image || "https://via.placeholder.com/300x300"}
            alt={docInfo?.name}
            className="w-full bg-slate-200"
          />
        </div>
        {/* right side  */}
        <div className="md:basis-[70%] ">
          <div className="doc-info border border-slate-400 p-6 rounded-lg mb-5">
            <h2 className="text-2xl font-bold text-primary/80 mb-2">
              {docInfo.name}
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-base">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <p className="text-sm px-5 py-2 border rounded-full">
                {docInfo.experience}
              </p>
            </div>
            <div className="about flex items-center gap-2 mb-3">
              <h4 className="text-xl font-medium ">About</h4>
              <Info className="size-5" />
            </div>
            <p className="text-lg leading-7 text-gray-600">{docInfo.about}</p>
            <div className="mt-4">
              <h4 className="text-xl font-medium">
                Appointment Fee:
                <span className="font-bold"> ${docInfo.fees}</span>
              </h4>
            </div>
          </div>
          <div className="booking-slot">
            <div className="date-container"></div>
            <div className="time-container"></div>
            <button>Book Appointment</button>
            <AppointmentPicker docInfo={docInfo} />
            <button
              onClick={bookAppointment}
              className="bg-primary/80 text-white text-lg font-medium py-3 px-8 rounded-full mt-7 cursor-pointer"
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>

      {relatedDoctors.length > 0 && (
        <div className="related-doctors mt-15">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Related Doctors
          </h2>
          <p className="text-center text-base font-medium text-gray-600">
            {" "}
            Simply browse through our extensive list of trusted doctors.
          </p>
          <div className="related-doctor-list mt-8 flex gap-4">
            {docInfo &&
              relatedDoctors.map((doc) => (
                <div
                  className="doc-card basis-full md:basis-[20%] p-5 shadow-md cursor-pointer"
                  key={doc._id}
                  to={`/appointment/${doc._id}`}
                  onClick={() =>
                    navigate(`/appointment/${doc._id}`, scrollTo(0, 0))
                  }
                >
                  <img src={doc.image} alt={doc.name} className="w-full" />
                  <h3 className="mt-4 mb-2 text-primary/80 font-bold text-lg">
                    {doc.name}
                  </h3>
                  <p className="text-base text-gray-600">{doc.speciality}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Appointment;
