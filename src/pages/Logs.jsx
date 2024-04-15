import React, { useContext, useEffect, useState } from "react";
import { DisplaySetting } from "../store/DisplaySettingStore";
import axios from "axios";
const Logs = () => {


  const {data,setData} = useContext(DisplaySetting);

  console.log(data)


  const [allLogs, setAllLogs] = useState([]);

  const [machineType, setMachineType] = useState("");
  const [dataKey, setDataKey] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectKey, setSelectKey] = useState([]);
  const logfilter = async () => {
    try {
      if (
        machineType === "" &&
        dataKey === "" &&
        startDate === "" &&
        endDate === ""
      ) {
        throw new Error("All filters required!!");
      }
      const response = await axios.get(
        "http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getlogs"
      );
      const Logsdata = response.data;

      const filteredData = Logsdata.filter((item) => {
        const itemDate = new Date(item?.createdAt).toLocaleDateString();
        const stDate = new Date(startDate).toLocaleDateString();
        const enDate = new Date(endDate).toLocaleDateString();
        console.log(itemDate, stDate, enDate);

        return stDate <= itemDate && itemDate <= enDate;
      });

      console.log(filteredData);
      return filteredData;
    } catch (error) {}
  };
  const fetchLogs = async () => {
    try {
      // const response = await axios.get('http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getlogs');
      // const response= await axios.get('http://localhost:3000/getlogs')
      const response = await logfilter();
      console.log(response);
      setAllLogs(response);
    } catch (error) {
      console.log("log fetching errror", error);
    }
  };

  useEffect(() => {
    if (
      machineType != "" &&
      dataKey != "" &&
      startDate != "" &&
      endDate != ""
    ) {
      fetchLogs();
    }

    if (machineType === "heating_mixer") {
      setSelectKey(["pv", "sv", "amp", "rpm"]);
    } else if (machineType === "cooling_mixer") {
      setSelectKey(["temp", "amp2"]);
    } else {
      setSelectKey([]);
    }
  }, [machineType, dataKey, startDate, endDate]);
  return (
    <div>
      <p>Logs </p> <br />
      <div className="filters p-5 flex gap-2">
        <label className="p-2 border-2 flex gap-2" htmlFor="machine">
          Matchine Type
          <select
            type="select"
            name="machine"
            id="machine"
            onChange={(e) => {
              setMachineType(e.target.value), console.log(e.target.value);
            }}
          >
            <option value="">Select</option>
            <option value="heating_mixer">Heating Mixer</option>
            <option value="cooling_mixer">Cooling Mixer</option>
          </select>
        </label>

        <label className="p-2 border-2 flex gap-2" htmlFor="datakey">
          Data Key
          <select
            type="select"
            name="datakey"
            id="datakey"
            onChange={(e) => {
              setDataKey(e.target.value), console.log(e.target.value);
            }}
          >
            <option name="" id="" value="">
              select key
            </option>
            {selectKey?.map((e) => {
              return <option value={e}>{e.toUpperCase()}</option>;
            })}
          </select>
        </label>
        <label className="p-2 border-2 flex gap-2" htmlFor="startdata">
          start date
          <input
            type="date"
            name="startdate"
            id="startdate"
            onChange={(e) => {
              setStartDate(e.target.value), console.log(e.target.value);
            }}
          />
        </label>
        <label className="p-2 border-2 flex gap-2" htmlFor="enddata">
          end date
          <input
            type="date"
            name="enddate"
            id="enddate"
            onChange={(e) => {
              setEndDate(e.target.value), console.log(e.target.value);
            }}
          />
        </label>
      </div>
      {/* <input type="time" /> */}
      {allLogs?.map((e) => {
        const data = JSON.parse(e?.data);

        console.log(data);

        return (
          <div key={e._id}>
            {e._id} = {dataKey} : {data[`${dataKey}`]}
          </div>
        );
      })}

      <h1 onClick={()=>setData('xyz')}>`${data}`</h1>

    </div>
  );
};

export default Logs;
