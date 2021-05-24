import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import isInteger from 'lodash/isInteger';

class Pill extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'rounded']),
    status: PropTypes.oneOf(['default', 'warning', 'error', 'info']),
    truncate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    tooltip: PropTypes.bool,
    children: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'default',
    status: 'default',
    truncate: false,
    tooltip: false
  };

  render() {
    const { type, status, truncate, tooltip, children } = this.props;
    const pillStyle = {
      maxWidth: isInteger(truncate) ? `${truncate}px` : null
    };
    const classes = classNames({
      'c-pill': true,
      [`c-pill--${type}`]: true,
      [`c-pill--${status}`]: true,
      'c-pill--truncate': truncate
    });

    return (
      <div className={classes}>
        <span
          className="c-pill__content"
          title={truncate || tooltip ? children : null}
          style={pillStyle}
        >
          {children}
        </span>
      </div>
    );
  }
}

export default Pill;
