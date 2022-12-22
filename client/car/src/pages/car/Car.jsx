import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./car.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Car = () => {
  const [carById, setCarById] = useState({});
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const userJSON = JSON.parse(localStorage.getItem("carUser"));
  const user = userJSON._id;

  const { RangePicker } = DatePicker;

  useEffect(() => {
    const getCarsById = async () => {
      try {
        const res = await axios.get(`/api/cars/car/${id}`);
        const data = await res.data;
        // console.log(data);
        setCarById(data);
      } catch (err) {
        // console.log(err);
        document.getElementById("errorincarbyid").innerHTML =
          "Error occured while fetching the data. Please try again later.";
        document.getElementById("carbody").style.display = "none";
      }
    };

    getCarsById();

    if (driver) {
      const finalTotal = totalDays * carById.payPerDay + totalDays * 200;
      setTotal(finalTotal);
    } else {
      const finalTotal = totalDays * carById.payPerDay;
      setTotal(finalTotal);
    }
  }, [id, driver, totalDays, carById.payPerDay]);

  // console.log(carById);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const selectTime = (values) => {
    setFrom(moment(values[0]).format("MMM:DD:yyy HH:mm"));
    setTo(moment(values[1]).format("MMM:DD:yyy HH:mm"));
    setTotalDays(values[1].diff(values[0], "Days"));
  };

  const rentNow = async () => {
    try {
      const res = await axios.post("/api/rent/rentcar", {
        car: id,
        user: user,
        bookedTimeSlots: {
          from: from,
          to: to,
        },
        totalDays: totalDays,
        total: total,
        driverRequired: driver,
      });
      await res.data;
      // console.log(data);
      alert("The car rented successfully!");
      navigate("/");
      return;
    } catch (err) {
      // console.log(err);
      toast.error("Error occured while renting a car! Please try again later.");
      return;
    }
  };

  return (
    <>
      <div className="carcontainer" >
        <div className="carheader">
          <Navbar />
        </div>
 
        <div className="carbody" >
          <h3
            id="errorincarbyid"
            className="homeerror"
            style={{ textAlign: "center" }}
          >***Car with best condition & cheapest price in the city.***</h3>

          {carById && (
            <div id="carbody">
              <h2 className="nameinid">{carById.name}</h2>

              <div className="infoinid">
                <div className="infoinidleft">
                  <div className="infoinidfuel">
                    <span className="infoinidfuelone">Fuel Type:</span>
                    <span className="infoinidfueltwo">{carById.fuelType}</span>
                  </div>
                  <div className="infoinidcapa">
                    <span className="infoinidcapaone">Capacity:</span>
                    <span className="infoinidcapatwo">{carById.capacity}</span>
                  </div>
                  <div className="infoinidpay">
                    <span className="infoinidpayone">Pay/Day:</span>
                    <span className="infoinidpaytwo">
                      ₹ {carById.payPerDay?.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="infoinidright">
                  <img
                    src={carById.image}
                    alt={carById.name}
                    className="infoinidrightinner"
                  />
                </div>
              </div>

              <div className="rentbelowinid">
                <h2 className="nameinidtwoinner">RENT A CAR</h2>
                <div className="rangepiekcer">
                  <RangePicker
                    disabledDate={disabledDate}
                    className="rangepiekcerinner"
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime={{ format: "HH:mm" }}
                    onChange={selectTime}
                    bordered
                  />
                </div>
                <div className="amoutdetails">
                  <div className="totaldays">
                    <span className="totaldaysone">Total Days:</span>
                    <span className="totaldaystwo">{totalDays}</span>
                  </div>
                  <div className="fueltypetotal">
                    <span className="fueltypetotalone">Fuel Type:</span>
                    <span className="fueltypetotaltwo">{carById.fuelType}</span>
                  </div>
                  {driver ? (
                    <div className="capacitytotal">
                      <span className="capacitytotalone">Capacity:</span>
                      <span className="capacitytotaltwo">
                        {carById.capacity - 1}
                      </span>
                    </div>
                  ) : (
                    <div className="capacitytotal">
                      <span className="capacitytotalone">Capacity:</span>
                      <span className="capacitytotaltwo">
                        {carById.capacity}
                      </span>
                    </div>
                  )}
                  <div className="payperdaytotal">
                    <span className="payperdaytotalone">Pay/Day:</span>
                    <span className="payperdaytotaltwo">
                      ₹ {carById.payPerDay?.toFixed(2)}
                    </span>
                  </div>
                  <div className="drivertotal">
                    
                    <label className="drivertotalone" htmlFor="driver">
                      Driver Required (₹ 200.00/Day):
                    </label>
                    
                    <input
                      type="checkbox"
                      className="drivertotaltwo"
                      name="Driver"
                      id="driver"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDriver(true);
                        } else {
                          setDriver(false);
                        }
                      }}
                    />
                  </div>
                  <div className="totalamount">
                    <span className="totalamountone">TOTAL AMOUNT</span>
                    <span className="totalamounttwo">
                      ₹ {total?.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div>
                  <button className="rentnowbtn" onClick={rentNow}>
                    RENT NOW
                  </button>
                </div>
                <div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          )}
        </div> 

        <div className="carfooter">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Car;
