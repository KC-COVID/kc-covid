import React from 'react';
import { useForm } from 'react-hook-form';

function VolunteerForm() {
  const { register, handleSubmit, errors, watch } = useForm();
  // Errors look like: {irstName: {type: "maxLength", message: "", ref: {} }}

  const onSubmit = (data) => {
    // TODO trim data
    console.log('Data', JSON.stringify(data));
  };

  const showExtraFields = watch('showExtra');

  // TODO state options
  // TODO services fields
  // TODO number range for age
  // Do we want any more validations?
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        aria-invalid={errors.firstName ? 'true' : 'false'}
        aria-describedby="error-name-required"
        ref={register({ required: true, maxLength: 80 })}
      />
      <span
        role="alert"
        id="error-name-required"
        style={{ display: errors.firstName && errors.firstName.type === 'required' ? 'block' : 'none' }}
      >
        This is required
      </span>

      <label htmlFor="middleName">Middle Name</label>
      <input type="text" name="middleName" id="middleName" ref={register} />

      <label htmlFor="lastName">Last Name</label>
      <input type="text" name="lastName" id="middleName" ref={register({ required: true, maxLength: 100 })} />

      <label htmlFor="phone1">Phone Number 1</label>
      <input type="tel" name="phone1" id="phone1" ref={register} />

      <label htmlFor="phone2">Phone Number 2</label>
      <input type="tel" name="phone2" id="phone2" ref={register} />

      <label htmlFor="age">Age Range</label>
      <input type="range" name="age" id="age" ref={register} />

      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" ref={register({ pattern: /^\S+@\S+$/i })} />

      <label htmlFor="address1">Address Line 1</label>
      <input type="text" name="address1" id="address1" ref={register} />

      <label htmlFor="address2">Address Line 2</label>
      <input type="text" name="address2" id="address2" ref={register} />

      <label htmlFor="city">City</label>
      <input type="text" name="city" id="city" ref={register} />

      <label htmlFor="state">State</label>
      <select name="state" id="state" ref={register} />

      <label htmlFor="zip">Zip Code</label>
      <input type="number" name="zip" id="zip" ref={register} />

      <label htmlFor="showExtra">Show Extra Fields</label>
      <input type="checkbox" name="showExtra" id="showExtra" ref={register} />

      {showExtraFields && (
        <div>
          <label htmlFor="extra">The Extra Fields</label>
          <input type="state" name="extra" id="extra" ref={register} />
        </div>
      )}

      <input type="submit" />
    </form>
  );
}

export default VolunteerForm;
