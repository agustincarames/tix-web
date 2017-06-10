import React from 'react'
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../../store/domain/account/actions/index';

const RegisterView = (props) => (
  <div className="container">
    <div className="row-fluid">
      <div className="span12">
        <h1>Crear nueva cuenta_</h1>
        <div className="jumbotron">
          <RegisterForm onSubmit={ props.submitRegister } />
        </div>
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
  mapDispatchToProps
)(RegisterView);

