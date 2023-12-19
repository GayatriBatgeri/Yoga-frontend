import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false); 
  const [validationErrors, setValidationErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // client-side validation
    console.log(validationErrors);
    const errors = {};
    if (!isValidName(name)) {
      errors.mes = 'Please enter a valid name';
    }

    if (!isValidAge(age)) {
      errors.mes = 'Please enter a valid age between 18 and 65';
    }

    if (!isValidEmail(email)) {
      errors.mes = 'Please enter a valid email address';
    }

    if (!gender || !batch) {
      errors.mes = 'Please fill in all fields';
    }
    console.log(Object.keys(errors));
    if (Object.keys(errors).length > 0) {
      alert(errors.mes);
      return;
    }

    setValidationErrors({});
    setShowPaymentConfirmation(true);
  };
  
  const isValidName = (input) => {
     return /^[a-zA-Z ]+$/.test(input);
  };

  const isValidAge = (input) => {
    const parsedAge = parseInt(input);
    return !isNaN(parsedAge) && parsedAge >= 18 && parsedAge <= 65;
  };

  const isValidEmail = (input) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };
  const handlePaymentConfirm = async () => { 

    try{
        //fetching API from backend
        const response = await fetch('https://yoga-backend-t5rc.onrender.com/api/register' , {
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({
                name,age:parseInt(age),
                gender,
                batch,
                email,
            }),
        }
            );
            const responseData = await response.json();
            alert(`Bravo ${name} your ${responseData.message}`);
            // console.log('API Response : ',responseData);
            resetForm();

    }catch(error){
        console.error('Error while Submitting the form : ',error.message);
    }
   
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setGender('');
    setBatch('');
    setEmail('');
    setShowPaymentConfirmation(false);
  };

  return (
    <div>
      <h2>Yoga Class Admission Form</h2>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <img
          src="https://images.news18.com/ibnlive/uploads/2022/02/yoga-16438883924x3.jpg"
          alt="Person doing exercise"
          style={{ width: '120px', height: '120px', borderRadius: '8px' }}
        />
      </div>
      {!showPaymentConfirmation && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Age:
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
          <br />
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <br />
          <label>
            Batch:
            <select value={batch} onChange={(e) => setBatch(e.target.value)}>
              <option value="">Select Batch</option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <button type="submit">Proceed to Payment</button>
        </form>
      )}

      {showPaymentConfirmation && (
        <div id='payment'>
          <p>Please confirm your payment details : </p>
          <p>Total Fee : ₨ 500</p>
          <button onClick={handlePaymentConfirm} style={{width:"300px"}}>Confirm Payment</button>
        </div>
      )}
    </div>
  );
};

export default Form;
