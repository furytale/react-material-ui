import React from 'react';
import Transitions from 'material-ui/styles/transitions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UniqueId from '../utils/uniqueId';
import Underline from '../Underline';
import InputFieldRaw from './InputFieldRaw';
import {default as I} from 'immutable';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Chip from '../Chip';
import FloatingLabel from './FloatingLabel';

import _ from 'lodash';

export default class SelectChip extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    floatingLabelText: React.PropTypes.string,
    errorText: React.PropTypes.string,
    /**
     * Disables the text field if set to true.
     */
    disabled: React.PropTypes.bool,
    /**
     * If true, the field receives the property width 100%.
     */
    fullWidth: React.PropTypes.bool,
    menuItems: React.PropTypes.array,
    selectedItems: React.PropTypes.array,
    /**
     * The id prop for the text field.
     */
    id: React.PropTypes.string,
    /**
     * Override the inline-styles of the
     * TextField's underline element when disabled.
     */
    underlineDisabledStyle: React.PropTypes.object,
    /**
     * The style object to use to override error styles.
     */
    errorStyle: React.PropTypes.object,
    /**
     * Override the inline-styles of the TextField's
     * underline element when focussed.
     */
    underlineFocusStyle: React.PropTypes.object,
    /**
     * Override the inline-styles of the TextField's underline element.
     */
    underlineStyle: React.PropTypes.object,
    floatingLabelStyle: React.PropTypes.object,
    /**
     * The style object to use to override error styles.
     */
    underlineErrorStyle: React.PropTypes.object,
    /**
     * Locale used for formatting date. If you are not using the default value, you
     * have to provide a DateTimeFormat that supports it. You can use Intl.DateTimeFormat
     * if it's supported by your environment.
     * https://github.com/andyearnshaw/Intl.js is a good polyfill.
     */
    locale: React.PropTypes.string,
    /**
     * Callback function that is fired when the date value changes. Since there
     * is no particular event associated with the change the first argument
     * will always be null and the second argument will be the new Date instance.
     */
    onChange: React.PropTypes.func,
    onNewRequest: React.PropTypes.func,
    /**
     * Fired when the datepicker dialog is dismissed.
     */
    onDismiss: React.PropTypes.func,
    /**
     * Callback function that is fired when the datepicker field gains focus.
     */
    onFocus: React.PropTypes.func,
    /**
     * Fired when the datepicker dialog is shown.
     */
    onShow: React.PropTypes.func,
    /**
     * Called when touch tap event occurs on text-field.
     */
    onTouchTap: React.PropTypes.func,
    /**
     * Sets the date for the Date Picker programmatically.
     */
    value: React.PropTypes.any,
    /**
     * Creates a ValueLink with the value of date picker.
     */
    valueLink: React.PropTypes.object,
    /**
     * Wordings used inside the button of the dialog.
     */
    wordings: React.PropTypes.object,
    /**
     * Location of the anchor for the auto complete Popover.
     */
    popoverAnchorOrigin: React.PropTypes.object,
    /**
     * Origin for location of target Popover.
     */
    popoverTargetOrigin: React.PropTypes.object,
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object
  };

  static getChildrenClasses() {
    return [];
  }

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
      anchorEl: null,
      isFocused: false,
      errorText: '',
      text: '',
      error: false,
      size: 0,
      openMenu: false,
      message: '',
      chips: this.props.selectedItems || [],
      popoverAnchor: null,
      isShrinked: false,
      muiTheme: getMuiTheme()
    };
    this.KeyCode = {
      DOWN: 40,
      ESC: 27,
      ENTER: 13,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      DELETE: 8
    };

    const refFieldName = 'InputField';
    const refChipSelectName = 'ChipSelect';
    this.id = this.props.id || UniqueId.generate();
    this.ref = this.props.ref || `${refChipSelectName}-${this.id}`;
    this.refInput = `${refFieldName}-${this.id}`;
    this.validationText = 'Incorrect value';
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme || getMuiTheme()
    };
  }

  onFocus(object: Object) { // eslint-disable-line no-unused-vars
    this.setState({popoverAnchor: this.refs[this.ref], isShrinked: true, openMenu: true, isFocused: true});
  }

  getStyles(muiTheme: Object) {
    const props = this.props;
    const {
      backgroundColor,
    } = this.constructor.getRelevantContextKeys(muiTheme);
    const styles = {
      root: {
        width: props.fullWidth ? '100%' : 'auto',
        backgroundColor,
        fontFamily: muiTheme.rawTheme.fontFamily,
        transition: Transitions.easeOut('200ms', 'height')
      },
      error: {
        position: 'absolute',
        bottom: -10,
        fontSize: 12,
        lineHeight: '12px',
        color: 'red',
        transition: Transitions.easeOut(),
      },
      underline: props.underlineStyle
    };
    return styles;
  }

  _handleInputChange(e: Object, data: Object) {
    const {hasValue, size, text} = data;
    const openMenu = (size > 0);
    this.setState({
      hasValue,
      size,
      text,
      openMenu,
    });
    if (this.props.onChange) this.props.onChange(e);
  }

  _handleInputBlur() {
    const isShrinked = Boolean(this.state.chips.length || this.state.text.length);
    this.setState({isFocused: false, isShrinked});
  }

  _handleContainerClick() {
    this.refs[this.refInput].focus();
  }

  _onMenuItemClick(e: Object, value: string | Array) {
    const chips = this.state.chips;
    chips.push(value);
    this.setState({chips, openMenu: false, text: '', size: 0});
    this.props.onNewRequest(new I.List(chips));
  }

  _onRemoveChip(item: string | Array) {
    const that = this;
    return (e: Object) => {
      e.stopPropagation();
      const chips = _.clone(that.state.chips);
      const key = chips.indexOf(item);
      if (key >= 0) {
        chips.splice(key, 1);
        that.props.onNewRequest(new I.List(chips));
        const isShrinked = Boolean(chips.length);
        that.setState({chips, isShrinked});
      }
    };
  }

  _onClosePopover() {
    this.setState({openMenu: false});
  }


  _onReturnBtn() {
    if (!this.state.size) {
      const chips = _.clone(this.state.chips);
      const key = chips.length ? (chips.length - 1) : -1;
      if (key >= 0) {
        chips.splice(key, 1);
        this.setState({chips});
        this.props.onNewRequest(new I.List(chips));
      }
    }
  }

  _handleInputKeyDown(e: Object) {
    switch (e.keyCode) {
      case this.KeyCode.ESC:
        this._handleInputBlur();
        this.setState({isFocused: false, openMenu: false});
        break;
      case this.KeyCode.DELETE:
        this._onReturnBtn();
        break;
      default:
        return;
    }
  }

  _validateValue(menuItems: Object | Array) {
    return Boolean(!menuItems.length && this.state.text);
  }

  _hasError(errorText: string, menuItems: Object | Array) {
    return Boolean(errorText && errorText.length) || this._validateValue(menuItems);
  }

  _getActualMenuItems() {
    const getItems = (menuItems: Object, stateText: string, chips: Object) => { // eslint-disable-line
      return stateText.length ? _.filter(_.map(menuItems, (item: string) => (
        (
          chips.indexOf(item) === -1 &&
          item.toLowerCase().includes(stateText.toLowerCase())
        ) ? item : null
      ))) : menuItems;
    };
    return this.state.openMenu ? getItems(this.props.menuItems, this.state.text, this.state.chips) : [];
  }

  _checkShrinkedLabel() {
    return Boolean((this.props.selectedItems && this.props.selectedItems.length > 0) || this.state.isShrinked);
  }

  renderChips() {
    const context = this;
    return _.map(this.state.chips, (item: string, index: number) => ((
      <Chip
        title={item}
        iconType='close'
        key={`ChipItem-${index}`}
        onRemoveClick={context._onRemoveChip(item)} />))
    );
  }

  renderMenu(items: Object | Array) {
    let menuItems = _.map(items, (item: string, index: number) => (
      (<MenuItem
        key={`menuItem-${index}`}
        value={item}
        primaryText={item} />
      )
    ));

    return menuItems.length ? (
      <Menu
        onChange={::this._onMenuItemClick}
        disableAutoFocus={true}
        autoWidth={true}
        style={{width: '100%'}}
        className='SelectChip_Menu'
        maxHeight={150}
      >
        {menuItems}
      </Menu>
    ) : [];
  }

  renderPopover(menuItems: Object | Array) {
    const popoverWidth = this.state.openMenu ? this.state.popoverAnchor.offsetWidth : 'auto';
    const style = {
      top: 'auto',
      left: 'auto',
      right: 'auto',
      width: popoverWidth,
    };
    return (
      <Popover
        useLayerForClickAway={true}
        anchorEl={this.state.popoverAnchor}
        open={this.state.openMenu}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        canAutoPosition={false}
        style={style}
        onRequestClose={::this._onClosePopover}
      >
        {this.state.openMenu ? this.renderMenu(menuItems) : null}
      </Popover>
    );
  }

  renderErrorElement(errorText: string, errorStatus: boolean, errorStyle: Object) {
    if (errorStatus) {
      const errorMessage = errorText || this.validationText;
      return (<div style={errorStyle}>{errorMessage}</div>);
    }
    return null;
  }

  render() {
    const muiTheme = this.state.muiTheme || this.context.muiTheme;
    const {
      disabled,
      floatingLabelText,
      floatingLabelStyle,
      underlineStyle,
      errorText
    } = this.props;
    const styles = _.clone(this.getStyles(muiTheme));
    const chipComponent = this.renderChips();

    const menuItems = this._getActualMenuItems();
    const errorStatus = this._hasError(errorText, menuItems);
    const errorTextElement = this.renderErrorElement(errorText, errorStatus, styles.error);
    const PopoverElements = this.renderPopover(menuItems);

    return (
      <div className='SelectChip_Container' style={styles.root}>
        <div className='SelectChip_Container-outer' ref={this.ref}>
          <div className='SelectChip_Container-inner' onClick={::this._handleContainerClick}>
            <FloatingLabel
              floatingLabelStyle={floatingLabelStyle}
              muiTheme={muiTheme}
              shrink={this._checkShrinkedLabel()}
              text={floatingLabelText} />
            {chipComponent}
            <InputFieldRaw
              size={this.state.size}
              onChange={::this._handleInputChange}
              onBlur={::this._handleInputBlur}
              onKeyDown={::this._handleInputKeyDown}
              defaultValue={this.state.text}
              error={errorStatus}
              style={styles.input}
              id={this.id}
              onFocus={::this.onFocus}
              refId={this.refInput}
              ref={this.refInput}
              disabled={disabled} />
          </div>
        </div>
        {PopoverElements}
        <Underline
          underlineStyle={underlineStyle}
          muiTheme={muiTheme}
          disabled={disabled}
          error={errorStatus}
          focus={this.state.isFocused} />
        {errorTextElement}
      </div>
    );
  }
}

SelectChip.defaultProps = {
  popoverAnchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  popoverTargetOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  disabled: false,
  fullWidth: true,
  container: 'dialog',
  isFocused: false,
  errorText: '',
  style: {},
  value: new Date(),
  menuItems: []
};
