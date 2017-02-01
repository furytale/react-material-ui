import React, { PropTypes } from 'react';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';


const Underline = (props: Object, context: Object) => {
  const {
    disabled,
    disabledStyle,
    error,
    errorStyle,
    focus,
    focusStyle,
    underlineStyle,
    muiTheme
  } = props;
  const muiThemeProp = muiTheme || context.muiTheme;
  return (
    <TextFieldUnderline
      disabled={disabled}
      disabledStyle={disabledStyle}
      error={error}
      errorStyle={errorStyle}
      focus={focus}
      focusStyle={focusStyle}
      muiTheme={muiThemeProp}
      style={underlineStyle} />
  );
};

Underline.propTypes = {
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Disables the text field if set to true.
   */
  disabled: PropTypes.bool,
  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  disabledStyle: PropTypes.object,
  /**
   * Highlights an error.
   */
  error: PropTypes.bool,
  /**
   * Highlights on a focus.
   */
  focus: PropTypes.bool,
  /**
   * The style object to use to override error styles.
   */
  errorStyle: PropTypes.object,
  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  focusStyle: PropTypes.object,
  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: PropTypes.object,
  /**
   * Override the theme object of the TextField's underline element.
   */
  muiTheme: PropTypes.object
};

Underline.contextTypes = {
  muiTheme: PropTypes.object
};

Underline.defaultProps = {
  disabled: false,
  error: false,
  focus: true
};

export default Underline;
