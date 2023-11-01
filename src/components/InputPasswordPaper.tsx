import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { loginStyles } from '../theme/loginTheme';

const InputPasswordPaper = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label="Password"
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
      style={loginStyles.inputField}
    />
  );
};

export default InputPasswordPaper;