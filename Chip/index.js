import React, { PropTypes } from 'react';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ExpandIcon from 'material-ui/svg-icons/navigation/expand-more';
import CollapseIcon from 'material-ui/svg-icons/navigation/expand-less';
import {styles} from './Chip';

const Chip = (props: Object) => {
  const renderRemoveButton = (onRemoveClick: Function) => {
    const iconProps = {
      style: props.iconStyle,
      size: 20,
      onClick: onRemoveClick
    };
    let icon;
    switch (props.iconType) {
      case 'cancel':
        icon = (
          <CancelIcon
            {...iconProps} />
        );
        break;
      case 'expand':
        icon = (
          <ExpandIcon
            {...iconProps} />
        );
        break;
      case 'collapse':
        icon = (
          <CollapseIcon
            {...iconProps} />
        );
        break;
      default:
        icon = (
          <CloseIcon
            {...iconProps} />
        );
    }
    if (props.showIcon) {
      return icon;
    }
    return (
      <div className={`${props.className}_Hidden`}>
        {icon}
      </div>
    );
  };

  return (
    <div
      className={props.className}
      onClick={props.onItemClick}
    >
      {props.noCloseButton ? null : renderRemoveButton(props.onRemoveClick)}
      <span className={`${props.className}_Text`}>{props.title}</span>
    </div>
  );
};

Chip.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onRemoveClick: PropTypes.func,
  onItemClick: PropTypes.func,
  noCloseButton: PropTypes.bool,
  showIcon: PropTypes.bool,
  iconStyle: PropTypes.object,
  iconType: PropTypes.oneOf(['cancel', 'close', 'expand', 'collapse'])
};

Chip.defaultProps = {
  onRemoveClick: () => {},
  onItemClick: () => {},
  title: 'chip',
  className: 'Chip',
  noCloseButton: false,
  iconStyle: styles.registerIcon,
  iconType: 'cancel',
  showIcon: true
};

export default Chip;
