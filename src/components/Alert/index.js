import React from 'react'

export const Alert = ({message, id, removeAlert}) => (
  <div className="alert alert-warning alert-dismissible fade in" role="alert">
    <button type="button" className="close" aria-label="Close" onClick={() => removeAlert(id)}>
      <span aria-hidden="true">×</span>
    </button>
    {message}
  </div>

);

export default Alert
