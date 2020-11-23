import { Component, Fragment } from "react";

import Button from '../../UI/Button/Button';

// DOESN'T HAVE TO BE A CLASS-BASED COMPONENT
class OrderSummary extends Component
{
  // componentDidUpdate()
  // {
  //   console.log( '[OrderSummary.js] componentDidUpdate' );
  // };

  render()
  {
    const ingredientSummary = Object.keys( this.props.ingredients ).map( igKey =>
    {
      return (
        <li key={ igKey }>
          <span style={ { textTransform: 'capitalize' } }>{ igKey }</span>: { this.props.ingredients[ igKey ] }
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          { ingredientSummary }
        </ul>
        <p><strong>Total Price: { this.props.price.toFixed( 2 ) }</strong></p>
        <p>Continue to Checkout?</p>
        <Button buttonType='Danger' clicked={ this.props.cancel }>CANCEL</Button>
        <Button buttonType='Success' clicked={ this.props.checkout }>CONTINUE</Button>
      </Fragment>
    );
  };
}

export default OrderSummary;