import React, { useState, useEffect } from 'react';
import {
  Button, View, TouchableOpacity, Text, TextInput, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import {PlaidLink, LinkSuccess, LinkExit} from 'react-native-plaid-link-sdk'

import ListItem from '../../components/ListItem/ListItem';
import Plus from '../../assets/images/plus.svg';
import s from './styles';
import { editTask, removeTask, setEditTask } from '../../models/tasks/actions';
import Edit from '../../assets/images/edit.svg';
import IdCard from '../../assets/images/id-card.svg';
const mapStateToProps = ({ task }) => {
  const { taskList, plaidLinkToken} = task;
  return { taskList, plaidLinkToken };
};

const mapDispatchToProps = (dispatch) => ({
  editTask: (task) => dispatch(editTask(task)),
  removeTask: (id) => dispatch(removeTask(id)),
  setEditTask: (id) => dispatch(setEditTask(id)),
});

const Home = function ({
  taskList, plaidLinkToken, editTask, removeTask, setEditTask, navigation,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const onCheck = (task) => {
    const editedTask = { ...task, isDone: !task.isDone };
    editTask(editedTask);
  };

  const onDelete = (id) => {
    removeTask(id);
  };

  const onEdit = (id) => {
    setIsEdit(false);
    setEditTask(id);
    navigation.navigate('EditModal');
  };


  return (
    <View style={s.mainScreenContainer}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ScanModal')}>
          <IdCard width={40} height={40} />
        </TouchableOpacity>

        {!!plaidLinkToken && <PlaidLink
          tokenConfig={{
            token: plaidLinkToken,
          }}
          onSuccess={(success: LinkSuccess) => {
            console.log(success);
          }}
          onExit={(exit: LinkExit) => {
            console.log(exit);
          }}

        >
          <View style={s.plaidButton}>
            <Text style={{fontSize: 22}}>PLAID</Text>
          </View>
        </PlaidLink> }


        <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>
          <Edit width={40} height={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onCheck={() => onCheck(item)}
            onDelete={() => onDelete(item.id)}
            onEdit={() => onEdit(item.id)}
            isEdit={isEdit}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', height: '100%' }}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 15 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('EditModal')} style={s.addButton}>
        <Plus width={50} height={50} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeScreen;
