import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ApiRequest from "../../services/httpService";

const help = () => {
  const [tableDatas, settableDatas] = useState([]);

  useEffect(() => {
    const API = async () => {
      try {
        const { success, help_and_support } = await ApiRequest.get(
          "/gethelpandsupport"
        );

        if (success) {
          settableDatas(help_and_support);
        }
      } catch (error) {
        toast.error(error.response, data.error);
      }
    };
    API();
  }, []);
  return {
    tableDatas,
  };
};

export default help;
