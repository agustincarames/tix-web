import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserInstallation, deleteInstallation } from 'store/domain/installation/actions';
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
import InstallationNameForm from './InstallationNameForm';

class InstallationListView extends Component {

  componentWillMount(){
    this.setState({editInstallatio: false})
  }

  deleteInstallation(installationId, userId){
    this.props.deleteInstallation(userId, installationId);
  }

  toggleEditInstallation(){
    this.setState({editInstallation: !this.state.editInstallation});
  }

  editInstallation(result) {
    const {
      editInstallation,
      installation,
      userId
    } = this.props;
    editInstallation(userId, installation.id, result.installationName).then(() => this.toggleEditInstallation());

  }

  renderInstallationName(){
    if(this.state.editInstallation) {
      return <InstallationNameForm
        onSubmit={this.editInstallation.bind(this)}
        installation={this.props.installation}
        toggleEditInstallation={this.toggleEditInstallation.bind(this)}
      />
    }
    return this.props.installation.name;
  }

  render() {
    const {
      installation,
      userId
    } = this.props;

    return (
      <TableRow key={installation.id}>
        <TableRowColumn>{this.renderInstallationName()}</TableRowColumn>
        <TableRowColumn>{installation.publickey}</TableRowColumn>
        <TableRowColumn>
          <IconButton onTouchTap={this.toggleEditInstallation.bind(this, installation)} >
            <Pencil />
          </IconButton>
          <IconButton onTouchTap={this.deleteInstallation.bind(this, installation.id, userId)}>
            <Delete />
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default InstallationListView
