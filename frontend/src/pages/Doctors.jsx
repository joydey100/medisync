import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useAppContext();
  const [filterDoc, setFilterDoc] = useState(doctors);
  const specialityArea = [
    "All Doctors",
    ...new Set(doctors.map((doc) => doc.speciality)),
  ];
  const [currentSpeciality, setCurrentSpeciality] = useState(speciality);
  console.log(currentSpeciality);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
      setCurrentSpeciality(speciality);
    } else {
      setFilterDoc(doctors);
      setCurrentSpeciality("All Doctors");
    }
  }, [speciality, doctors]);

  const handleFilter = (item) => {
    if (item === "All Doctors") {
      setFilterDoc(doctors);
      navigate(`/doctors`);
    } else {
      setFilterDoc(doctors.filter((doc) => doc.speciality === item));
      navigate(`/doctors/${item}`);
    }
    setCurrentSpeciality(item);
  };

  return (
    <section className="mt-15">
      <p className="py-4 text-2xl font-semibold mb-4">
        Browse through our extensive list of trusted doctors
      </p>
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-4">
        <div className="left-side w-full md:basis-[22%] flex flex-col gap-3">
          {specialityArea.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleFilter(item)}
                className={`cursor-pointer p-3 gap-2 rounded-lg text-base font-medium transition-all duration-200 ${
                  currentSpeciality === item
                    ? "bg-primary text-white"
                    : "bg-slate-100 hover:bg-primary/80 hover:text-white"
                }`}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
        <div className="right-side w-full md:basis-[70%] flex flex-wrap gap-5">
          {filterDoc.map((item, index) => {
            return (
              <div
                key={index}
                className="p-5  rounded-xl shadow-md flex  flex-col justify-around cursor-pointer hover:translate-y-[-10px] transition-all duration-200 w-1/4 basis-[30%]"
                onClick={() => navigate(`/appointment/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="bg-white rounded-xl w-full shadow-md"
                />
                <div className="mt-4 py-5">
                  <h3 className="text-xl font-bold text-primary/80">
                    {item.name}
                  </h3>
                  <p className="my-2 text-base font-medium text-gray-500">
                    {item.speciality}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
