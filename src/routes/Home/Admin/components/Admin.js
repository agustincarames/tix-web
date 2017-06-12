import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { fetchAllUsers, impersonateUser } from 'store/domain/account/actions';


class AdminView extends Component {

  renderNoUsers(){
    return (
      <span className="label label-important">No hay usuarios registrados en el sistema.</span>
    )
  }

  renderUsers(users, impersonateUser){
    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
          <td><a onClick={() => impersonateUser(user.id)} className="btn btn-info" href="#">Impersonar</a></td>
        </tr>
      )
    })
  }

  componentWillMount() {
    this.props.fetchAllUsers();
  }


  render() {
    const {
      users,
      impersonateUser
    } = this.props;

    return(
      <div className="hero-unit">
        <section id="charts">
          <div className="page-header">
            <h2>Gráficos generales</h2>
          </div>
          <a className="btn btn-large" href="./ispcharts">Ver graficos de utilizaci&oacute;n y calidad</a>
          <a className="btn btn-large" href="./getcsv">Generar csv de utilizaci&oacute;n y calidad</a>
        </section>

        <hr/>


        <section id="tables">
          <div className="page-header">
            <h2>Usuarios del sistema</h2>
          </div>
              <table className="table table-bordered table-striped table-hover">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Nickname</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                  {this.renderUsers(users, impersonateUser)}
                </tbody>
              </table>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  users: R.pathOr([], ['account', 'users'], store)
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    impersonateUser: (id) => dispatch(impersonateUser(id))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
