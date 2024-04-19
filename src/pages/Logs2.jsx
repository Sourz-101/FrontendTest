import React, { useEffect, useState } from "react";
import DrawerListItem from "../components/LogsScreen/DrawerListItem";

import { DatePicker, TimePicker, Dropdown, Layout, theme, Menu } from "antd";
import LogsTable from "../components/LogsScreen/LogsTable";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";



const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const filter_items = [
  {
    label: "Heating Mixture",
    key: "hm",
    // icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        // label: 'Item 1',
        children: [
          {
            label: "PV. Present Value",
            key: "value-pv",
          },
          {
            label: "SV. Set Value",
            key: "value-sv",
          },
          {
            label: "AMP. Current",
            key: "value-hm-amp",
          },
          {
            label: "RPM Speed",
            key: "value-rpm",
          },
        ],
      },
    ],
  },
  {
    label: "Cooling Mixture",
    key: "cm",
    // icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        // label: 'Item 1',
        children: [
          {
            label: "TEMP. Temperature",
            key: "value-temp",
          },
          {
            label: "AMP. Current",
            key: "value-cm-amp",
          },
        ],
      },
    ],
  },
  {
    label: "Machine Status",
    key: "ms",
    // icon: <SettingOutlined />,
    children: [
      {
        type: "group",
        // label: 'Item 1',
        children: [
          {
            label: "Runtime",
            key: "value-runtime",
          },
          {
            label: "Downtime",
            key: "value-downtime",
          },
        ],
      },
    ],
  },
];

const { Sider, Content } = Layout;
const { RangePicker } = DatePicker;

const App = () => {

  const [logs, setLogs]=useState([]);


  const [current, setCurrent] = useState("mail");
  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick = (e) => {
    console.log("click ", e);
  };

  const onClickFilter = (e) => {
    console.log("click ", e);
    console.log(e);
    setCurrent(e.key);
  };

  useEffect(()=>{
    const fetchLogs= async()=>{
     try {
       const logResponse= await axios.get('http://ec2-35-154-187-94.ap-south-1.compute.amazonaws.com:3000/getlogs');
       console.log('response ', logResponse.data);
 
       setLogs(logResponse.data);
 
 
     } catch (error) {
       console.log(error);
     }
    }
    fetchLogs();
   },[])

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#1849A8" }}
        width="270"
        collapsedWidth="110"
      >
        
        <Link to={'/'}>
        <div className="w-full h-[4rem] bg-primary10 flex items-center">
          <h1
            className={`heading3 text-grey1 ms-4 ${
              collapsed ? "body2" : "" // Apply text-sm class when collapsed
            }`}
          >
            JOGINDRA
          </h1>
        </div>
        </Link>

        <div className="drawer-options mt-5">
          <h1 className="body3 text-grey3 ms-2 mb-4">Dashboard</h1>
          <DrawerListItem
            icon="Overview.png"
            heading="Overview"
            collapsed={collapsed}
          />
          <DrawerListItem
            icon="Records.png"
            heading="Records"
            collapsed={collapsed}
          />

          <h1 className="body3 text-grey3 ms-2 mb-4">Monitoring</h1>
          <DrawerListItem
            icon="Machine Profile.png"
            heading="Machine Profile"
            collapsed={collapsed}
          />
          <DrawerListItem
            icon="Downtime.png"
            heading="Downtime"
            collapsed={collapsed}
          />
        </div>
      </Sider>

      <Layout>
        <div
          className="flex items-center justify-between h-[4rem] pe-3"
          style={{
            padding: "",
            background: colorBgContainer,
            backgroundColor: "#1A4186",
          }}
        >
          <div className="flex items-center ms-3">
            <a
              onClick={() => setCollapsed(!collapsed)}
              class="material-symbols-rounded text-grey1"
              style={{ fontSize: "2.5rem" }}
            >
              menu
            </a>

            <form action="" className="ms-10">
              <input
                type="text"
                placeholder="Search"
                size="60"
                className="ps-4 py-2 rounded-lg"
              />
            </form>
          </div>

          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <div
                className="profile-card flex gap-3 items-center hover:bg-primary9 py-1 px-2 focus:bg-primary9 rounded-md"
                tabindex="0"
              >
                {/* <img
                import PersonIcon from '@mui/icons-material/Person';
                  src="PersonIcon"
                  alt=""
                  className="size-10 rounded-md"
                /> */}
                <PersonIcon color="primary" fontsize="large"  />
                <div className="profile-card-body text-grey1">
                  <h1 className="body3"> User </h1>
                  <h2 className="secondry1">Admin</h2>
                </div>
              </div>
            </a>
          </Dropdown>
        </div>

        <Content
          style={{
            padding: "1rem",
            // padding: 24,
            // minHeight: 280,
            // background: colorBgContainer,
            // borderRadius: borderRadiusLG,
          }}
        >
          <h1 className="heading3 text-primary10">Records</h1>

          <div className="range-selection flex gap-6 mt-5">
            <div className="date-range">
              <h1 className="body3 text-grey8">Select Date:</h1>
              <RangePicker />
            </div>

            <div className="time-range text-grey8">
              <h1 className="body3">Select Time:</h1>
              <TimePicker.RangePicker />
            </div>
          </div>

          <div className="filter-selection">
            <h1 className="body2 text-grey8 mt-5">Filters:</h1>
            <Menu
              onClick={onClickFilter}
              selectedKeys={[current]}
              mode="horizontal"
              items={filter_items}
              className="bg-grey3 rounded-lg text-grey7 font-medium"
            />
          </div>

          <div className="log-table mt-5">
            <LogsTable/>
          </div>

        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
