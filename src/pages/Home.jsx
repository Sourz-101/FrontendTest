
import React, { useContext, useEffect, useState } from "react";
import ReadingCard from "../components/Dashboard/ReadingCard";
import ReadingCardMobile from "../components/Dashboard/ReadingCardMobile";
import axios from "axios";
import { DisplaySetting } from "../store/DisplaySettingStore";
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

const Home = () => {

  // Context data
  const {data,setData} = useContext(DisplaySetting);

  
  // Context Logger
  const Logger = () => {
    console.log(data);
  }


  const [pv, setPv] = useState('~'); 
  const [sv, setSv] = useState('~');
  const [amp, setAmp] = useState('~');
  const [rpm, setRpm] = useState('~');
  const [temp, setTemp] = useState('~');
  const [amp2, setAmp2] = useState('~');
  const [vol1, setVol1] = useState('~');
  const [vol2, setVol2] = useState('~');
  const [status, setStatus]=useState(false)



  const nullUndefinedChecker = (value) => {
    if(value === undefined ||  value === null) 
      return '--';
    else 
      return value;
  }

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get('http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getdata');

        const dataToSet= JSON.parse(response.data);
        
          
        console.log(dataToSet);
          
        if (!dataToSet) return;
        

          console.log('datarespnce',dataToSet[data.sv.machine].RG[data.sv.props]);
          console.log('data',data);
        setPv(nullUndefinedChecker(dataToSet[data.pv.machine].RG[data.pv.props]));
        setSv(nullUndefinedChecker(dataToSet[data.sv.machine].RG[data.sv.props]));
        setAmp(nullUndefinedChecker(dataToSet[data.amp.machine].RG[data.amp.props]));
        setRpm(nullUndefinedChecker(dataToSet[data.rpm.machine].RG[data.rpm.props]));
        setTemp(nullUndefinedChecker(dataToSet[data.temp.machine].RG[data.temp.props]));
        setAmp2(nullUndefinedChecker(dataToSet[data.amp2.machine].RG[data.amp2.props]));
        setVol1(nullUndefinedChecker(dataToSet[data.vol1.machine].RG[data.vol1.props]));
        setVol2(nullUndefinedChecker(dataToSet[data.vol2.machine].RG[data.vol2.props]));
        setStatus(Number(dataToSet?.machineStatus))
      } catch (error) {
        console.error("Error fetching live data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []); 

  

  return (
    <div className="min-[375px]:flex">
      <div className="flex absolute mt-20">
        <Link to={'/setting'}><button className=" btn p-2 bg-blue-700 rounded-3xl m-1 hover:bg-gray-500 text-gray-100 outline-black">Setting</button></Link>
        <Link to={'/logs'}><button className=" btn p-2 bg-blue-700 rounded-3xl m-1 hover:bg-gray-500 text-gray-100 outline-black">Logs</button></Link>
      </div>

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
              onClick={Logger}
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
              reading={pv +" °C"}
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
            <ReadingCard
              titleAbbrv="V"
              titleFull="Voltage"
              reading={vol1+" V"}
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
            <ReadingCardMobile
              titleAbbrv="V"
              titleFull="Voltage"
              reading={amp+" A"}
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
          <ReadingCard
            titleAbbrv="V"
            titleFull="Voltage"
            reading={vol2+" V"}
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
            
              {status ? <div className="bg-green3 rounded-xl flex-center w-[30%] py-5 px-10"> <h1
                className="text-grey1 heading1"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                ON
              </h1> </div>:
              <div className="bg-red-700 rounded-xl flex-center w-[30%] py-5 px-10">
              <h1
                className="text-grey1 heading1"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                OFF
              </h1> </div>
              }
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
          <ReadingCardMobile
            titleAbbrv="V"
            titleFull="Voltage"
            reading={vol2+" V"}
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
            <div className=" flex-center px-8 py-4">
              {

                status ? <div> Hello on</div> : <div> Hello of</div>
              }
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

