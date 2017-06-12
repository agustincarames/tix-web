import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux';
import {removeAlert} from 'store/domain/alerts/actions';
import Alert from 'components/Alert';
import R from 'ramda';

function renderAlerts(alerts, removeAlert) {
  return Object.keys(alerts).map((alertKey) => {
    return <Alert message={alerts[alertKey]} key={alertKey} id={alertKey} removeAlert={removeAlert} />
    }
  )
}

export const CoreLayout = ({ children, alerts, deleteAlert }) => (
  <div>
    <Header />
    <div className="beta-banner">{ `Versión Beta` }</div>
    {renderAlerts(alerts, deleteAlert)}
    <div className='container'>
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
