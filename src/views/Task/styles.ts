import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #121214;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  margin: 32px 0;
  background-color: #121214;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #f1f1f1;
`;

export const Span = styled.Text`
  font-size: 18px;
  color: #f1f1f1;
`;

export const Input = styled.TextInput`
  background-color: #29292e;
  color: #f1f1f1;
  font-size: 18px;
  ${Platform.OS === 'ios' ? 'padding:15px;' : 'padding:12px;'};
  margin-top: 30px;
  border-radius: 8px;
  width: 100%;
`;

export const AddButton = styled.TouchableOpacity`
  background-color: #888;
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  margin-top: 24px;
  color: #f1f1f1;
  font-weight: bold;
  width: 100%;
`

export const TaskButton = styled.TouchableOpacity`
  background-color: #29292e;
  padding: 10px;
  margin-top: 24px;
  border-radius: 16px;
  align-items: center;
  width: 100vw;
`
export const TaskTitle = styled.Text`
  color: #f1f1f1;
  font-size: 16px;
  font-weight: bold;
`



