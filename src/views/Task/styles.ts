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
export const Input = styled.TextInput`
  background-color: #29292e;
  color: #f1f1f1;
  font-size: 18px;
  ${Platform.OS === 'ios' ? 'padding:15px;' : 'padding:12px;'};
  margin-top: 30px;
  border-radius: 10px;
  width: 100%;
`;
