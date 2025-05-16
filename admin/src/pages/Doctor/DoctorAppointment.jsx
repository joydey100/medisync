import React, { useEffect } from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { Check, X } from "lucide-react";

const DoctorAppointment = () => {
  const {
    docToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useDoctorContext();

  useEffect(() => {
    if (docToken) {
      getAppointments();
    }
  }, [docToken]);

  return (
    <div className="p-4 w-full">
      <h1 className="text-2xl font-bold mb-4">Doctor Appointments</h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-center text-sm font-semibold text-gray-700 ">
            <tr>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-t border-gray-200 hover:bg-gray-50 text-center"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={appointment.userData.image}
                    alt={appointment.userData.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">
                    {appointment.userData.fullName}
                  </span>
                </td>
                <td className="px-4 py-3">{appointment.userData.age}</td>
                <td className="px-4 py-3">{appointment.date}</td>
                <td className="px-4 py-3">{appointment.time}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                      appointment.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-red-700"
                    }`}
                  >
                    {appointment.payment ? "Paid" : "Cash"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {appointment.cancelled ? (
                    <span className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-red-100 text-red-700">
                      Cancelled
                    </span>
                  ) : appointment.isCompleted ? (
                    <span className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                      Completed
                    </span>
                  ) : (
                    <div className="flex items-center  gap-3 justify-center">
                      <div className="p-2 bg-green-100 rounded-full cursor-pointer">
                        <Check
                          onClick={() => completeAppointment(appointment._id)}
                          className="size-5 text-green-700"
                        />
                      </div>
                      <div className="p-2 cursor-pointer bg-red-100 rounded-full">
                        <X
                          onClick={() => cancelAppointment(appointment._id)}
                          className="size-5 text-red-700"
                        />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 ">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={appointment.userData.image}
                alt={appointment.userData.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">
                  {appointment.userData.fullName}
                </h2>
                <p className="text-sm text-gray-600">
                  Age: {appointment.userData.age}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    appointment.payment
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {appointment.payment ? "Paid" : "Cash"}
                </span>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm  text-gray-700">Action: </span>
              {appointment.cancelled ? (
                <span className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-red-100 text-red-700">
                  Cancelled
                </span>
              ) : appointment.isCompleted ? (
                <span className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-700">
                  Completed
                </span>
              ) : (
                <div className="flex items-center  gap-3 justify-center">
                  <div className="p-2 bg-green-100 rounded-full cursor-pointer">
                    <Check
                      onClick={() => completeAppointment(appointment._id)}
                      className="size-5 text-green-700"
                    />
                  </div>
                  <div className="p-2 cursor-pointer bg-red-100 rounded-full">
                    <X
                      onClick={() => cancelAppointment(appointment._id)}
                      className="size-5 text-red-700"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
