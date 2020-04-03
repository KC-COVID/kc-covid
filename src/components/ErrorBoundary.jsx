import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  /**
   * The components that will be wrapped by the ErrorBoundary
   */
  children: PropTypes.node.isRequired,
};

/**
 * An error boundary that will catch all errors in the app, and display a more helpful error message
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * React lifecycle method to update this component state whenever an error is detected.
   * @param {Object} error The error that was caught.
   */
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.

    /* eslint-disable no-console */
    console.log(`ERROR OCCURRED: ${error}`);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <h1>
          Something went wrong on our end. Please send an email to webmaster@kccovid.com
          with a brief description of what you were trying to do.
        </h1>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = propTypes;
export default ErrorBoundary;
