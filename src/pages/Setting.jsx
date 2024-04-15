import React, { useContext, useState } from 'react'
import { DisplaySetting } from '../store/DisplaySettingStore';

const Setting = () => {


    const {data,setData} = useContext(DisplaySetting);

    console.log(data);

    const [currentDataKey, setCurrentDataKey] = useState(null);

    const [keyToMap, setKeyToMap] = useState(null)

    const mapkey = () => {
        setData({...data, [currentDataKey]: keyToMap})

    }

  return (
    <div>
        <h1>
            Hello World (Mapping Data Key)
        </h1>

        <select onChange={(e) => setCurrentDataKey(e.target.value)}>
            <option value="pv">pv</option>
            <option value="sv">sv</option>
            <option value="temp">temp</option>
        </select>

        <select onChange={(e) => setKeyToMap(e.target.value)}>
            <option value="spv">spv</option>
            <option value="nsv">nsv</option>
            <option value="tempu">tempu</option>
        </select>

        <button onClick={mapkey} className='p-3'>MAP</button>


    </div>
  )
}

export default Setting