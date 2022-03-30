import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import Checkbox from '../../assets/images/checkbox.svg';
import CheckboxChecked from '../../assets/images/checkbox-checked.svg';
import Delete from '../../assets/images/delete-item.svg';
import Edit from '../../assets/images/edit-item.svg';

import s from './styles';

function ListItem({
  item, isEdit, onCheck, onEdit, onDelete,
}) {
  const returnRight = () => {
    if (!isEdit) {
      return (
        <View style={s.rightWrapper}>
          <TouchableOpacity onPress={onCheck} style={{ height: 40, width: 40 }}>
            {item.isDone
              ? <CheckboxChecked width={50} height={50} />
              : <Checkbox width={50} height={50} />}
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={onEdit} style={{ height: 40, width: 40, marginRight: 10 }}>
          <Edit width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={{ height: 40, width: 40 }}>
          <Delete width={40} height={40} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={s.itemWrapper}>
      <View style={s.textWrapper}>
        <Text style={s.title}>{item.title}</Text>
        <Text style={s.description}>{item.description}</Text>
      </View>
      {returnRight()}
    </View>
  );
}

export default ListItem;
