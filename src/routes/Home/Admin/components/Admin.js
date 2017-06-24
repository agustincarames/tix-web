import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import R from 'ramda';
import { fetchAllUsers, impersonateUser } from 'store/domain/account/actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class AdminView extends Component {

  renderNoUsers(){
    return (
      <span className="label label-important">No hay usuarios registrados en el sistema.</span>
    )
  }

  renderUsers(users, impersonateUser){
    return users.map((user) => {
      return (
        <TableRow key={user.id}>
          <TableRowColumn>{user.id}</TableRowColumn>
          <TableRowColumn>{user.username}</TableRowColumn>
          <TableRowColumn>{user.role}</TableRowColumn>
          <TableRowColumn><a onClick={() => impersonateUser(user.id)} className="btn btn-info" href="#">Impersonar</a></TableRowColumn>
        </TableRow>
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
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>#</TableHeaderColumn>
                    <TableHeaderColumn>Nickname</TableHeaderColumn>
                    <TableHeaderColumn>Rol</TableHeaderColumn>
                    <TableHeaderColumn>Acciones</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                  {this.renderUsers(users, impersonateUser)}
                </TableBody>
              </Table>
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
