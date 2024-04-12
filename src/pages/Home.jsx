import React, { useEffect, useState } from "react";
import ReadingCard from "../components/Dashboard/ReadingCard";
import ReadingCardMobile from "../components/Dashboard/ReadingCardMobile";
import axios from "axios";

const Home = () => {
  const [liveData, setLiveData] = useState([]);
  const [pv, setPv] = useState(0); // Correct initialization of state variables
  const [sv, setSv] = useState(0);
  const [amp, setAmp] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [temp, setTemp] = useState(0);
  const [amp2, setAmp2] = useState(0);
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getdata');
        // const response = await axios.get('http://localhost:3000/getdata');
        const datatoset= JSON.parse(response.data);
        console.log(response.data)
        // console.log(JSON.parse(datatoset))
        console.log("hiii data",datatoset)
        if (!datatoset) return;
        
        
        // console.log(datatoset["pv"])
        setPv(datatoset.pv);
        setSv(datatoset?.sv);
        setAmp(datatoset?.amp);
        setRpm(datatoset?.rpm);
        setTemp(datatoset?.temp);
        setAmp2(datatoset?.amp2);
        setMs(datatoset?.ms);

    

      } catch (error) {
        console.error("Error fetching live data:", error);
      }
    };

    // Fetch live data initially and set up interval for subsequent updates
    fetchData();
    const interval = setInterval(fetchData, 500); // Fetch data every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array ensures this effect runs only once
  // Empty dependency array ensures this effect runs only once

  return (
    <div className="min-[375px]:flex">
      {/* LEFT PART */}
      <div className="w-1/2 bg-primary9 h-screen rounded-tr-2xl rounded-br-2xl flex flex-col max-[375px]:hidden">
        <div className="flex ms-2 mt-5 text-3xl text-primary3">
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: "800" }}>
            HM
          </h1>
          <div className="w-full flex-center text-grey1">
            <h1
              className="heading3 mb-5"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Heating Mixer
            </h1>
          </div>
        </div>

        <div className="flex-1 cards flex flex-col items-center justify-center">
          <div className="bg-primary1 p-4 rounded-xl flex flex-col gap-5 w-[65%]">
            <h1
              className="text-lg font-bold"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Temperature
            </h1>
            <ReadingCard
              titleAbbrv="PV."
              titleFull="Present Value"
              reading={pv+" °C"}
              bodyText="text-grey8"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
            <ReadingCard
              titleAbbrv="SV."
              titleFull="Set Value"
              reading={sv+" °C"}
              bodyText="text-grey8"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
          </div>

          <div className="p-4 rounded-xl flex flex-col gap-5 m-3 w-[65%]">
            <ReadingCard
              titleAbbrv="AMP."
              titleFull="Current"
              reading={amp+" A"}
              bodyText="text-grey1"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
            <ReadingCard
              titleAbbrv="RPM"
              titleFull="Speed"
              reading={`${rpm}`}
              bodyText="text-grey1"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
          </div>
        </div>
      </div>

      {/* LEFT PART Mobile */}
      <div className="w-full bg-primary9 flex flex-col gap-3 min-[375px]:hidden">
        <div className="flex ms-2 text-3xl text-primary3 pt-4 max-[375px]:text-2xl">
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: "800" }}>
            HM
          </h1>
          <div className="w-full flex-center text-grey1">
            <h1
              className="heading3 mb-1 max-[375px]:text-2xl"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Heating Mixer
            </h1>
          </div>
        </div>

        <div className="flex-1 cards flex pb-5">
          <div className="bg-primary1 p-4 rounded-xl flex flex-col gap-3 w-[50%] ms-3">
            <h1
              className="text-lg font-bold"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Temperature
            </h1>
            <ReadingCardMobile
              titleAbbrv="PV."
              titleFull="Present Value"
              reading={pv+"°C"}
              bodyText="text-grey8"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
            <ReadingCardMobile
              titleAbbrv="SV."
              titleFull="Set Value"
              reading={sv+" °C"}
              bodyText="text-grey8"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
          </div>

          <div className="p-4 rounded-xl flex flex-col justify-center gap-3 w-[50%]">
            <ReadingCardMobile
              titleAbbrv="AMP."
              titleFull="Current"
              reading={amp+" A"}
              bodyText="text-grey1"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
            <ReadingCardMobile
              titleAbbrv="RPM"
              titleFull="Speed"
              reading={rpm+" A"}
              bodyText="text-grey1"
              // cardWidth="w-[70%]"
              // cardMargin="me-[5rem]"
            />
          </div>
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="w-1/2 h-screen flex flex-col px-5 gap-3 max-[375px]:hidden">
        <div className="flex ms-2 mt-5 text-3xl text-grey6">
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: "800" }}>
            CM
          </h1>
          <div className="w-full flex-center text-grey8">
            <h1
              className="heading3"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Cooling Mixer
            </h1>
          </div>
        </div>

        <div className="p-4 rounded-xl flex flex-col gap-5 m-3 w-[65%] self-center">
          <ReadingCard
            titleAbbrv="TEMP."
            titleFull="Temperature"
            reading={temp+" °C"}
            bodyText="text-grey8"
          />
          <ReadingCard
            titleAbbrv="AMP."
            titleFull="Current"
            reading={amp2+" A"}
            bodyText="text-grey8"
            extrasBody="me-[4rem]"
          />
        </div>

        <div className="bg-primary2 flex-1 mb-3 p-3 rounded-xl flex flex-col justify-center gap-8">
          <h1
            className="heading3 text-grey8 text-center"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Machine Status
          </h1>

          <div className="flex gap-10 flex-wrap self-center">
            <div className="bg-green3 rounded-xl flex-center w-[30%] py-5 px-10">
              <h1
                className="text-grey1 heading1"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                ON
              </h1>
            </div>

            <div className="self-center">
              <h1
                className="text-grey8 mb-3 body2"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                <b>Runtime: </b>
                <span>12 hours 35 minutes</span>
              </h1>
              <h1
                className="text-grey8 body2"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                <b>Downtime: </b>
                <span>6 hours 40 minutes</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PART Mobile*/}
      <div className="w-full flex flex-col gap-3 min-[375px]:hidden">
        <div className="flex ms-2 mt-5 text-3xl text-grey6 max-[375px]:text-2xl">
          <h1 style={{ fontFamily: '"Oswald", sans-serif', fontWeight: "800" }}>
            CM
          </h1>
          <div className="w-full flex-center text-grey8">
            <h1
              className="heading3 max-[375px]:text-2xl mb-1"
              style={{ fontFamily: '"Montserrat", sans-serif' }}
            >
              Cooling Mixer
            </h1>
          </div>
        </div>

        <div className="flex justify-between px-7">
          <ReadingCardMobile
            titleAbbrv="TEMP."
            titleFull="Temperature"
            reading={temp+" °C"}
            bodyText="text-grey8"
            extrasBody="flex-wrap justify-center"
          />
          <ReadingCardMobile
            titleAbbrv="AMP."
            titleFull="Currrent"
            reading={amp2+" A"}
            bodyText="text-grey8"
            extrasBody="flex-wrap justify-center"
          />
        </div>


        {/* MACHINE STATUS */}
        <div className="bg-primary2 min-[375px]:mb-3 p-3 ps-4 flex-1 flex flex-col gap-3">
          <h1
            className="heading3 text-grey8 max-[375px]:text-xl mb-1"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Machine Status
          </h1>

          <div className="flex">
            <div className="bg-green3 rounded-xl flex-center px-8 py-4">
              <h1
                className="text-grey1 heading1 max-[375px]:text-4xl"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                ON
              </h1>
            </div>

            <div className="self-center ms-5">
              <h1
                className="text-grey8 body3 max-[375px]:text-sm"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                <b>Runtime: </b>
                <span>12 hr 35 min</span>
              </h1>
              <h1
                className="text-grey8 body3 max-[375px]:text-sm"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                <b>Downtime: </b>
                <span>6 hr 40 min</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
