import React from "react";
import { useAdminContext } from "../../context/AdminContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { token, getDashData, dashData } = useAdminContext();

  useEffect(() => {
    if (token) {
      getDashData();
    }
  }, [token]);

  // Icons (you can replace with better SVGs or from Heroicons)
  const DoctorIcon = () => (
    <svg
      className="w-8 h-8 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14v7m-4-4h8M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2h-4.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 3H5a2 2 0 00-2 2v13a2 2 0 002 2z"
      />
    </svg>
  );

  const PatientIcon = () => (
    <svg
      className="w-8 h-8 text-green-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2 6H7a4 4 0 00-4 4v1h18v-1a4 4 0 00-4-4z"
      />
    </svg>
  );

  const AppointmentIcon = () => (
    <svg
      className="w-8 h-8 text-purple-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  if (dashData.length === 0) {
    return (
      <div className="w-full bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>
      </div>
    );
  }

  return (
    dashData && (
      <div className="w-full bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <DoctorIcon />
            <div>
              <h2 className="text-gray-600 text-sm">Doctors</h2>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.totalDoctors}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <PatientIcon />
            <div>
              <h2 className="text-gray-600 text-sm">Patients</h2>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.totalUsers}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
            <AppointmentIcon />
            <div>
              <h2 className="text-gray-600 text-sm">Appointments</h2>
              <p className="text-2xl font-bold text-gray-800">
                {dashData.totalAppointments}
              </p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white shadow rounded-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Patient</th>
                <th className="px-6 py-4 text-left">Doctor</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Time</th>
                <th className="px-6 py-4 text-left">Payment</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashData?.latestAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={appt.userData?.image}
                        alt="patient"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="font-medium text-gray-700">
                        {appt.userData?.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center gap-3">
                      <img
                        src={appt.docData?.image}
                        alt="doctor"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="font-medium text-gray-700">
                        {appt.docData?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{appt.date}</td>
                  <td className="px-6 py-4 text-gray-600">{appt.time}</td>
                  <td className="px-6 py-4">
                    {appt.payment ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Not Paid
                      </span>
                    )}
                  </td>
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
    )
  );
};

export default Dashboard;
