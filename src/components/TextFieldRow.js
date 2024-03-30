/* @flow */
import * as React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';

import RowItem from './RowItem';
import { withTheme } from '../core/theming';
import type { Theme } from '../types/Theme';

type Props = TextInputProps & {
  theme: Theme,
  title: string,
  onValueChange: (text: string) => void,
  // inputProps: TextInputProps
};

class TextFieldRow extends React.Component<Props> {
  static defaultProps = {
    placeholder: '',
  };
  input = undefined;

  focusInput = () => {
    if (this.input) this.input.focus();
  };

  renderRightComponent = () => {
    const {
      value,
      placeholder,
      onValueChange,
      theme: { placeholderColor, primaryColor, textColor },
      ...inputProps
    } = this.props;
    return (
      <TextInput
        {...inputProps}
        ref={ref => {
          this.input = ref;
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        onChangeText={onValueChange}
        style={[styles.input, { color: textColor }]}
        selectionColor={primaryColor}
      />
    );
  };
  render() {
    const { title } = this.props;
    return (
      <RowItem
        title={title}
        renderRight={this.renderRightComponent}
        onPress={this.focusInput}
        {...this.props}
      />
    );
  }
}

export default withTheme(TextFieldRow);

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    fontSize: 18,
    width: '100%',
  },
});
