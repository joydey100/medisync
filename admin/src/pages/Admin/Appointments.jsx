import { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

const Appointments = () => {
  const { appointments, getAllAppointments, token } = useAdminContext();

  useEffect(() => {
    if (token) {
      getAllAppointments();
    }
  }, [token]);



  return (
    <div className="w-full  px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        All Appointments
      </h1>
      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Payment</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appt, index) => (
              <tr key={appt._id} className="hover:bg-gray-50 transition">
                {/* Serial Number */}
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                  {index + 1}
                </td>

                {/* Patient (Image + Name) */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <img
                    src={appt.userData?.image}
                    alt="patient"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="text-gray-800 font-medium">
                    {appt.userData?.fullName}
                  </span>
                </td>

                {/* Age */}
                <td className="px-6 py-4 text-gray-600">
                  {appt.userData?.age}
                </td>

                {/* Date & Time */}
                <td className="px-6 py-4 text-gray-600">
                  {appt.date} <br />
                  <span className="text-xs text-gray-400">{appt.time}</span>
                </td>

                {/* Doctor (Image + Name) */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <img
                    src={appt.docData?.image}
                    alt="doctor"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="text-gray-800 font-medium">
                    {appt.docData?.name}
                  </span>
                </td>

                {/* Payment */}
                <td className="px-6 py-4 text-gray-600">
                  {appt.payment ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Not Paid</span>
                  )}
                </td>

                {/* Appointment Status */}
                <td className="px-6 py-4">
                  {appt.cancelled ? (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Cancelled
                    </span>
                  ) : appt.isCompleted ? (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
