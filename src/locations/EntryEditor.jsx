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



  // const [ctaText, setCtaText] = useState(contentField.getValue());



  // Listen for onChange events and update the value
  // useEffect(async() => {
  //   if (contentField) {
  //     await sdk.field.setValue("hello world")
  //   } 
  // }, [contentField]);

  // need to invoke split-client to pull in tagged experiments for use in dropdown
  // const experimentList = Object.keys(experiments).map((feature) => {
  //   return (
  //     <FeatureList
  //       name={feature.name}
  //       // feature={feature as AIFeature}
  //       // isSaving={isSaving}
  //       // onSaving={handleSaving}
  //     />
  //   );
  // });

  // const readingTime = (text) => {
  //   const wordCount = text.split(' ').length;
  //   const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  //   return {
  //     words: wordCount,
  //     text: `${minutes} min read`,
  //   };
  // };

  // Calculate the metrics based on the new value
  // const stats = readingTime(blogText || '');

  return <Paragraph>Hello Cole Man (AppId: {sdk.ids.app})</Paragraph>;
};

export default Entry;
