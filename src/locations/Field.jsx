import React, { useEffect, useState } from "react";
import { Paragraph, Select, Autocomplete, Stack} from "@contentful/f36-components";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import axios from "axios";
import useSWR from "swr";
// import SplitExperiments from "../components/SplitExperiments";
import { SDKProvider, useCMA } from '@contentful/react-apps-toolkit';

const Field = () => {
  // const [splitExp, setSplitExp] = useState([]);
  const sdk = useSDK();
  // const cma = useCMA();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
     const baseURL = 'https://api.split.io/internal/api/v2/splits';
     
  */
 
 // const [value, setValue] = useFieldValue('slug', 'en-US');
  const workspaceId = "ff211590-acc0-11ed-b267-ee0a963b46a9";
  const baseURL = "https://api.split.io/internal/api/v2/splits";
  const featureFlag = "promoTrailer"
  const getDefinitionUrl = `/ws/${workspaceId}/${featureFlag}/environments/Local-Default`
  const fetcher = (url) => axios.get(`${baseURL}${url}`, { headers: {
      Authorization: `Bearer {Admin API token}`,
    }}).then((res) => res.data?.objects);
  const { data, error, isLoading, isFetching } = useSWR(
    `/ws/${workspaceId}?tag=contentful`,
    fetcher
  );  
  console.log("data: ", data)
  console.log("error: ", error)
  console.log("isloading: ", isLoading)

  const CONTENT_FIELD_ID = "featureFlag"; 
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const TREATMENT_ITEM = "treatmentName"
  const treatmentField = sdk.entry.fields[TREATMENT_ITEM];
  // console.log('treatment field:', treatmentField)
  // console.log('entry:', sdk.entry.fields)
  // useEffect(() => {
  //   if (data && data.length && data[0]?.name) { 
  //     setSplitExp(data)
  //     let i = 0;
  //     let flags = []
  //     while (i < data.length) {
  //       console.log('data:', data)
  //       flags.push(data[i].name);
  //       i++
  //     };
  //     console.log('flags:', flags)
  //         // contentField.setValue(data[0]?.name);
  //         // contentField.setValue(tests);
  //         // console.log('value to set:', data[0]?.name)
  //   }
  // }, [data]);

  // const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  // sdk.field.setValue();
  // console.log(contentField);
  // console.log("hello world from entry editor");
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/


  const [splitExp, setSplitExp] = useState(contentField.getValue());
  const [IsLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    console.log('data v2:', data)
    let flags = []
    let treatments = []
    // console.log('data:', data)
    if (data && data.length) { 
      // setSplitExp(data)
      let i = 0;
      while (i < data.length) {
        flags.push(data[i].name);
        i++
      };
          // contentField.setValue(data[0]?.name);
          // contentField.setValue(tests);
          // console.log('value to set:', data[0]?.name)
    };
    // console.log('flags:', flags)

    // We will use a timeout to simulate async data
    // this function will filter our options after 800ms
    const fetchFlags = setTimeout(() => {
      const filteredFlags = flags.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setItems(filteredFlags);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(fetchFlags);
  }, [inputValue, data]);

  // fetching data on each input value change
  // NOTE: Consider using throttle/debounce here for better performance
  const handleInputValueChange = (value) => {
    setInputValue(value);
  };

  const handleSelectItem = (item) => {
    setSplitExp(item);
    contentField.setValue(item);
  };

  return (
    <Stack flexDirection="column" alignItems="start">
      <Autocomplete
        items={items}
        onInputValueChange={handleInputValueChange}
        onSelectItem={handleSelectItem}
        isLoading={isLoading}
        defaultValue={splitExp}
      />

    </Stack>
  );


  // console.log("data here", data);
  // return (
  //   <>
  //     <EntityList>
  //     {data && data.map((obj, index)=>{
  //       return (
  //         <EntityList.Item
  //         title="Entry 1"
  //         description="Description"
  //         contentType="My content type"
  //         status="published"
  //         withDragHandle
  //         key={index}
  //       />)
  //     })};
  //     </EntityList>
  //   </>
  // );
  // return <Paragraph>Hello Entry Field Component (AppId: {sdk.ids.app})</Paragraph>;
};

export default Field;
