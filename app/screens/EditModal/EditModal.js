import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, View, TextInput, Button,
} from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { addTask, editTask } from '../../models/tasks/actions';
import Close from '../../assets/images/close.svg';

import s from './styles';
import Color from '../../theme/color';

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

function EditModal({
  taskList,
  currentTask,
  addTask,
  editTask,
  navigation,
}) {
  const [title, editTitle] = useState('');
  const [description, editDescription] = useState('');
  useEffect(() => {
    if (currentTask) {
      taskList.forEach((t) => {
        if (t.id === currentTask) {
          editTitle(t.title);
          editDescription(t.description);
        }
      });
    }
  }, []);

  const saveItem = () => {
    if (!currentTask) {
      addTask({
        title,
        description,
        isDone: false,
      });
    } else {
      const task = taskList.filter((t) => t.id === currentTask)[0];
      task.title = title;
      task.description = description;
      editTask(task);
    }
    navigation.goBack();
  };

  return (
    <View style={s.settingsContainerWrapper}>
      <View style={s.settingsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
          <View><Close width={40} height={40} /></View>
        </TouchableOpacity>

        <TextInput
          value={title}
          style={s.textInput}
          placeholder="Title"
          onChangeText={(text) => {
            editTitle(text);
          }}
        />

        <TextInput
          value={description}
          style={[s.textInput, { height: 150, marginBottom: 50 }]}
          placeholder="Description"
          onChangeText={(text) => {
            editDescription(text);
          }}
          multiline
          numberOfLines={4}
        />

        <Button color={Color.greenMain} title="SAVE" onPress={saveItem} />

      </View>
    </View>
  );
}

const SettingsPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditModal);

export default SettingsPage;
