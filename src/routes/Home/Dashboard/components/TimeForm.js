import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import './Dashboard.scss';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import { DatePicker } from 'redux-form-material-ui'

class SelectDate extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
    <Paper style={{marginTop: '15px'}} zDepth={1}>
      <form className="form-alignment" onSubmit={handleSubmit}>
        <Field format={null} name="startDate"  component={DatePicker} dateFormat="YYY-MM-DD" floatingLabelText="Fecha Inicio"  />
        <Field format={null} name="endDate"  component={DatePicker} dateFormat="YYY-MM-DD" floatingLabelText="Fecha Final"  />
        <button className="btn btn-primary btn-large" type="submit" >Filtrar</button>
      </form>
    </Paper>)
  }
}

SelectDate = reduxForm({
  form: 'selectDate',
  initialValues: {startDate: new Date(moment().subtract(1, 'days')), endDate: new Date(moment())}
})(SelectDate);

export default SelectDate;
