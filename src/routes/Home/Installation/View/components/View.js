import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserInstallation, deleteInstallation, editInstallationName } from 'store/domain/installation/actions';
import R from 'ramda';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import InstallationListView from './InstallationListView'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class ViewInstallation extends Component {

  componentWillMount(){
  }

  renderNoInstallations(){
    return (
      <span className="label label-important">No hay instalaciones registradas en el sistema.</span>
    )
  }

  renderTable(){
    const {
      installations,
      deleteInstallation,
      editInstallation,
      user
    } = this.props;

    if(installations.length == 0){
      return this.renderNoInstallations();
    }
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Nombre</TableHeaderColumn>
            <TableHeaderColumn>Clave Publica</TableHeaderColumn>
            <TableHeaderColumn>Acciones</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          { Object.keys(installations).map((key) =>
            <InstallationListView installation={ installations[key] } deleteInstallation={ deleteInstallation } userId={ user.id } editInstallation={ editInstallation } />
          )}
        </TableBody>
      </Table>
    )
  }

  render() {


    return(
      <Card className="card-margins">
        <CardTitle
          title='Mis Instalaciones'
        />
        <CardText>
          {this.renderTable()}
        </CardText>
      </Card>
    )
  }
}

const mapStateToProps = (store) => ({
  user: store.account.user,
  installations: R.pathOr([], ["installations","list"], store)
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadInstallations: (userId) => dispatch(fetchUserInstallation(userId)),
    deleteInstallation: (userId, installationId) => dispatch(deleteInstallation(userId, installationId)),
    editInstallation: (userId, installationId, name) => dispatch(editInstallationName(userId, installationId, name))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInstallation);
