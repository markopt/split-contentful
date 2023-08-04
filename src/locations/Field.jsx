import React, { useEffect, useState } from "react";
import { Paragraph } from "@contentful/f36-components";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import axios from "axios";
import useSWR from "swr";

const Field = () => {
  const [splitExp, setSplitExp] = useState([]);
  //const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
     const baseURL = 'https://api.split.io/internal/api/v2/splits';
     
  */
  const workspaceId = "ff211590-acc0-11ed-b267-ee0a963b46a9";
  const baseURL = "https://api.split.io/internal/api/v2/splits";
  const fetcher = (url) => axios.get(`${baseURL}${url}`, { headers: {
      Authorization: `Bearer kvrf8dnvhqo462phrngs9ke2l0rj7aet79vl`,
    }}).then((res) => res.data?.objects);
  const { data, error, isLoading, isFetching } = useSWR(
    `/ws/${workspaceId}?tag=experiment`,
    fetcher
  );  
  console.log("data: ", data)
  console.log("error: ", error)
  console.log("isloading: ", isLoading)

useEffect(() => {
  if (data && data.length && data[0]?.name) { 
      setSplitExp(data)
  }

}, [data])
  const CONTENT_FIELD_ID = "cta";

  

  //const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  // sdk.field.setValue("hello world");
  // console.log(contentField);
  // console.log("hello world from entry editor");
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  console.log("data here", data)
  return (
    <>
    {splitExp && splitExp.length && splitExp.map((obj, i) => {
      return (
      <div key={i}>
        {obj.name}
      </div>
      )
    })}
    <Paragraph>Hello</Paragraph>
    </>
  );
};

export default Field;
