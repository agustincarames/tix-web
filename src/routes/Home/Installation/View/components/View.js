import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchUserInstallation } from 'store/domain/installation/actions';
import R from 'ramda';

class ViewInstallation extends Component {

  componentWillMount(){
  }

  renderNoInstallations(){
    return (
      <span class="label label-important">No hay instalaciones registradas en el sistema.</span>
    )
  }

  renderInstallations(installations){
    console.log(installations)
    return installations.map((installation) => (
      <tr>
        <td>{installation.name}</td>
        <td>{installation.publickey}</td>
        <td>
          <a className="btn btn-info" href="#">Editar</a>
          <a href="#" role="button" className="btn btn-danger deleteInstallationDialog">Eliminar</a>
        </td>
      </tr>
    ))
  }

  render() {
    return(
      <div className="hero-unit">
        <section id="tables">
          <div className="page-header">
            <h2>Mis instalaciones_</h2>
          </div>
              <table className="table table-bordered table-striped table-hover">
                <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Clave Publica</th>
                  <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                  {this.renderInstallations(this.props.installations)}
                </tbody>
              </table>
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
    loadInstallations: (userId) => dispatch(fetchUserInstallation(userId))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInstallation);
