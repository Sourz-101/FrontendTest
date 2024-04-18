import React, { useContext, useEffect, useState } from "react";
import { DisplaySetting } from "../store/DisplaySettingStore";
import MachineSelector from "../components/MachineSelector";
import PropSelector from "../components/PropSelector";
import axios from "axios";
import { Link } from "react-router-dom";

const Setting = () => {
  // const apiData = {
  //   1: {
  //     NAME: "Load Meter",
  //     RG: {
  //       "Process Value": 120,
  //       "R1 Status": 45,
  //       "R2 Status": 16,
  //       "Set 1": 67,
  //       "Set 2": 2001,
  //     },
  //   },
  //   2: {
  //     NAME: "MHT-9612M",
  //     RG: {
  //       Humidity: 622,
  //       SetValue1: 331,
  //       SetValue2: 492,
  //       "Relay1 Mode": 560,
  //       "Relay2 Mode": 230,
  //       pressure: 20,
  //       alt: 5004,
  //     },
  //   },
  //   3: {
  //     NAME: "Load Meter",
  //     RG: {
  //       "Process Value": 120,
  //       "R1 Status": 45,
  //       "R2 Status": 16,
  //       "Set 1": 67,
  //       "Set 2": 2001,
  //     },
  //   },
  // };

  const { data, setData } = useContext(DisplaySetting);
  const [apiData, setApiData]=useState(
    []
  );

  const default_data = {
    pv: "pv",
    sv: "sv",
    temp: "temp",
    amp1: "amp",
    amp2: "amp2",
    rpm: "rpm",
  };

  // Context Updater
  const updateData = () => {
    setData((prevData) => ({
      ...prevData,
      pv: pv,
      sv: sv,
      amp1: amp1,
      amp2: amp2,
      temp: temp,
      rpm: rpm,
    }));

    // strategic Logger
    console.log("Selected: ", properties);
    console.log("PV Selector", pv);
  };

  const updateDataToDefalut = () => {
    setData((prevData) => ({
      ...prevData,
      pv: default_data.pv,
      sv: default_data.sv,
      amp1: default_data.amp1,
      amp2: default_data.amp2,
      temp: default_data.temp,
      rpm: default_data.rpm,
    }));
  };

  // Context Logger
  const Logger = () => {
    console.log(data);
  };

  // State to store machine number
  const machines = Object.keys(apiData);
  const [selectedMachine, setSelectedMachine] = useState("");
  const handleSelectedOption = (selectedOption) => {
    console.log("Selected Machine:", selectedOption);
    setSelectedMachine(selectedOption);
  };

  // Function to get properties of selected machine
  const [properties, setProperties] = useState([]);

  const getProperties = (machineNumber) => {
    if (apiData[machineNumber] && apiData[machineNumber].RG) {
      setProperties(Object.keys(apiData[machineNumber].RG));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getdata"
        );

        const dataToSet = JSON.parse(response.data);

        console.log(dataToSet);
        setApiData(dataToSet);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    getProperties(selectedMachine);
  }, [selectedMachine]);

  // Variable to Map Selectd property with prop in Screen
  const [pv, setPv] = useState(null);
  const [sv, setSv] = useState(null);
  const [amp1, setAmp1] = useState(null);
  const [amp2, setAmp2] = useState(null);
  const [temp, setTemp] = useState(null);
  const [rpm, setRpm] = useState(null);

  const handleSelectedPropPV = (selectedOption) => {
    console.log("Selected option for PV:", selectedOption);
    setPv(selectedOption);
  };

  const handleSelectedPropSV = (selectedOption) => {
    console.log("Selected option for SV:", selectedOption);
    setSv(selectedOption);
  };

  const handleSelectedPropAMP1 = (selectedOption) => {
    console.log("Selected option for AMP1:", selectedOption);
    setAmp1(selectedOption);
  };

  const handleSelectedPropAMP2 = (selectedOption) => {
    console.log("Selected option for AMP2:", selectedOption);
    setAmp2(selectedOption);
  };

  const handleSelectedPropTemp = (selectedOption) => {
    console.log("Selected option for Temp:", selectedOption);
    setTemp(selectedOption);
  };

  const handleSelectedPropRPM = (selectedOption) => {
    console.log("Selected option for RPM:", selectedOption);
    setRpm(selectedOption);
  };

  /*
  const [currentDataKey, setCurrentDataKey] = useState(null);
  const [keyToMap, setKeyToMap] = useState(null);
  const mapkey = () => {
    setData({ ...data, [currentDataKey]: keyToMap });
  };
  */

  return (
    <div className="flex items-center flex-col">
      <Link to={"/"}>
        <button className=" btn p-5 bg-red-400">Home</button>
      </Link>
      <button className="btn p-5 bg-blue-400" onClick={updateDataToDefalut}>
        Reset
      </button>

      <h1 className="text-4xl m-10" onClick={Logger}>
        Hello World (Mapping Data Key)
      </h1>

      <div className="mb-5">
        Select Machine:{" "}
        {<MachineSelector array={machines} onSelect={handleSelectedOption} />}
      </div>

      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">
              Screen Property
            </th>
            <th className="border border-gray-500 px-4 py-2">API Property</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-500 px-4 py-2">PV</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropPV}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">SV</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropSV}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">AMP1</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropAMP1}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">AMP2</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropAMP2}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">Temp</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropTemp}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">RPM</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={properties}
                  onSelect={handleSelectedPropRPM}
                />
              }
            </td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 m-3"
        onClick={updateData}
      >
        Map To Screen
      </button>

      {/* <select
        className="m-5"
        onChange={(e) => setCurrentDataKey(e.target.value)}
      >
        <option value="pv">pv</option>
        <option value="sv">sv</option>
        <option value="temp">temp</option>
      </select>

      <select className="m-5" onChange={(e) => setKeyToMap(e.target.value)}>
        <option value="spv">spv</option>
        <option value="nsv">nsv</option>
        <option value="tempu">tempu</option>
      </select>

      <button onClick={mapkey} className="p-3 ml-5">
        MAP
      </button> */}
    </div>
  );
};

export default Setting;
