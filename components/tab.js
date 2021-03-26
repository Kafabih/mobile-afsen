import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Transition, Transitioning} from 'react-native-reanimated';

import Images from '../assets';

const bgColors = {
  home: '#fff',
  time: '#fff',
  cuti: '#fff',
  user: '#fff',
  permission: '#fff'
};

const textColors = {
  home: '#000',
  time: '#000',
  cuti: '#000',
  user: '#000',
  permission: '#000'
};

const Container = styled.TouchableWithoutFeedback``;
const Icon = styled.Image`
  height: 24px;
  width: 24px;
`;
const Label = styled.Text`
  color: ${(props) => textColors[props.label]};
  font-weight: 600;
  margin-left: 8px;
`;
const Background = styled(Transitioning.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: auto;
  background: ${(props) => (props.focused ? bgColors[props.label] : '#151A7D')};
  border-radius: 100px;
  margin: 6px;
`;

function Tab({label, accessibilityState, onPress}) {
  const focused = accessibilityState.selected;
  const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`];

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={10} />
    </Transition.Sequence>
  );

  const ref = useRef();

  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        focused={focused}
        label={label}
        ref={ref}
        transition={transition}>
        <Icon source={icon} />
        {focused && (
          <Label label={label}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Label>
        )}
      </Background>
    </Container>
  );
}

export default Tab;
