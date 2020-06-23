import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  //return shows in the field component
  renderInput = ({ input, label, meta }) => {
    //Tenerary operator to display error message on fields like renderError
    const className = `field ${meta.error && meta.touched}` ? "Error" : "";
    //{...formProps} gives all the props of formProps.input to input
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)};
      </div>
    );
  };

  //submission w/ Redux forms...easy and clean
  //sends formValues to createStream as (action creator) -> axios -> sends formValues to DB.json
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        {/* FIELD component ONLY hooks up the elements/DOM to the redux form system.
          component displays the actual react element/function
          
          additional props on field get sent into the INPUT component
      */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//Validation/requirements for all Fields
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title required.";
  }

  if (!formValues.description) {
    errors.description = "Description required.";
  }

  return errors;
};

//reduxForm just like redux connect. Receives one object w/ multiple configs
export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
