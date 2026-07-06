import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { styles, textStyles, baseTextStyle } from '../styles/Button.styles';

let Haptics: any = null;
try {
  Haptics = require('expo-haptics');
} catch (e) {
  Haptics = null;
}

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticFeedback?: boolean;
  cooldownMs?: number; // minimum time between accepted presses
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  hapticFeedback = true,
  cooldownMs = 500,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const lastPressRef = useRef(0); // timestamp of last accepted press

  const animateIn = () => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
    if (hapticFeedback && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const animateOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;

    const now = Date.now();
    if (now - lastPressRef.current < cooldownMs) return; // swallow the double-tap
    lastPressRef.current = now;

    onPress(e);
  };

  return (
    <Pressable
      onPressIn={disabled ? undefined : animateIn}
      onPressOut={disabled ? undefined : animateOut}
      onPress={handlePress}
      disabled={disabled}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.base,
          styles[variant],
          disabled && styles.disabled,
          style,
          { transform: [{ scale }] },
        ]}
      >
        <Text style={[baseTextStyle, textStyles[variant], textStyle]}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export default Button;
