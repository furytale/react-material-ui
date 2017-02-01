import React, {Component, PropTypes} from 'react';
import UniqueId from 'framework/utils/helpers/uniqueId';
import TextFieldHint from 'material-ui/TextField/TextFieldHint';
import TextFieldLabel from 'material-ui/TextField/TextFieldLabel';

export default class FloatingLabel extends Component {
  static displayName: 'FloatingLabel';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The text string to use for the default value.
     */
    defaultValue: PropTypes.any,
    /**
     * Disables the text field if set to true.
     */
    disabled: PropTypes.bool,
    shrink: PropTypes.bool,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * The ref prop for the text field.
     */
    refId: PropTypes.string,
    /**
     * Override the inline-styles of the TextField's input element.
     */
    floatingLabelStyle: PropTypes.object,
    /**
     * Callback function that is fired when the textfield loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Callback function that is fired when the textfield's value changes.
     */
    onChange: PropTypes.func,
    /**
     * The function to call when the user presses the Enter key.
     */
    onEnterKeyDown: PropTypes.func,
    /**
     * Callback function that is fired when the textfield gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function fired when key is pressed down.
     */
    onKeyDown: PropTypes.func,
    /**
     * The value of the text field.
     */
    text: PropTypes.string,
    /**
     * The size of the text field.
     */
    size: PropTypes.number,
    /**
     * The muiTheme object theme.
     */
    muiTheme: PropTypes.object,
    /**
     * The error flag.
     */
    error: PropTypes.bool
  };

  constructor(props: Object) {
    super(props);
    this.state = {};

    const refName = 'FloatingLabel';
    this.id = props.id || UniqueId.generate();
    this.ref = `${refName}-${this.id}`;
  }

  render() {
    const {
      text,
      muiTheme,
      shrink,
      floatingLabelStyle
    } = this.props;
    const shrinkStyle = {transform: 'perspective(1px) scale(0.75) translate3d(0, -43px, 0)'};
    const labelStyle = Object.assign({width: '100%', marginTop: '20px'}, floatingLabelStyle);
    return (
      <TextFieldLabel
        shrink={shrink}
        muiTheme={muiTheme}
        shrinkStyle={shrinkStyle}
        style={labelStyle}
      >
        <TextFieldHint
          style={floatingLabelStyle}
          text={text}
          muiTheme={muiTheme}
          show={true} />
      </TextFieldLabel>
    );
  }
}

FloatingLabel.defaultProps = {
  disabled: false,
};
