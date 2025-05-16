import React from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

const DoctorDashboard = () => {
  const { dashData, getDoctorDashboard } = useDoctorContext();

  useEffect(() => {
    getDoctorDashboard();
  }, []);

  if (!dashData) {
    return <div>Loading...</div>;
  }
  const totalAppointments = dashData.appointments.length;
  const totalPatients = dashData.patients.length;
  const totalEarnings = dashData.earnings;

  console.log(dashData);

  const latestAppointments = [...dashData.appointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const StatCard = ({ title, value, color }) => (
    <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Doctor Dashboard
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Earnings"
          value={`$${totalEarnings}`}
          color="bg-green-500"
        />
        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          color="bg-purple-500"
        />
      </div>

      {/* Latest Appointments */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          Latest Appointments
        </h3>
        <div className="space-y-4">
          {latestAppointments.map((appt) => (
            <div
              key={appt._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={appt.userData.image}
                  alt={appt.userData.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {appt.userData.fullName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Age: {appt.userData.age}
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-gray-700">
                  {appt.date} at {appt.time}
                </p>
                <span
                  className={`inline-block mt-2 sm:mt-0 text-xs px-2 py-1 rounded-full ${
                    appt.isCompleted
                      ? "bg-green-100 text-green-600"
                      : appt.cancelled
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {appt.isCompleted && "Completed"}
                  {!appt.isCompleted && appt.cancelled && "Cancelled"}
                  {!appt.isCompleted && !appt.cancelled && "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
