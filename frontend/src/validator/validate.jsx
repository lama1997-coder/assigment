{
    email: function validateEmail(value){

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }

    }
}