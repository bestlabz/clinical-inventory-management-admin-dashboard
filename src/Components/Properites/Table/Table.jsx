import dayjs from "dayjs";
import React from "react";
import { TbEye } from "react-icons/tb";

const Table = ({ headers, tableBody, tableName, setviewPage, id }) => {
  console.log("tableBody", tableBody);
  return (
    <>
      <table className="relative text-sm font-medium text-nowrap border-collapse font-poppins w-full ">
        <thead className=" text-[16px] font-semibold border-b-[2px] border-t-[2px] h-[10%] sticky top-0 bg-white">
          <tr>
            {headers?.map((head, i) => (
              <td key={i} className={` text-start py-2 px-10`}>
                {head?.title}
              </td>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {tableBody?.map((item, i) => {
            return (
              <tr className="border-b font-medium text-start" key={i}>
                <td className={`py-2 px-10`}>{i + 1}</td>
                <td
                  className={`py-2 px-10 flex items-center justify-start gap-3`}
                >
                  {item?.name}
                </td>
                <td className={`py-2 px-10 `}>{item?.clinic_name}</td>
                <td className={`py-2 px-10`}>
                  {item?.adminVerified ? (
                    <p className="text-green_dark border-[2px] border-green-100 bg-green-50 rounded-full text-[14px] w-[100px] h-[25px] flex items-center justify-center">
                      Verified
                    </p>
                  ) : (
                    <p className="text-orange_dark border-[1px] border-orange-200 bg-orange-100 rounded-full w-[100px] h-[25px] text-[14px] flex items-center justify-center">
                      Not Verified
                    </p>
                  )}
                </td>

                <td className={`py-2 px-10`}>
                  <div
                    onClick={() => {
                      id(item._id);
                      setviewPage(true);
                    }}
                    className="flex items-center justify-start gap-6"
                  >
                    <TbEye
                      size={30}
                      className="text-gray-300 hover:text-blue-400 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
