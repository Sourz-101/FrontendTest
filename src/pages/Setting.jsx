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
  const [apiData, setApiData] = useState([]);
  const [updatedData, setUpdatedData]=useState();
  const default_data = {
    pv:{props:"Process Value",machine:"1"},
      sv:{props:"R1 Status",machine:"1"},
      amp:{props:"Humidity",machine:"2"},
      amp2:{props:"SetValue2",machine:"2"},
      temp:{props:"SetValue1",machine:"2"},
      rpm:{props:"Set 2",machine:"1"},
  };

  // Context Updater
  const updateData = () => {
    setData((prevData) => ({
      ...prevData,
      pv: pv,
      sv: sv,
      amp: amp,
      amp2: amp2,
      temp: temp,
      rpm: rpm,
    }));
    console.log(
      'dat set'
    )
    // strategic Logger
    // console.log("Selected: ", properties);
    // console.log("PV Selector", pv);
  };

  const updateDataToDefalut = () => {
    setData((prevData) => ({
      ...prevData,
      pv: default_data.pv,
      sv: default_data.sv,
      amp: default_data.amp,
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


  //Fetching data from Endpoint
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
  const [pv, setPv] = useState(data.pv);
  const [sv, setSv] = useState(data.sv);
  const [amp, setAmp] = useState(data.amp);
  const [amp2, setAmp2] = useState(data.amp2);
  const [temp, setTemp] = useState(data.temp);
  const [rpm, setRpm] = useState(data.rpm);

  const handleSelectedPropPV = (selectedOption) => {
    console.log("Selected option for PV:", selectedOption);
    setPv({props: selectedOption, machine: selectedMachine});
  };

  const handleSelectedPropSV = (selectedOption) => {
    console.log("Selected option for SV:", selectedOption);
    setSv({props: selectedOption, machine: selectedMachine});
  };

  const handleSelectedPropAMP1 = (selectedOption) => {
    console.log("Selected option for AMP1:", selectedOption);
    setAmp({props: selectedOption, machine: selectedMachine});
  };

  const handleSelectedPropAMP2 = (selectedOption) => {
    console.log("Selected option for AMP2:", selectedOption);
    setAmp2({props: selectedOption, machine: selectedMachine});
  };

  const handleSelectedPropTemp = (selectedOption) => {
    console.log("Selected option for Temp:", selectedOption);
    setTemp({props: selectedOption, machine: selectedMachine});
  };

  const handleSelectedPropRPM = (selectedOption) => {
    console.log("Selected option for RPM:", selectedOption);
    setRpm({props: selectedOption, machine: selectedMachine});
  };

  return (
    <div className="flex items-center flex-col">
      <div>
        <Link to={"/"}>
          <button className=" btn p-5 bg-red-400 rounded-full m-2">Home</button>
        </Link>
        <button
          className="btn p-5 bg-blue-400 rounded-full"
          onClick={updateDataToDefalut}
        >
          Reset
        </button>
      </div>

      <h1 className="text-4xl m-10" onClick={Logger}>
        Hello World (Mapping Data Key)
      </h1>

      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">
              Screen Property
            </th>
            <th className="border border-gray-500 px-4 py-2">Select Machine</th>
            <th className="border border-gray-500 px-4 py-2">
              Select API Property
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-500 px-4 py-2">PV</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
                <MachineSelector
                  array={machines}
                  onSelect={handleSelectedOption}
                />
              }
            </td>
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
    </div>
  );
};

export default Setting;
