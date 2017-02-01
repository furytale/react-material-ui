import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import UniqueId from '../utils/uniqueId';
import classNames from 'classnames';
import _ from 'lodash';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class InputFieldRaw extends Component {
  static displayName: 'InputFieldRaw';

  static propTypes = {
    children: PropTypes.node,
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
    inputStyle: PropTypes.object,
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
    value: PropTypes.any,
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

  static getRelevantContextKeys(muiTheme: Object) {
    const textFieldTheme = muiTheme.textField;
    return {
      floatingLabelColor: textFieldTheme.floatingLabelColor,
      focusColor: textFieldTheme.focusColor,
      textColor: textFieldTheme.textColor,
      disabledTextColor: textFieldTheme.disabledTextColor,
      backgroundColor: textFieldTheme.backgroundColor,
      hintColor: textFieldTheme.hintColor,
      errorColor: textFieldTheme.errorColor
    };
  }

  constructor(props: Object) {
    super(props);
    this.state = {
      hasValue: false,
      text: '',
      size: 0
    };

    const refName = 'InputField';
    this.id = props.id || UniqueId.generate();
    this.ref = props.refId || `${refName}-${this.id}`;
  }


  getValue() {
    return this._getInputNode().value;
  }

  getElement() {
    return this._getInputNode();
  }

  focus() {
    return ReactDOM.findDOMNode(this.refs[this.ref]).focus();
  }

  _getInputNode() {
    return ReactDOM.findDOMNode(this.refs[this.ref]);
  }

  _getStyles(muiTheme: Object) {
    const props = this.props;
    const {
      textColor,
      disabledTextColor,
    } = this.constructor.getRelevantContextKeys(muiTheme);

    return {
      input: {
        tapHighlightColor: 'rgba(0,0,0,0)',
        color: props.disabled ? disabledTextColor : textColor
      }
    };
  }

  _handleInputChange(e: Object) {
    const data = {
      hasValue: this._notEmpty(e.target.value),
      size: e.target.value ? e.target.value.length : 0,
      text: e.target.value
    };
    if (this.props.onChange) {
      this.props.onChange(e, data);
    } else {
      this.setState(data);
    }
  }

  _handleInputBlur(e: Object) {
    const data = {};
    this.props.onBlur(e, data);
  }

  _handleOnKeyDown(e: Object) {
    const data = {};
    this.props.onKeyDown(e, data);
  }

  /**
   * Check if a value is valid to be displayed inside an input.
   *
   * @param The value to check.
   * @returns True if the string provided is valid, false otherwise.
   */
  _notEmpty(value: string) {
    return Boolean(value || value === 0);
  }

  render() {
    const {
      className,
      disabled,
      size,
      defaultValue,
      muiTheme
    } = this.props;

    const styles = this._getStyles(muiTheme || this.context.muiTheme || getMuiTheme());
    const classNameProp = classNames(className, ['inputFieldRaw']);
    const inputProps = {
      id: this.id,
      ref: this.ref,
      onChange: ::this._handleInputChange,
      onBlur: ::this._handleInputBlur,
      onKeyDown: ::this._handleOnKeyDown,
      size: size || this.state.size,
      // defaultValue: defaultValue || this.state.text,
      value: defaultValue,
      style: _.merge(styles, this.props.inputStyle),
      type: 'text',
      onFocus: this.props.onFocus,
      ...disabled
    };
    return React.createElement('input', Object.assign({}, inputProps, {
      className: classNameProp
    }));
  }
}

InputFieldRaw.defaultProps = {
  disabled: false,
  rows: 1
};
