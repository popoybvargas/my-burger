import { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES =
{
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

class BurgerBuilder extends Component
{
  // constructor( props )
  // {
  //   super( props );
  //   this.state = {};
  // }

  state =
  {
    ingredients:
    {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState = ingredients =>
  {
    const sum = Object.keys( ingredients ).map( igKey =>
    {
      return ingredients[ igKey ];
    })
    .reduce( ( sum, el ) =>
    {
      return sum + el;
    }, 0 );
    this.setState( { purchaseable: sum > 0 } );
  };

  addIngredientHandler = type =>
  {
    const oldCount = this.state.ingredients[ type ];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[ type ] = oldCount + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[ type ];
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState( updatedIngredients );
  };

  removeIngredientHandler = type =>
  {
    const oldCount = this.state.ingredients[ type ];

    if ( oldCount === 0 ) return;

    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[ type ] = oldCount - 1;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[ type ];
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState( updatedIngredients );
  };

  purchaseHandler = () => this.setState( { purchasing: true } );

  purchaseCandelHandler = () => this.setState( { purchasing:false } );

  checkoutHandler = () => alert( 'CHECKED OUT!' );

  render()
  {
    const disabledInfo =
    {
      ...this.state.ingredients
    };

    for ( let key in disabledInfo )
    {
      disabledInfo[ key ] = disabledInfo[ key ] === 0;
    }

    return (
      <Aux>
        <Modal show={ this.state.purchasing } hide={ this.purchaseCandelHandler }>
          <OrderSummary ingredients={ this.state.ingredients }
            cancel={ this.purchaseCandelHandler } checkout={ this.checkoutHandler }
            price={ this.state.totalPrice } />
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls ingredientAdded={ this.addIngredientHandler } 
          ingredientRemoved={ this.removeIngredientHandler } 
          disabled={ disabledInfo } price={ this.state.totalPrice } 
          purchaseable={ this.state.purchaseable }
          purchasing={ this.purchaseHandler } />
      </Aux>
    );
  };
}

export default BurgerBuilder;