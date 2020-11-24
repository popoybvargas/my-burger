import { Component, Fragment } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount()
  {
    axios.get( '/ingredients.json' )
      .then( response =>
      {
        this.setState( { ingredients: response.data } );
      })
      .catch( error => this.setState( { error: true } ) );
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

  checkoutHandler = () =>
  {
    this.setState( { loading: true } );
    const order =
    {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:
      {
        name: 'Popoy Vargas',
        address:
        {
          street: '123 Asawa ni Marie',
          zipCode: '1119',
          country: 'PH'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post( '/orders.json', order )
      .then( response =>
      {
        this.setState( { loading: false, purchasing: false } );
      }) 
      .catch( error =>
      {
        this.setState( { loading: false, purchasing: false } );
      });
  };

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

    let modalContent = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded! 😓</p> : <Spinner />;
    
    if ( this.state.ingredients )
    {
      modalContent = <OrderSummary ingredients={ this.state.ingredients }
        cancel={ this.purchaseCandelHandler } checkout={ this.checkoutHandler }
        price={ this.state.totalPrice } />;

      burger = (
        <Fragment>
          <Burger ingredients={ this.state.ingredients } />
          <BuildControls ingredientAdded={ this.addIngredientHandler } 
            ingredientRemoved={ this.removeIngredientHandler } 
            disabled={ disabledInfo } price={ this.state.totalPrice } 
            purchaseable={ this.state.purchaseable }
            purchasing={ this.purchaseHandler } />
        </Fragment>
      );
    }

    if ( this.state.loading ) modalContent = <Spinner />;

    return (
      <Aux>
        <Modal show={ this.state.purchasing } hide={ this.purchaseCandelHandler }>
          { modalContent }
        </Modal>
        { burger }
      </Aux>
    );
  };
}

export default WithErrorHandler( BurgerBuilder, axios );