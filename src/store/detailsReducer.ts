import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: FormState = {
  step: 1,
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  fileOne: null,
  files: [],
  isFormSubmitted: false,
  latitude: null,
  longitude: null,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setAddressLine1: (state, action: PayloadAction<string>) => {
      state.addressLine1 = action.payload;
    },
    setAddressLine2: (state, action: PayloadAction<string>) => {
      state.addressLine2 = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setPincode: (state, action: PayloadAction<string>) => {
      state.pincode = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setFileOne: (state, action: PayloadAction<File | null>) => {
      state.fileOne = action.payload;
    },
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    setFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isFormSubmitted = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number | null>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number | null>) => {
      state.longitude = action.payload;
    },
  },
});

export const {
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
} = detailsSlice.actions;
export default detailsSlice.reducer;
