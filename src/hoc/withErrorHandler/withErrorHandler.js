import { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = ( WrappedComponent, axios ) =>
{
  return class extends Component
  {
    state =
    {
      error: null
    };
  
    componentDidMount()
    {
      this.requestInterceptor = axios.interceptors.request.use( request =>
      {
        this.setState( { error: null } );

        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use( response => response, error =>
      {
        this.setState( { error } );
      });
    };

    componentWillUnmount()
    {
      axios.interceptors.request.eject( this.requestInterceptor );
      axios.interceptors.response.eject( this.responseInterceptor );
    };

    errorAcknowledgedHandler = () =>
    {
      this.setState( { error: null } );
    };

    render()
    {
      return (
        <Fragment>
          <Modal show={ this.state.error }
            hide={ this.errorAcknowledgedHandler }>
            { this.state.error ? this.state.error.message : null }
          </Modal>
          <WrappedComponent { ...this.props } />
        </Fragment>
      );
    };
  };
};

export default WithErrorHandler;