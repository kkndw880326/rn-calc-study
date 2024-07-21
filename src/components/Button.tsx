import {
  ButtonProps,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

type CustomButtonProps = {
  buttonStyle: StyleProp<ViewStyle>;
} & ButtonProps;

const Button = ({ title, onPress, buttonStyle }: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }: PressableStateCallbackType) => [
        styles.button,
        pressed && { backgroundColor: '#3f3f46' },
        buttonStyle,
      ]}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71717a',
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export default Button;
