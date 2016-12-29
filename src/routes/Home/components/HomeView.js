import React from 'react'
import LogoTix from '../assets/LogoTix.png'
import './HomeView.scss'

export const HomeView = () => (
  <div className="margin-fix">

    <div className="row-fluid">
      <div className="col-md-6">
        <h3>Proyecto TiX</h3>
        <div className="thumb_image">
          <img alt="Logo Tix" src={ LogoTix } />
        </div>
        <div className="row caption pull-left head">
          <div className="col-md-12">
            <h4>
              { `Qué es el Proyecto Tix?` }
            </h4>
            <p>
              {
                `TiX (Traffic information eXchange) es una herramienta que
                permite efectuar una medición de la calidad de su acceso a
                Internet.`
              }
            </p>
            <a className="btn btn-info btn-large" disabled href="#">Instalar TiX</a>

          </div>
        </div>
        <div className="clear"></div>


      </div>
      <div className="col-md-6">
        <h3>{ `Iniciar sesión` }</h3>
        <div className="form-horizontal well">
          <form action="../login/login" method="POST">
              <div className="control-group">
                <label className="control-label" for="nickname">Email</label>
                <div className="controls">
                  <input type="text" id="nickname" className="" path="nickname" />
                </div>
              </div>

              <div className="control-group">
                <label className="control-label" for="password">{ `Contraseña` }</label>
                <div className="controls">
                  <input type="password" id="password" className="" path="password" />
                  <br />
                  <a href="#">
                    { `Olvidó su contraseña?` }
                  </a>
                </div>
              </div>
              <div className="control-group">
                <div className="controls">
                  <input className="btn btn-primary btn-large" disabled type="submit" value="Enviar" />
                </div>
              </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h4>
            { `Cuál es el objetivo?` }
          </h4>
          <p>
            {
              `El algoritmo ejecuta la medición enviando un paquete
              de datos por segundo, asegurando un consumo inperceptible de su
              conexión a Internet y permitiendo un monitoreo las 24hs del
              día y los 365 días del año.`
            }
          </p>
        </div>
        <div className="col-md-4">
          <h4>
            { `Qué resultados arroja?` }
          </h4>
          <p>
            {
              `Las mediciones se realizan todo el tiempo, generando un
              informe, tanto en formato web interactivo como en PDF mensual,
              detallando los momentos en que su proveedor de Internet no puede
              entregarle el tráfico máximo contratado.`
            }
          </p>
        </div>
        <div className="col-md-4">
          <h4>
            { `Cómo puedo usar TiX?` }
          </h4>
          <p>
            {
              `Puede crear su cuenta e instalar el software de medición en
              su PC y/o computadora portátil aquí: `
            }
            <a className="btn btn-info" disabled href="#">Instalar TiX</a>
          </p>
        </div>
      </div>
      <hr />
    </div>
  </div>
);

export default HomeView
