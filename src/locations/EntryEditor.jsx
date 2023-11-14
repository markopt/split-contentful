import React, { useState, useEffect } from 'react';
import { Paragraph } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const Entry = () => {
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  //  Set this to featureFlag and treatmentItems once we run the migration scripts
  const CONTENT_FIELD_ID = 'cta';

  const contentField = sdk.entry.fields(CONTENT_FIELD_ID);
  sdk.field.setValue("hello world");
  console.log(contentField)
  console.log('hello world from entry editor');
 // const experiment = useState(contentField.getValue());


  return <Paragraph>Hello Cole Man (AppId: {sdk.ids.app})</Paragraph>;
};

export default Entry;
