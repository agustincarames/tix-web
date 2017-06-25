import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem'
import {
  DatePicker,
  TextField,
  SelectField
} from 'redux-form-material-ui'
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class FiltersForm extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <Card className="card-margins">
        <CardTitle
          title='Filtros de reporte'
        />
        <CardText>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <Field format={null} name="startDate"  component={DatePicker} floatingLabelText="Fecha Inicio"  />
                <Field format={null}  component={DatePicker} floatingLabelText={'Fecha Fin'}  name="endDate" />
              </div>
              <div className="col-md-4">
                <Field name="dayOfWeek" component={SelectField} floatingLabelText="Dia de la semana" >
                  <MenuItem value="0" primaryText="Todos"/>
                  <MenuItem value="1" primaryText="Lunes"/>
                  <MenuItem value="2" primaryText="Martes"/>
                  <MenuItem value="3" primaryText="Miercoles"/>
                  <MenuItem value="4" primaryText="Jueves"/>
                  <MenuItem value="5" primaryText="Viernes"/>
                  <MenuItem value="6" primaryText="Sabado"/>
                  <MenuItem value="7" primaryText="Domingo"/>
                </Field>
                <Field name="ips" component={SelectField} floatingLabelText="ISP" >
                  <MenuItem value="0" primaryText="Todos"/>
                </Field>
              </div>
              <div className="col-md-4">
                <Field name="startTime"  component={TextField} floatingLabelText="Hora Inicio" />
                <Field component={TextField} floatingLabelText={'Hora Final'}  name="endTime" />
              </div>
            </div>
            <RaisedButton className="settings-button-margin" label="Filtrar" type="submit">
            </RaisedButton>
          </form>
        </CardText>
      </Card>
    )
  }
}

FiltersForm = reduxForm({
  form: 'usernameForm',
})(FiltersForm);

export default FiltersForm;
