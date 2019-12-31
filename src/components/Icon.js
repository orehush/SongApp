import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import styled from 'styled-components/native';

const Wrapper = styled(TouchableOpacity)`
  flex: 1;
`;

const Label = styled.Text``;

export default ({name, size, label, onPress, color, ...props}) => {
  return (
    <Wrapper onPress={onPress}>
      <Icon name={name} fontSize={size} color={color} />
      <Label>{name}</Label>
    </Wrapper>
  );
};
