import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserInstallation, deleteInstallation } from 'store/domain/installation/actions';
import R from 'ramda';
import IconButton from 'material-ui/IconButton';
import Pencil from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class ViewInstallation extends Component {

  componentWillMount(){
  }

  renderNoInstallations(){
    return (
      <span class="label label-important">No hay instalaciones registradas en el sistema.</span>
    )
  }

  deleteInstallation(installationId, userId){
    this.props.deleteInstallation(userId, installationId);
  }

  renderInstallations(installations, userId){
    return installations.map((installation) => (
      <TableRow key={installation.id}>
        <TableRowColumn>{installation.name}</TableRowColumn>
        <TableRowColumn>{installation.publickey}</TableRowColumn>
        <TableRowColumn>
          <IconButton tooltip="Editar">
            <Pencil />
          </IconButton>
          <IconButton tooltip="Eliminar" onTouchTap={this.deleteInstallation.bind(this, installation.id, userId)}>
            <Delete />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    return(
      <div className="hero-unit">
        <section id="tables">
          <div className="page-header">
            <h2>Mis instalaciones_</h2>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Nombre</TableHeaderColumn>
                <TableHeaderColumn>Clave Publica</TableHeaderColumn>
                <TableHeaderColumn>Acciones</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {this.renderInstallations(this.props.installations, this.props.user.id)}
            </TableBody>
          </Table>
        </section>
      </div>
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
    deleteInstallation: (userId, installationId) => dispatch(deleteInstallation(userId, installationId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInstallation);
