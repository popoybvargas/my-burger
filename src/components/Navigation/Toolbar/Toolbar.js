import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = props => (
  <header className={ classes.Toolbar }>
    <DrawerToggle clicked={ props.show } />
    {/* <Logo height="80%" /> */}
    <div className={ classes.Logo }>
      <Logo />
    </div>
    <nav className={ classes.DesktopOnly }>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;