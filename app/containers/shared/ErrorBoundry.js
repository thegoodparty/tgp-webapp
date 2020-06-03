import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from 'components/shared/Wrapper';
import MobileHeader from 'components/shared/navigation/MobileHeader';
import Nav from 'containers/shared/Nav';
import { H1 } from '../../components/shared/typogrophy';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log('error caught', error);
    console.log('error info', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ backgroundColor: '#FFF' }}>
          <Nav />
          <Wrapper white>
            <MobileHeader />
            <div style={{ textAlign: 'center' }}>
              <H1 style={{ margin: '2rem 0' }}>Something went wrong.</H1>
              <a href="/">Please click here to reload the app</a>
            </div>
          </Wrapper>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ErrorBoundary;
