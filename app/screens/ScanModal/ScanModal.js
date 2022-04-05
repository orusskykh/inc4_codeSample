import React, { useState } from 'react';
import {
  TouchableOpacity, View, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import DocumentScanner from '@woonivers/react-native-document-scanner';
import { addTask, editTask } from '../../models/tasks/actions';
import Close from '../../assets/images/close.svg';

import s from './styles';

const mapStateToProps = ({ task }) => {
  const {
    taskList,
    currentTask,
  } = task;

  return { currentTask, taskList };
};

const mapDispatchToProps = (dispatch, props) => ({
  addTask: (task) => dispatch(addTask(task)),
  editTask: (task) => dispatch(editTask(task)),
});

function ScanModal({
  taskList,
  currentTask,
  addTask,
  editTask,
  navigation,
}) {
  const [image, setImage] = useState(null);

  const handleOnPictureTaken = (pic) => {
    console.log(pic);
    setImage(pic);
  };
  console.log(image);
  return (
    <View style={s.settingsContainerWrapper}>
      <View style={s.settingsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
          <View><Close width={40} height={40} /></View>
        </TouchableOpacity>
        { isEmpty(image) ? (
          <DocumentScanner
            style={{ flex: 1, aspectRatio: undefined }}
            onPictureTaken={handleOnPictureTaken}
            overlayColor="rgba(255,130,0, 0.7)"
            enableTorch={false}
            quality={0.5}
            detectionCountBeforeCapture={5}
            detectionRefreshRateInMS={50}
          />
        ) : <Image source={{ uri: image.croppedImage }} style={{ flex: 1, width: '100%', resizeMode: 'contain' }} />}
      </View>
    </View>
  );
}

const ScanModalPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScanModal);

export default ScanModalPage;
