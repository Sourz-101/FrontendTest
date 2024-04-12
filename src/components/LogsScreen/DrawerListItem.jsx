import React from "react";

export default function DrawerListItem({ icon, heading, collapsed }) {
  return (
    <div>
      <li style={{ listStyleType: "none" }} className="mb-3">
        <div
          className="w-full flex items-center p-3 bg-primary9 hover:bg-primary10 focus:bg-primary7 focus:border-s-4 cursor-pointer"
          tabindex="0"
        >
          <img src={icon} alt="" className="size-[3rem] mx-3" />
          {!collapsed && <h1 className="body2 text-grey1">{heading}</h1>}
        </div>
      </li>
    </div>
  );
}
