import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCars } from "../../redux/carSlice";
import { STATUSES } from "../../redux/carSlice";
 
const Home = () => {
  const { data, status } = useSelector((state) => state.car);
 
  // console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <>
      <div className="homecontainer">
        <div className="homeheader">
          {" "}
          <Navbar />
        </div>

        <div className="homebody">
          <div className="home">
            <div className="homeleft">
              <h1>Dhrumil Car Hire</h1>
            </div>
            <div className="homeright">
              <img
                src="/images/MahindraAlturasG4.jpg"
                alt="Not Available"
                className="homeimg"
              />
            </div>
            <h1 className="topcarsinhome">TOP CARS FOR RENT</h1>
            {status === STATUSES.LOADING && (
              <h3 className="homeloading">Loading...</h3>
            )}
            {status === STATUSES.ERROR && (
              <h3 className="homeerror">
                Error occured while fetching the data. Please try again later.
              </h3>
            )}
            {status === STATUSES.IDLE && (
              <>
                {!localStorage.getItem("carUser") && (
                  <div className="loginlineforrent">
                    Please Login to Book a Car!
                  </div>
                )}

                <div className="carmapdivouter">
                  {data.map((car, i) => (
                    <div className="carmapdiv" key={i}>
                      <img
                        src={car.image}
                        alt={car.name}
                        className="carmapdivimg"
                      />
                      <hr />
                      <div className="carmapdivname">
                        <h2 className="carmapdivnameinner">{car.name}</h2>
                      </div>
                      <div className="carmapdivfuelType">
                        <span className="carmapdivfuelTypeone">Fuel Type:</span>{" "}
                        <span className="carmapdivfuelTypetwo">
                          {car.fuelType}
                        </span>
                      </div>
                      <div className="carmapdivcapacity">
                        <span className="carmapdivcapacityone">Capacity:</span>{" "}
                        <span className="carmapdivcapacitytwo">
                          {car.capacity}
                        </span>
                      </div>
                      <div className="carmapdivpayperday">
                        <span className="carmapdivpayperdayone">Pay/Day:</span>{" "}
                        <span className="carmapdivpayperdaytwo">
                          ₹ {car.payPerDay.toFixed(2)}
                        </span>
                      </div>
                      {localStorage.getItem("carUser") && (
                        <button className="cardmapdivrentnow">
                          <Link
                            to={`/car/${car._id}`}
                            className="cardmapdivrentnowlink"
                          >
                            Rent Now
                          </Link>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="homefooter">
          <Footer/>
        </div>
      </div>
    </>
  ); 
};

export default Home;
