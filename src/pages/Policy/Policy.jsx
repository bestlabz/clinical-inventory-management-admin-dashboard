import React from "react";
import TemplateBox from "./TemplateBox";

import PolicyFunction from "../../hooks/Policy/Policy";

const Policy = () => {
  const {
    about,
    acceptance,
    editable,
    handleSubmit,
    loader,
    open,
    privacy,
    setAbout,
    setAcceptance,
    setEditable,
    setLoader,
    setPrivacy,
    setopen,
  } = PolicyFunction();

  return (
    <div className="container">
      <div className="table-box">
        <h1 className="text-[22px] font-semibold pb-6">Templates</h1>

        <div className="template-container">
          <TemplateBox
            open={open === 1 ? true : false}
            setOpen={(e) => (e === open ? setopen(null) : setopen(e))}
            title={`Privacy Policy`}
            edit={editable === 1 ? false : true}
            enableEdit={(e) => setEditable(e)}
            onChange={(e) => setPrivacy(e)}
            value={privacy}
            index={1}
            submit={handleSubmit}
            loader={loader}
          />

          <TemplateBox
            open={open === 2 ? true : false}
            setOpen={(e) => (e === open ? setopen(null) : setopen(e))}
            title={`Acceptance of Terms`}
            edit={editable === 2 ? false : true}
            enableEdit={(e) => setEditable(e)}
            onChange={(e) => setAcceptance(e)}
            value={acceptance}
            index={2}
            submit={handleSubmit}
            loader={loader}
          />

          <TemplateBox
            open={open === 3 ? true : false}
            setOpen={(e) => (e === open ? setopen(null) : setopen(e))}
            title={`About US`}
            edit={editable === 3 ? false : true}
            enableEdit={(e) => setEditable(e)}
            onChange={(e) => setAbout(e)}
            value={about}
            index={3}
            submit={handleSubmit}
            loader={loader}
          />
        </div>
      </div>
    </div>
  );
};

export default Policy;
