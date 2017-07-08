import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../../store/domain/account/actions/index';
import DownloadView from './DownloadView';

const RegisterView = props => (
  <div className='container'>
    <div className='row-fluid'>
      <div className='col-md-4'>
        <RegisterForm onSubmit={props.submitRegister} />
      </div>
      <div className='col-md-8'>
        <DownloadView />
      </div>
    </div>

  </div>
);

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
  submitRegister: (data) => {
    dispatch(registerUser(data));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterView);

