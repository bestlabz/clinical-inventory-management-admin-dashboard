import React from "react";
import Table from "../../Components/Properites/Table/Table";
import TableHeaderTitle from "../../Components/Properites/TableHeaderTitle/TableHeaderTitle";

import HelpFUnction from "../../hooks/help/help";
const Help = () => {
  const { tableDatas } = HelpFUnction();
  return (
    <div className="container">
      <div
        style={{
          border: "3px solid #e8e8e8",
        }}
        className="table-box scroll-bar scrollbar-default"
      >
        <div className="table-box-top 2xl:h-[80px] xl:h-[80px] lg:h-[80px] md:h-[20%] sm:h-[20%] xs:h-[30%] xss:h-[30%] mobile:h-[30%]">
          <div className="table-box-top-left">
            <TableHeaderTitle title="Help-support" />
          </div>
        </div>

        <Table
          headers={[
            { title: "S.No" },
            { title: "Name" },
            { title: "Clinic  name" },
            { title: "Email" },
            { title: "Mobile" },
            { title: "Description" },
          ]}
          tableBody={tableDatas}
          tableName="Support"
        />
      </div>
    </div>
  );
};

export default Help;
