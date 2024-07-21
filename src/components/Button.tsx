import {
  ButtonProps,
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

enum ButtonTypes {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
}

type CustomButtonProps = {
  buttonStyle: StyleProp<ViewStyle>;
  buttonType: ButtonTypes;
} & ButtonProps;

const Colors = {
  [ButtonTypes.NUMBER]: ['#71717a', '#3f3f46'],
  [ButtonTypes.OPERATOR]: ['#f59e0b', '#b45309'],
};

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonType = ButtonTypes.NUMBER,
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }: PressableStateCallbackType) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
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
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export { ButtonTypes };
export default Button;
