const START = 'upload-progress/start';
const INCREMENT_CURRENT_FILE = 'upload-progress/set-current-file';
const UPDATE_CURRENT_FILE_PROGRESS = 'upload-progress/update-current-file-progress';
const FINISH = 'upload-progress/finish';

const uploadProgress = {
  filesCount: 1,
  currentFile: 1,
  currentFileProgress: 0,
  pending: false,
  error: null,
};

const initialState = { ...uploadProgress };

export function startUpload(fileList) {
  return (dispatch) => {
    dispatch({
      type: START,
      payload: fileList.length,
    });
  };
}

export function incrementCurrentFile() {
  return (dispatch) => {
    dispatch({
      type: INCREMENT_CURRENT_FILE,
    });
  };
}

export function updateCurrentFileProgress(currentFileProgress) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_FILE_PROGRESS,
      payload: currentFileProgress,
    });
  };
}

export function finishUpload() {
  return (dispatch) => {
    dispatch({ type: FINISH });
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case START:
      return {
        ...initialState,
        filesCount: action.payload,
        pending: true,
      };
    case INCREMENT_CURRENT_FILE:
      return {
        ...state,
        currentFile: state.currentFile + 1,
        currentFileProgress: 0,
      };
    case UPDATE_CURRENT_FILE_PROGRESS:
      return {
        ...state,
        currentFileProgress: action.payload,
      };
    case FINISH:
      return {
        ...state,
        pending: false,
      };
    default:
      return state || initialState;
  }
}
