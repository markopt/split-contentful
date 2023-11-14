import React, { useEffect, useState } from "react";
import { Paragraph } from "@contentful/f36-components";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import axios from "axios";
import useSWR from "swr";

const SplitExperiments = ({experimnent}) => {
  const [splitDefs, setSplitDefs] = useState([]);
 
 const workspaceId = "ff211590-acc0-11ed-b267-ee0a963b46a9";
 const baseURL = "https://api.split.io/internal/api/v2/splits";
 const getDefinitionUrl = `/ws/${workspaceId}/asb_flag/environments/Local-Default`
  const fetcher = (url) => axios.get(`${baseURL}${url}`, { headers: {
      Authorization: `Bearer kvrf8dnvhqo462phrngs9ke2l0rj7aet79vl`,
    }}).then((res) => res.data);
  const { data, error, isLoading, isFetching } = useSWR(
    `/ws/ff211590-acc0-11ed-b267-ee0a963b46a9/${experimnent}/environments/04d48470-acc3-11ed-8db0-02f989b7d254`,
    fetcher
  );  
  console.log("exp data: ", data)
  console.log("exp error: ", error)
  console.log("exp isloading: ", isLoading)

  const CONTENT_FIELD_ID = "cta";
  
  console.log("data here", data)
  return (
    <>


    {data && data.treatments?.length &&data.treatments.map((obj, i) => {
        return (
            <Paragraph>
                {`[${obj.name}, ${obj.description}]`}
            </Paragraph>
        )
    }) }
    </>
  );
};

export default SplitExperiments;
