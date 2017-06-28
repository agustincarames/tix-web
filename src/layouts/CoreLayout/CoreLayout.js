import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './CoreLayout.scss'
import '../../styles/core.scss'
import { connect } from 'react-redux';
import R from 'ramda';

export const CoreLayout = ({ children, alerts, clearAlert }) => (
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
});

const mapDispatchToProps = (dispatch) =>({});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
