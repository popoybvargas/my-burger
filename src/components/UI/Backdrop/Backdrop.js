import classes from './Backdrop.module.css';

const Backdrop = props => (
  props.show ? <div className={ classes.Backdrop } onClick={ props.hide }></div> : null
);

export default Backdrop;