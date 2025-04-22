import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  const aboutContent = [
    {
      title: "Efficiency",
      description:
        "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      title: "Security",
      description:
        "Your health records are in safe hands with our secure platform.",
    },
    {
      title: "Convenience",
      description:
        "Access your appointments and health records from anywhere, anytime.",
    },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-center text-2xl font-bold mb-6">About Us</h2>
      <div className=" gap-5  grid grid-cols-12">
        <div className="left-side col-span-12 md:col-span-4">
          <img src={assets.about_image} alt="about_img" className="w-full" />
        </div>
        <div className="right-side col-span-12 md:col-span-8">
          <p className="text-gray-600 text-base my-5">
            Welcome to MediSync, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At MediSync, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-600 text-base my-5">
            {" "}
            MediSync is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, MediSync is here to support you every step of the way.
          </p>
          <h4 className="text-xl font-bold mb-4"> Our Vision</h4>
          <p className="text-gray-600 text-base ">
            Our vision at MediSync is to create a seamless healthcare experience
            for every user. We aim to bridge the gap between patients and
            healthcare providers, making it easier for you to access the care
            you need, when you need it.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4"> Why Choose Us</h2>
        <div className="grid grid-cols-12 gap-4">
          {aboutContent.map((item, index) => (
            <div
              key={index}
              className="p-8 col-span-12 md:col-span-4 bg-white rounded-xl shadow-md hover:translate-y-[-10px] transition-all duration-200 cursor-pointer"
            >
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
