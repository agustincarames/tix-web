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
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

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
      <Card className="card-margins">
        <CardTitle
          title='Administración de usuarios'
          subtitle='Visualizar e Impersonalizar los usuarios del sistema'
        />
        <CardText>
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
        </CardText>
      </Card>
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
