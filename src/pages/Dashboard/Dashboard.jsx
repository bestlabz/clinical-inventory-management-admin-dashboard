import React from "react";

//Translate
import Translate from "../../Components/translateSpan/TranslateSpan";
import TranslateJson from "../../utils/translation/en.json";

//Third party libraries
import { useSelector } from "react-redux";

//Components
import Card from "../../Components/Cards/Card";
import TableHeaderTitle from "../../Components/Properites/TableHeaderTitle/TableHeaderTitle";
import DatePicker from "../../Components/Properites/DatePicker/DatePicker";
import Paginitation from "../../Components/Properites/Paginitation/Paginitation";

//Hooks
import DashboardFunction from "../../hooks/Dashboard/Dashboard";
import Select from "../../Components/Properites/Select/Select";
import Table from "../../Components/Properites/Table/Table";
import PaginationFunction from "../../hooks/Paginitation/Paginitation";
import ViewPage from "../../Components/Properites/ViewPage/ViewPage";

const Dashboard = () => {
  const {
    currentPages,
    next,
    pre,
    pageNumbers,
    paginationCount,
    tablebody,
    clinicId,
    setclinicId,
    setviewPage,
    viewPage,
    Options,
    style,
    selectedFilter,
    setSelectedFilter,
    model,
    setModel,
    handleChange,
    loader,
    clear,
    setClear,
    handleChangeSubscription,
    model1,
    setModel1
  } = DashboardFunction();

  return (
    <div className="container">
      {viewPage ? (
        <ViewPage
          setviewPage={setviewPage}
          headerText="View Clinic Details"
          id={clinicId}
        />
      ) : (
        <div
          style={{
            border: "3px solid #e8e8e8",
          }}
          className="table-box "
        >
          <div className="table-box-top 2xl:h-[80px] xl:h-[80px] lg:h-[80px] md:h-[20%] sm:h-[20%] xs:h-[30%] xss:h-[30%] mobile:h-[30%]">
            <div className="table-box-top-left">
              <TableHeaderTitle
                title={TranslateJson.dashboard.title}
                subContent={`${tablebody?.length} ${TranslateJson.dashboard.subText}`}
              />
            </div>
            <div className="table-box-top-right">
              <div className="table-box-top-right-content-filter">
                <Select
                  options={Options}
                  styles={style}
                  placeholder="Filter"
                  SelectedValue={setSelectedFilter}
                  value={selectedFilter}
                  clear={true}
                />
              </div>
            </div>
          </div>
          <div className=" mt-3 pb-3 overflow-auto w-full  2xl:h-[70%] xl:h-[70%] lg:h-[70%] md:h-[63%] sm:h-[63%] xs:h-[53%] xss:h-[53%] mobile:h-[53%]">
            <Table
              headers={[
                { title: "S.No" },
                { title: "Clinic owner’s name" },
                { title: "Clinic  name" },
                { title: "Status" },
                { title: "View" },
                { title: "Action" },
                { title: "Subscription" },

              ]}
              tableBody={tablebody}
              tableName="Patients"
              setviewPage={setviewPage}
              id={setclinicId}
              model={model}
              setModel={setModel}
              model1={model1}
              setModel1={setModel1}
              loader={loader}
              handleChange={ model ? handleChange : handleChangeSubscription}
              clear={clear}
              setClear={setClear}
            />
          </div>
          <div className=" w-full h-[10%] flex items-end justify-end px-3 pt-4  overflow-x-auto relative">
            <Paginitation
              currentpage={currentPages}
              PrePage={pre}
              nextPage={next}
              pageNumbers={pageNumbers}
              paginationCount={paginationCount}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
