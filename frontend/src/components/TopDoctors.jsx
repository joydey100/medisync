import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();

  return (
    <section className="py-15">
      <h2 className="text-3xl font-bold text-center mb-4">
        Top Doctors to Book
      </h2>
      <p className="sm:w-lg text-center mx-auto text-base mb-8">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="flex justify-center flex-wrap gap-5">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div
              key={index}
              className="p-5 bg-slate-100 rounded-xl shadow-md w-full md:w-1/3 lg:w-1/5 xl:w-1/6 flex  flex-col justify-around cursor-pointer hover:translate-y-[-10px] transition-all duration-200"
              onClick={() => navigate(`/appointment/${item._id}`)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="bg-white rounded-xl w-full"
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
      <div className="flex justify-center mt-8">
        <Link
          to="/doctors"
          className="text-base font-medium capitalize bg-primary text-white py-3 px-8 rounded-full cursor-pointer"
        >
          See more doctors
        </Link>
      </div>
    </section>
  );
};

export default TopDoctors;
