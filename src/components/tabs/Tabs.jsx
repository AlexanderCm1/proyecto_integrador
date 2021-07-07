import React, { useState } from "react";

function Tab({ label, onClick, activeTab }) {
  const handleonClick = () => {
    onClick(label);
  };

  return (
    <li
      className={`border py-2 px-6 bg-white rounded-t-lg cursor-pointer ${
        activeTab === label ? "" : "text-gray-500 bg-gray-200"
      }`}
      onClick={handleonClick}
    >
      {label}

    </li>
  );
}

const Tabs = ({ children }) => {
  const [activeTab, setStateActive] = useState(children[0].props.label);

  const onClickTabItem = (tab) => {
    setStateActive(tab);
  };
  return (
    <div className="bg-white mx-auto w-8/12 border p-5 rounded-xl">
      <ol className="sm:mx-auto  flex" style={{ borderBottom: "2px solid #eaeaea" }}>
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              key={label}
              activeTab={activeTab}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>

      <div className="flex flex-col">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
