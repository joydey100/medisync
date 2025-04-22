import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Joy Dey",
    image: assets.profile_pic,
    email: "joydey@example.com",
    phone: "1234567890",
    gender: "Male",
    age: "20",
    bloodGroup: "O+",
    heightFeet: "5",
    heightInches: "2",
    weight: "60",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <section className="my-16">
      <div className="info-box mx-auto max-w-3xl p-10 shadow-2xl">
        <h2 className="my-4 text-3xl font-bold text-center text-primary/80">
          My Profile
        </h2>
        <div className="image-box flex items-center justify-center">
          <img
            src={userData.image}
            alt={userData.name}
            className="my-4 size-50 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold mt-8 text-primary/80">
          {" "}
          Contact information
        </h2>
        <div className="name my-4">
          <label htmlFor="name">Name: </label> <br />
          {isEdit ? (
            <input
              type="text"
              id="name"
              className="border p-2 mt-2 w-full"
              placeholder="Type your name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {" "}
              {userData.name}
            </p>
          )}
        </div>
        <div className="email my-4">
          <label htmlFor="email">Email: </label> <br />
          {isEdit ? (
            <input
              type="email"
              id="email"
              className="border p-2 mt-2 w-full"
              placeholder="Type your name"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {" "}
              {userData.email}
            </p>
          )}
        </div>
        <div className="mobile-number my-4">
          <label htmlFor="mobile">Mobile Number: </label> <br />
          {isEdit ? (
            <input
              type="text"
              id="mobile"
              className="border p-2 mt-2 w-full"
              placeholder="Type your mobile number"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {" "}
              {userData.phone}
            </p>
          )}
        </div>
        <h2 className="text-2xl font-bold mt-8 text-primary/80">
          {" "}
          Basic information
        </h2>
        <div className="gender my-4">
          <label htmlFor="gender">Gender: </label> <br />
          {isEdit ? (
            <select
              id="gender"
              value={userData.gender}
              onChange={(e) =>
                setUserData({ ...userData, gender: e.target.value })
              }
              className="border p-2 mt-2 w-full"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded capitalize">
              {" "}
              {userData.gender}
            </p>
          )}
        </div>

        <div className="age my-4">
          <label htmlFor="age">Age: </label> <br />
          {isEdit ? (
            <input
              type="text"
              id="age"
              className="border p-2 mt-2 w-full"
              placeholder="Type your age"
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
            />
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {" "}
              {userData.age}
            </p>
          )}
        </div>
        <div className="blood-group my-4">
          <label htmlFor="bloodGroup">Blood Group: </label> <br />
          {isEdit ? (
            <select
              id="bloodGroup"
              value={userData.bloodGroup}
              onChange={(e) =>
                setUserData({ ...userData, bloodGroup: e.target.value })
              }
              className="border p-2 mt-2 w-full"
            >
              <option value="" disabled>
                Select blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {userData.bloodGroup}
            </p>
          )}
        </div>

        <div className="height my-4">
          <label htmlFor="height">Height: </label> <br />
          {isEdit ? (
            <div className="flex gap-2 mt-2">
              <select
                value={userData.heightFeet}
                onChange={(e) =>
                  setUserData({ ...userData, heightFeet: e.target.value })
                }
                className="border p-2 basis-[50%]"
              >
                <option value="">Feet</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} ft
                  </option>
                ))}
              </select>
              <select
                value={userData.heightInches}
                onChange={(e) =>
                  setUserData({ ...userData, heightInches: e.target.value })
                }
                className="border p-2 basis-[50%]"
              >
                <option value="">Inches</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i}>
                    {i} in
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {userData.heightFeet} ft {userData.heightInches} in
            </p>
          )}
        </div>
        <div className="weight my-4">
          <label htmlFor="weight">Weight: </label> <br />
          {isEdit ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                id="weight"
                value={userData.weight}
                onChange={(e) =>
                  setUserData({ ...userData, weight: e.target.value })
                }
                className="border p-2 w-full"
                placeholder="Enter weight"
                min="0"
              />
              <span className="text-gray-600">kg</span>
            </div>
          ) : (
            <p className="p-2 mt-2 w-full bg-slate-100 rounded">
              {userData.weight} kg
            </p>
          )}
        </div>

        <button
          onClick={() => setIsEdit(!isEdit)}
          className="py-4 font-medium text-base bg-primary text-white cursor-pointer w-full mt-4"
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </section>
  );
};

export default MyProfile;
