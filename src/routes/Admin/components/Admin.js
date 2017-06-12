import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { fetchAllUsers } from 'store/domain/account/actions';


class AdminView extends Component {

  renderNoUsers(){
    return (
      <span className="label label-important">No hay usuarios registrados en el sistema.</span>
    )
  }

  renderUsers(users){
    return users.map((user) => {
      return (
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td><a className="btn btn-info" href="#">Estad&iacute;sticas</a></td>
        </tr>
      )
    })
  }

  componentWillMount() {
    this.props.fetchAllUsers();
  }


  render() {
    const {
      users
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
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                  {this.renderUsers(users)}
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
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
