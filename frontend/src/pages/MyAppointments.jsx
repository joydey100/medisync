import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

import { loadStripe } from "@stripe/stripe-js";

const MyAppointments = () => {
  const { appointments, userToken, getAppointments } = useAppContext();

  const [success, setSuccess] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (userToken) {
      getAppointments();
    }
  }, [userToken]);

  const slotDateFormat = (date) => {
    const dateArr = date.split("-");
    return `${dateArr[0]} ${months[Number(dateArr[1] - 1)]}, ${dateArr[2]}`;
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const payment = async (docData) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/payment`,
      docData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    console.log(result);
  };

  if (appointments.length === 0) {
    return (
      <section className="my-16">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold my-8 text-center">
            No Appointments
          </h2>
        </div>
      </section>
    );
  }

  return (
    appointments && (
      <section className="my-16">
        <h2 className="text-2xl font-bold my-8">My Appointments</h2>
        <div className="flex flex-col gap-5">
          {appointments.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row md:justify-between my-4 md:items-center shadow-lg rounded-lg p-8"
              >
                <div className="flex flex-col md:flex-row wrap">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="md:size-40 sm:size-80 block sm:mx-auto md:mx-0"
                  />
                  <div className="p-4  mt-5 md:mt-0">
                    <h4 className="font-semibold text-xl mb-3 text-primary/80">
                      {item.docData.name}{" "}
                    </h4>
                    <p className="text-gray-500 text-base mb-3">
                      {item.docData.speciality}
                    </p>
                    <p className="font-medium text-base">
                      Date & time: {slotDateFormat(item.date)} | {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mt-5 md:mt-0">
                  {!item.cancelled && (
                    <>
                      <button
                        className="bg-primary py-3 px-8 text-white rounded-full text-base font-medium cursor-pointer"
                        onClick={() => payment(item.docData)}
                      >
                        Pay Online
                      </button>
                    </>
                  )}
                  {!item.cancelled && (
                    <button
                      className="py-3 px-8 text-gray-700 bg-slate-100 rounded-full text-base font-medium cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-200 "
                      onClick={() => cancelAppointment(item._id)}
                    >
                      Cancel Payment
                    </button>
                  )}

                  {item.cancelled && (
                    <button className="border-2 py-3 px-8  rounded-full text-sm font-medium text-red-500 border-red-500">
                      Appointment Cancelled
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
};

export default MyAppointments;
