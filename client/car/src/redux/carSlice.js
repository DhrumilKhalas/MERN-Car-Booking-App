import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const carSlice = createSlice({
  name: "car",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
    // byId:[]
    // rent:""
  },
  reducers: {
    setAllCars(state, action) {
      state.data = action.payload;
    },
    // setCarById(state, action){
    //     state.byId = action.payload
    // },
    setStatus(state, action) {
      state.status = action.payload;
    },
    // setRentCar(state,action){
    //     state.rent = action.payload
    // }
  },
});

export const { setAllCars, setStatus } = carSlice.actions;
export default carSlice.reducer;

export function getAllCars() {
  return async function getAllCarsThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await axios.get("/api/cars/getall");
      const data = await res.data;
      // console.log(data)
      dispatch(setAllCars(data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      // console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// export function rentCar(reqobj){

//     return async function rentcarThunk(dispatch, getState){
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const res = await axios.post("/ai/rent/rentcar", reqobj)
//             const data = await res.data;
//             await dispatch(setRentCar(data))
//             await dispatch(setStatus(STATUSES.IDLE))
//             await alert("The car rented successfully!")

//             console.log(data)
//         }catch(err){
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR))
//             toast.error("Error occured while renting a car! Please try again later.", {position: toast.POSITION.TOP_CENTER})

//         }
//     }
// }

// export function getCarById(id){
//     return async function getCarByIdThunk(dispatch, getState){
//         dispatch(setStatus(STATUSES.LOADING))
//         try{
//             const res = await axios.get(`/api/cars/car/${id}`);
//             const data = await res.data;
//             console.log(data);
//             dispatch(setCarById(data))
//             dispatch(STATUSES.IDLE)
//         }catch(err){
//             console.log(err.message);
//             console.log("this part");
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// } 
