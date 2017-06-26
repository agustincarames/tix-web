import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux';
import {removeAlert} from 'store/domain/alerts/actions';
import R from 'ramda';

export const CoreLayout = ({ children, alerts, deleteAlert }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
    <Header />
    <div style={{flex: '1 0 auto'}}>
      {children}
    </div>
    <Footer />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

const mapStateToProps = (store) => ({
  alerts: R.pathOr({}, ['alerts'], store)
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAlert: (id) => dispatch(removeAlert(id))
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
