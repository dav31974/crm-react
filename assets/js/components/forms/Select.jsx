import React from 'react';

const Select = ({label, name, value, errorMess = "", onChange, children}) => {
    return ( 
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select onChange={onChange} name={name} id={name} value={value} className={"form-control" + (errorMess && " is-invalid")}>
            {children}
        </select>
        <p className="invalid-feedback">{errorMess}</p>
    </div> 
    );
}
 
export default Select;