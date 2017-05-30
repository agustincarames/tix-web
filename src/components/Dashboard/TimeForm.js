import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

class SelectDate extends Component {

  render(){
    const { handleSubmit } = this.props;
    return(
      <div>
      <form onSubmit={handleSubmit}>
        <div className="control-group">
          <label className="control-label" for="start-date">Start Date</label>
          <div className="controls">
            <Field type="date" component="input" name="start-date" />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label" for="end-date">End Date</label>
          <div className="controls">
            <Field type="date" component="input" name="end-date" />
          </div>
        </div>
        <div className="control-group">
          <div className="controls">
            <button className="btn btn-primary btn-large" type="submit" >Enviar</button>
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
