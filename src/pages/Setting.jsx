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
      vol1:{props:"SetValue1",machine:"2"},
      vol2:{props:"R1 Status",machine:"1"},
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
      vol1: vol1,
      vol2: vol2,
    }));
    console.log(
      'dat set'
    )
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
      vol1: default_data.vol1,
      vol2: default_data.vol2,
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

  const [pv, setPv] = useState({machine:data.pv.machine, props:data.pv.props});
  const [sv, setSv] = useState(data.sv);
  const [amp, setAmp] = useState(data.amp);
  const [amp2, setAmp2] = useState(data.amp2);
  const [temp, setTemp] = useState(data.temp);
  const [rpm, setRpm] = useState(data.rpm);
  const [vol1, setVol1] = useState(data.vol1);
  const [vol2, setVol2] = useState(data.vol2);


  return (
    <div className="flex items-center flex-col">
      <div>
        <Link to={"/"}>
          <button className=" btn p-5 bg-red-400 hover:bg-red-300 hover:rounded-xl rounded-full m-2">Home</button>
        </Link>
        <button
          className="btn p-5 bg-blue-400 hover:bg-blue-300 hover:rounded-xl rounded-full"
          onClick={updateDataToDefalut}
        >
          Reset
        </button>
      </div>

      <h1 className="text-4xl mx-auto mb-10" onClick={Logger}>
        Mapping Data Key
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
            <td className="border border-gray-500 px-4 py-2" onClick={()=>console.log(pv)}>PV</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  currentVal={pv?.machine}
                  onSelect={(e)=>{setPv({...pv,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                  array={apiData[pv?.machine]?.RG}
                  currentVal={pv?.props}
                  onSelect={(e)=>setPv({...pv,props:e})}
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
                  currentVal={sv?.machine}
                  onSelect={(e)=>{setSv({...sv,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={sv?.props}
                  array={apiData[sv?.machine]?.RG}
                  onSelect={(e)=>setSv({...sv,props:e})}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">AMP C</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  currentVal={amp?.machine}
                  onSelect={(e)=>{setAmp({...amp,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={amp?.props}
                  array={apiData[amp?.machine]?.RG}
                  onSelect={(e)=>setAmp({...amp,props:e})}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">AMP H</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  currentVal={amp2?.machine}
                  onSelect={(e)=>{setAmp2({...amp2,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={amp2?.props}
                  array={apiData[amp2?.machine]?.RG}
                  onSelect={(e)=>setAmp2({...amp2,props:e})}
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
                  currentVal={temp?.machine}
                  onSelect={(e)=>{setTemp({...temp,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={temp?.props}
                  array={apiData[temp?.machine]?.RG}
                  onSelect={(e)=>setTemp({...temp,props:e})}
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
                  currentVal={rpm?.machine}
                  onSelect={(e)=>{setRpm({...rpm,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={rpm?.props}
                  array={apiData[rpm?.machine]?.RG}
                  onSelect={(e)=>setRpm({...rpm,props:e})}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">Vol C</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  currentVal={vol1?.machine}
                  onSelect={(e)=>{setVol1({...vol1,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={vol1?.props}
                  array={apiData[vol1?.machine]?.RG}
                  onSelect={(e)=>setVol1({...vol1,props:e})}
                />
              }
            </td>
          </tr>
          <tr>
            <td className="border border-gray-500 px-4 py-2">Vol H</td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <MachineSelector
                  array={machines}
                  currentVal={vol2?.machine}
                  onSelect={(e)=>{setVol2({...vol2,machine:e})}}
                />
              }
            </td>
            <td className="border border-gray-500 px-4 py-2">
              {
                <PropSelector
                currentVal={vol2?.props}
                  array={apiData[vol2?.machine]?.RG}
                  onSelect={(e)=>setVol2({...vol2,props:e})}
                />
              }
            </td>
          </tr>
          
        </tbody>
      </table>

      <button
        type="button"
        className="text-white bg-green-700 hover:bg-green-800 hover:rounded-lg font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 m-3"
        onClick={updateData}
      >
        Map To Screen
      </button>
    </div>
  );
};

export default Setting;
