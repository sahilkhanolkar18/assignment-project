import React, { useEffect, useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Details = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [fileOne, setFileOne] = useState(null);
  const [files, setFiles] = useState([]);
  // const [geolocationStatus, setGeolocationStatus] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // console.log({
  //   step,
  //   name,
  //   email,
  //   phone,
  //   addressLine1,
  //   addressLine2,
  //   city,
  //   state,
  //   pincode,
  //   country,
  //   file,
  //   files,
  //   isFormSubmitted,
  //   latitude,
  //   longitude,
  // });
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
    console.log({
      step,
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      fileOne,
      files,
      isFormSubmitted,
      latitude,
      longitude,
    });
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);

    console.log({
      step,
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      fileOne,
      files,
      isFormSubmitted,
      latitude,
      longitude,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic
    setIsFormSubmitted(true);
    console.log("subimited", {
      step,
      name,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      fileOne,
      files,
      isFormSubmitted,
      latitude,
      longitude,
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            {/* <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            /> */}
            <PhoneInput
              className="w-full px-4 py-2 mb-4 border rounded-lg"
              placeholder="Enter phone number"
              defaultCountry="IN"
              value={phone}
              onChange={setPhone}
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="text"
              placeholder="Address Line 1"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
          </>
        );
      case 3:
        return (
          <>
            <h1 className="mb-5 font-bold">Single File Upload:</h1>

            <input
              type="file"
              accept=".png,.pdf"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFileOne(selectedFile);
                }
              }}
              className="mb-4"
              name="file1"
            />
          </>
        );
      case 4:
        return (
          <>
            <h1 className="mb-5 font-bold">Multi File Upload (Max 5 files):</h1>
            <input
              type="file"
              accept=".png,.pdf"
              multiple
              onChange={(e) => {
                const selectedFiles = e.target.files;
                if (
                  selectedFiles &&
                  selectedFiles.length > 0 &&
                  selectedFiles.length <= 5
                ) {
                  setFiles(selectedFiles);
                }
              }}
              className="mb-4"
              name="file1"
            />

            <div className="mb-5">
              <h1 className="mb-2 mt-5 font-bold">GeoLocation:</h1>
              Latitude: {latitude}
              <br />
              Longitude: {longitude}
            </div>
          </>
        );
      case 5:
        return (
          <>
            {isFormSubmitted && (
              <div className="mt-4 text-green-500 mb-10">
                Form submitted successfully!
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center mt-10">
        Multi-Step Form
      </h1>
      <div className="p-6 text-xl bg-white rounded-lg shadow-md">
        <div className="mb-4 font-bold">Step {step} of 5</div>
        <Stepper color="blue" activeStep={step - 1} className="mb-6">
          <Step className="text-sm"> 1</Step>
          <Step className="text-sm"> 2</Step>
          <Step className="text-sm"> 3</Step>
          <Step className="text-sm"> 4</Step>
          <Step className="text-sm"> 5</Step>
        </Stepper>
        <form onSubmit={handleFormSubmit}>
          {renderStepContent()}
          <div className="flex justify-between">
            {step !== 1 && (
              <Button
                color="blue"
                onClick={handlePrevious}
                className="px-4 py-2 text-white rounded-lg"
              >
                Previous
              </Button>
            )}
            {step !== 4 && step !== 5 && (
              <Button
                color="blue"
                onClick={handleNext}
                className="px-4 py-2 text-white rounded-lg"
              >
                Next
              </Button>
            )}
            {step === 4 && (
              <Button
                type="submit"
                color="blue"
                onClick={handleNext}
                className="px-4 py-2 text-white rounded-lg"
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
