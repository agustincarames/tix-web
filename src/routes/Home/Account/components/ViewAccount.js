import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class AdminView extends Component {
  render() {
    return(
      <div className="hero-unit">
        <div className="row-fluid">
					<span className="span12" >
						<h3>Usuario</h3>
					</span>
          <br />
          <span className="span12 breadcrumb">
						<h4>Editar informaci&oacute;n</h4>
						<div className="row-fluid">
							<form method="POST" action="edit">
								<div className="row-fluid">
									<div className="span3">
										<strong>Nickname: </strong><br />
									</div>
									<div className="span4">
										<input type="text" path="nickname" /><br />
									</div>
								</div>

								<div className="row-fluid">
									<div className="span3">
										<strong>Contrase&ntilde;a: </strong><br />
									</div>
									<div className="span4">
										<input type="password" path="password1" value="" /> <br />
									</div>
								</div>
								<button type="submit" className="btn btn-primary btn-mini">
									<i className="icon-ok icon-white"></i> Guardar cambios
								</button>
							</form>
							<br />
							<h4>Editar contrase&ntilde;a</h4>
							<form method="POST" action="changePassword">
								<br />
								<div className="row-fluid">
									<div className="span3">
										<strong>Original: </strong><br />
									</div>
									<div className="span4">
										<input type="password" path="originalPassword" /><br />
									</div>
								</div>
								<div className="row-fluid">
									<div className="span3">
										<strong>Nueva: </strong><br />
									</div>
									<div className="span4">
										<input type="password" path="newPassword" /><br />
									</div>
								</div>
								<button type="submit" className="btn btn-primary btn-mini">
									<i className="icon-ok icon-white"></i> Guardar cambios
								</button>
							</form>
						</div>
					</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminView);
