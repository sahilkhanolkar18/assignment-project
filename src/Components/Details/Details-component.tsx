import React, { useEffect, useState, useContext } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep,
  setName,
  setEmail,
  setPhone,
  setAddressLine1,
  setAddressLine2,
  setCity,
  setState,
  setPincode,
  setCountry,
  setFileOne,
  setFiles,
  setFormSubmitted,
  setLatitude,
  setLongitude,
} from "../../store/detailsReducer";

import { RootState } from "../../store/store";

interface FormState {
  step: number;
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  fileOne: File | null;
  files: File[];
  isFormSubmitted: boolean;
  latitude: number | null;
  longitude: number | null;
}

const Details: React.FC = () => {
  const authToken = useSelector((state: RootState) => state.auth);
  const formState = useSelector((state: RootState) => state.details);
  const dispatch = useDispatch();

  const {
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
  } = formState;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormState((prevState) => ({
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.log("Error getting geolocation:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleNext = (): void => {
    dispatch(setStep(formState.step + 1));
  };

  const handlePrevious = (): void => {
    dispatch(setStep(formState.step - 1));
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const formPayload = {
      id: 0,
      created_at: "now",
      name: formState.name,
      email: formState.email,
      phone_number: formState.phone,
      address_1: formState.addressLine1,
      address_2: formState.addressLine2,
      city: formState.city,
      state: formState.state,
      pincode: parseInt(formState.pincode, 10),
      country: formState.country,
      geolocation: `${formState.latitude},${formState.longitude}`,
      single_file: null,
      multi_file: [],
    };

    if (formState.fileOne) {
      formPayload.single_file = {
        path: "",
        name: formState.fileOne.name,
        type: formState.fileOne.type,
        size: formState.fileOne.size,
        mime: "",
        meta: {},
        url: "",
      };
    }

    formState.files.forEach((file) => {
      formPayload.multi_file.push({
        path: "",
        name: file.name,
        type: file.type,
        size: file.size,
        mime: "",
        meta: {},
        url: "",
      });
    });

    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authToken: authToken,
          },
          body: JSON.stringify(formPayload),
        }
      );

      if (response.ok) {
        console.log("Form submitted successfully");
        dispatch(setFormSubmitted(true));
      } else {
        console.log("Form submission failed");
      }
    } catch (error) {
      console.log("Form submission error:", error);
    }
  };

  const renderStepContent = (): JSX.Element | null => {
    switch (step) {
      case 1:
        return (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formState.name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={formState.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <PhoneInput
              className="w-full px-4 py-2 mb-4 border rounded-lg"
              placeholder="Enter phone number"
              defaultCountry="IN"
              value={formState.phone}
              onChange={(value) => dispatch(setPhone(value))}
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              type="text"
              placeholder="Address Line 1"
              value={formState.addressLine1}
              onChange={(e) => dispatch(setAddressLine1(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              value={formState.addressLine2}
              onChange={(e) => dispatch(setAddressLine2(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="City"
              value={formState.city}
              onChange={(e) => dispatch(setCity(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="State"
              value={formState.state}
              onChange={(e) => dispatch(setState(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Pincode"
              value={formState.pincode}
              onChange={(e) => dispatch(setPincode(e.target.value))}
              className="w-full px-4 py-2 mb-4 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Country"
              value={formState.country}
              onChange={(e) => dispatch(setCountry(e.target.value))}
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
                  dispatch(setFileOne(selectedFile));
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
                  dispatch(setFiles(Array.from(selectedFiles)));
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
            {step !== 5 && (
              <Button
                color="blue"
                onClick={handleNext}
                className="px-4 py-2 text-white rounded-lg"
              >
                Next
              </Button>
            )}
            {step === 5 && (
              <Button
                type="submit"
                color="blue"
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
