import React from "react";

import "../Style/Form.css";

const Form = ({submit, input, handleChange, clickGPS}) => (
    <div className="form-container">
        <form onSubmit={submit}>
                <input type="text" value={input} onChange={handleChange} placeholder="Enter your city" />
                <button type="submit" className="submit-button">Search</button>  
            </form>
    </div>
)

export default Form;