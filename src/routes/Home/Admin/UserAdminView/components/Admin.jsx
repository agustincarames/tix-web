import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import R from 'ramda';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { fetchAllUsers, impersonateUser } from '../../../../../store/domain/account/actions';

class AdminView extends Component {

  componentWillMount() {
    this.props.fetchAllUsers();
  }

  renderUsers(users, impersonateUserFunc) {
    return users.map(user => (
      <TableRow key={user.id}>
        <TableRowColumn>{user.id}</TableRowColumn>
        <TableRowColumn>{user.username}</TableRowColumn>
        <TableRowColumn>{user.role}</TableRowColumn>
        <TableRowColumn>
          <span onTouchTap={() => impersonateUserFunc(user.id)} className='btn btn-info'>
            Impersonar
          </span>
        </TableRowColumn>
      </TableRow>
    ));
  }

  render() {
    const {
      users,
      impersonateUserFunc,
    } = this.props;

    return (
      <Card className='card-margins'>
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
            <TableBody displayRowCheckbox={false} showRowHover>
              {this.renderUsers(users, impersonateUserFunc)}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}

AdminView.propTypes = {
  users: PropTypes.arrayOf({
    id: PropTypes.string,
    username: PropTypes.sring,
    role: PropTypes.string,
  }),
  impersonateUserFunc: PropTypes.func,
  fetchAllUsers: PropTypes.func,
};

const mapStateToProps = store => ({
  users: R.pathOr([], ['account', 'users'], store),
});

const mapDispatchToProps = dispatch => ({
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  impersonateUserFunc: id => dispatch(impersonateUser(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminView);
