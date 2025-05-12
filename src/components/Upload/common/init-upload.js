import UIkit from 'uikit';

export default function initUpload(context, props, node) {
  const dropzoneNode = props.customDropzoneDomNode ?
    props.customDropzoneDomNode :
    node;
  context.uploadComponent = UIkit.upload(dropzoneNode, {
    url: props.url,
    multiple: true,
    beforeAll: (comp, fileList) => {
      props.onUploadStart(fileList);
      context.setState(prevState => ({
        progressBar: { ...prevState.progressBar, hidden: false },
        currentUpload: {
          filesCount: fileList.length,
          filesCompleted: 0,
          responses: [],
        },
      }));
    },
    loadStart: (e) => {
      context.setState(prevState => ({
        progressBar: {
          ...prevState.progressBar,
          hidden: false,
          max: (e.total * prevState.currentUpload.filesCount).toString(),
          value: (e.loaded * (prevState.currentUpload.filesCompleted + 1)).toString(),
        },
      }));
    },
    progress: (e) => {
      const { total, loaded } = e;
      props.onUploadProgress(loaded / total);
      context.setState(prevState => ({
        progressBar: {
          ...prevState.progressBar,
          max: (total * prevState.currentUpload.filesCount).toString(),
          value: (loaded * (prevState.currentUpload.filesCompleted + 1)).toString(),
        },
      }));
    },
    loadEnd: (e) => {
      context.setState((prevState) => {
        const filesCompleted = prevState.currentUpload.filesCompleted + 1;
        const allCompleted = filesCompleted === context.state.currentUpload.filesCount;
        const response = e.target.response ? JSON.parse(e.target.response) : null;
        const allResponses = prevState.currentUpload.responses.concat(response);

        if (response) {
          props.onFileUploaded(response);
        }

        if (allCompleted) {
          props.onAllFilesUploaded(allResponses);
        }

        return {
          progressBar: {
            ...prevState.progressBar,
            max: (e.total * prevState.currentUpload.filesCount).toString(),
            value: (e.loaded * (prevState.currentUpload.filesCompleted + 1)).toString(),
            hidden: allCompleted,
          },
          currentUpload: {
            ...prevState.currentUpload,
            filesCompleted,
            responses: allResponses,
          },
        };
      });
    },
  });

  context.setState({
    uploadInitialized: true,
  });
}
