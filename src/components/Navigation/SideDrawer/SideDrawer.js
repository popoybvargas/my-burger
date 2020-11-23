import Logo from '../../Logo/Logo';
import { Fragment } from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props =>
{
  let attachedClasses = [ classes.SideDrawer, classes.Close ];

  if ( props.show ) attachedClasses = [ classes.SideDrawer, classes.Open ];

  return (
    <Fragment>
      <Backdrop show={ props.show } hide={ props.hide } />
      <div className={ attachedClasses.join( ' ' ) }>
        {/* <Logo height="11%" /> */}
        <div className={ classes.Logo }>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;