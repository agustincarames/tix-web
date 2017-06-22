import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import './Dashboard.scss';

class SelectDate extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
      <form className="form-alignment" onSubmit={handleSubmit}>
        <div className="control-group">
          <label className="control-label" for="start-date">Start Date:</label>
          <div className="controls">
            <Field type="date" component="input" name="startDate" />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" for="end-date">End Date:</label>
          <div className="controls">
            <Field type="date" component="input" name="endDate" />
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <button className="btn btn-primary btn-large" type="submit" >Filtrar</button>
          </div>
        </div>
      </form>
    </div>)
  }
}

SelectDate = reduxForm({
  form: 'selectDate'
})(SelectDate);

export default SelectDate;
