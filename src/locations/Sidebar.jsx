import React from 'react';
import { Paragraph } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
// import PropTypes from 'prop-types';
// import { Button } from '@contentful/forma-36-react-components';
// import tokens from '@contentful/forma-36-tokens';
// import { css } from 'emotion';

const Sidebar = () => {
  const sdk = useSDK();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

 //  const styles = {
	//   button: css({
	//     marginBottom: tokens.spacingS,
	//   }),
	// };

	// const getExperimentUrl = (projectId, experimentId, environment) => {
	//   return `https://app.optimizely.com/v2/projects/${projectId}/experiments/${experimentId}/variations`;
	// };

	// const getAllExperimentsUrl = (projectId) => {
	//   return `https://app.optimizely.com/v2/projects/${projectId}/experiments`;
	// };

	// const getAllExperimentNames = () => {

	// }

	// export default function Sidebar(props) {
	//   const [experimentId, setExperimentId] = useState(props.sdk.entry.fields.experimentId.getValue());
	//   const { parameters } = props.sdk;

	//   useEffect(() => {
	//     props.sdk.window.startAutoResizer();
	//     return () => {
	//       props.sdk.window.stopAutoResizer();
	//     };
	//   }, [props.sdk.window]);

	//   useEffect(() => {
	//     const unsubscribe = props.sdk.entry.fields.experimentId.onValueChanged((value) => {
	//       setExperimentId(value);
	//     });
	//     return () => {
	//       return unsubscribe();
	//     };
	//   }, [props.sdk.entry.fields.experimentId]);

	//   const projectId = parameters.installation.optimizelyProjectId;

	//   return (
	//     <div data-test-id="sidebar">
	//       <Button
	//         buttonType="primary"
	//         isFullWidth
	//         className={styles.button}
	//         disabled={!experimentId}
	//         href={getExperimentUrl(projectId, experimentId)}
	//         target="_blank"
	//         data-test-id="view-experiment">
	//         View in Optimizely
	//       </Button>
	//       <Button
	//         buttonType="muted"
	//         isFullWidth
	//         className={styles.button}
	//         target="_blank"
	//         href={getAllExperimentsUrl(projectId)}
	//         data-test-id="view-all">
	//         View all experiments
	//       </Button>
	//     </div>
	//   );
	// }

	// Sidebar.propTypes = {
	//   sdk: PropTypes.shape({
	//     entry: PropTypes.shape({
	//       fields: PropTypes.shape({
	//         experimentId: PropTypes.object.isRequired,
	//       }).isRequired,
	//     }),
	//     window: PropTypes.object.isRequired,
	//     parameters: PropTypes.shape({
	//       installation: PropTypes.shape({
	//         optimizelyProjectId: PropTypes.string.isRequired,
	//       }),
	//     }),
	//   }).isRequired,
	// };

  console.log("hello");
  return <Paragraph>Hello Cole Man (AppId: {sdk.ids.app})</Paragraph>;
};

export default Sidebar;
