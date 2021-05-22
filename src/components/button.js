import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component renders an html button element configured conditionally based on the props supplied.
 */
class Button extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf([
      'default',
      'primary',
      'assertive',
      'upgrade',
      'link'
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    dangerouslyDisable: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    dataQa: PropTypes.string,
    buttonType: PropTypes.string,
    customTextTransform: PropTypes.bool
  };

  static defaultProps = {
    type: 'default',
    size: 'medium',
    dangerouslyDisable: false,
    loading: false,
    dataQa: null,
    buttonType: 'button',
    customTextTransform: false
  };

  state = {
    buttonWidth: 'auto'
  };

  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);

    this.loadingContent = this.loadingContent.bind(this);
    this.buttonContent = this.buttonContent.bind(this);
    this.setSize = this.setSize.bind(this);
  }

  /**
   * Conditionally, set the button width if it hasn't already been set. This allows the button to not resize when
   * it goes from a non-loading state to a loading state
   * @returns {void}
   */
  setSize() {
    if (
      !this.props.loading &&
      this.state.buttonWidth === 'auto' &&
      this.props.type !== 'link'
    ) {
      this.setState({
        buttonWidth: this._thisButton.getBoundingClientRect().width
      });
    }
  }

  /**
   * WARNING:
   *  We typically should not set state in componentDidMount or componentDidUpdate; however, because we are only
   *  setting state if the width is not auto, we should only ever have to update the state once. In this case,
   *  we shouldn't have infinite or inefficient renders.
   *  @returns{void}
   */
  componentDidMount() {
    //
    this.setSize();
  }

  /**
   * WARNING: see the note in componentDidMount
   * @returns {void}
   */
  componentDidUpdate() {
    // see not above in componentDidMount
    this.setSize();
  }

  /**
   * This renders the three loading dots to visually signify that the button is in a loading state
   * @return {object} the jsx object representing the loading content
   */
  loadingContent() {
    const buttonTypeClass = `c-btn__dot--${this.props.type}`;

    return (
      <div className="c-btn__state-wrap" data-testid="btn-loading-dots">
        <div className={`c-btn__dot c-btn__dot--first ${buttonTypeClass}`} />
        <div className={`c-btn__dot c-btn__dot--second ${buttonTypeClass}`} />
        <div className={`c-btn__dot c-btn__dot--third ${buttonTypeClass}`} />
      </div>
    );
  }

  /**
   * If the button is in a loading state, return the loading content. Else, return the children.
   * @return {object} the component JSX object
   */
  buttonContent() {
    return this.props.loading && this.props.type !== 'link'
      ? this.loadingContent()
      : this.props.children;
  }

  /**
   * Per each render, we conditionally render styles based on the current props and state.
   * If dangerouslyDisable is specified we add disabled attribute to the button's attributes
   * @return {object} the jsx object representing the button component
   */
  render() {
    const type = `c-btn--${this.props.type}`;
    const size = `c-btn--${this.props.size}`;
    const dangerouslyDisable = this.props.dangerouslyDisable
      ? 'is-disabled'
      : '';
    const loading = this.props.loading ? 'c-btn--loading' : '';
    const textTransform = this.props.customTextTransform
      ? 'c-btn--custom-case'
      : '';
    const style = {
      width: this.state.buttonWidth
    };

    return (
      <button
        className={`c-btn ${type} ${size} ${dangerouslyDisable} ${loading} ${textTransform}`}
        onClick={this.props.onClick}
        ref={thisButton => (this._thisButton = thisButton)}
        style={style}
        type={this.props.buttonType}
        data-qa={this.props.dataQa}
        disabled={this.props.dangerouslyDisable || this.props.loading}
      >
        {this.buttonContent()}
        <span className="u-sr-only" aria-live="polite">
          {this.props.loading && 'Loading'}
        </span>
      </button>
    );
  }
}

export default Button;
