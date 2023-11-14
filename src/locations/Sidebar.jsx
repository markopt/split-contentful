import React, { useEffect, useState } from "react";
import { Paragraph, List, ListItem, Note } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import PropTypes from 'prop-types';
// import { Button } from '@contentful/forma-36-react-components';
// import tokens from '@contentful/forma-36-tokens';
import { css } from 'emotion';
import axios from "axios";
import useSWR from "swr";

const Sidebar = () => {
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  //will wrap this in another file to make cleaner. Can join with the fetch experiments call and remove the
  //components entirely
  const workspaceId = "ff211590-acc0-11ed-b267-ee0a963b46a9";
  const baseURL = "https://api.split.io/internal/api/v2/splits";
  
  // using hardcoded for test
  const featureFlag = "promoTrailer"
  const getDefinitionUrl = `/ws/${workspaceId}/${featureFlag}/environments/Local-Default`
  const fetcher = (url) => axios.get(`${baseURL}${url}`, { headers: {
      Authorization: `Bearer {Admin Token}`,
    }}).then((res) => res.data);
  const { data, error, isLoading, isFetching } = useSWR(
    `/ws/ff211590-acc0-11ed-b267-ee0a963b46a9/promoTrailer/environments/04d48470-acc3-11ed-8db0-02f989b7d254`,
    fetcher
  );  
  console.log("sidebar data:", data)
  console.log("sidebar error: ", error)
  console.log("sidebar isloading: ", isLoading)

  const CONTENT_FIELD_ID = "featureFlag";
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  const [splitExp, setSplitExp] = useState(contentField.getValue());
  const [IsLoading, setIsLoading] = useState();
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setIsLoading(true);
    console.log('sidebar data:', data)
    let treatmentItems = []
    if (data) { 
      // setSplitExp(data)
      let i = 0;
      while (i < data.treatments.length) {
        treatmentItems.push(data.treatments[i].name);
        i++
      };
    };
    console.log('treatments:', treatmentItems)

    // We will use a timeout to simulate async data
    // this function will filter our options after 800ms
    const fetchTreatments = setTimeout(() => {
      const filteredTreatments = treatmentItems.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setItems(filteredTreatments);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(fetchTreatments);
  }, [inputValue, data]);

  console.log('items array:', items);

  
  if (data === undefined) {
    return <>Still loading...</>;
  }
  return (
    <>
      <Note style={{ marginBottom: '12px' }}>
        Selected Feature Flag: {splitExp}
        <List style={{ marginTop: '12px' }}>
          <ListItem>Treatment 1: {items[0]}</ListItem>
          <ListItem>Treatment 2: {items[1]}</ListItem>
        </List>
      </Note>
    </>
  );
  // return <Paragraph>Hello World</Paragraph>;
};

export default Sidebar;
