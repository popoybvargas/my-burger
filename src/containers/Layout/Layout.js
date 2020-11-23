import { Component } from 'react';

import classes from './Layout.module.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component
{
  state =
  {
    showSideDrawer: false
  };

  toggleSideDrawerHandler = () =>
  {
    this.setState( previousState =>
    {
      return { showSideDrawer: ! previousState.showSideDrawer };
    });
  };

  hideSideDrawerHandler = () =>
  {
    this.setState( { showSideDrawer: false } );
  };

  render()
  {
    return (
      <Aux>
        <Toolbar show={ this.toggleSideDrawerHandler } />
        <SideDrawer show={ this.state.showSideDrawer }
          hide={ this.hideSideDrawerHandler } />
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </Aux>
    );
  }
}

export default Layout;