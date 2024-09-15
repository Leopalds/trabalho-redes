const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const voter_id = document.getElementById('voter-id').value;

  if (!jsbrasil.validateBr.titulo(voter_id)) {
    alert('Invalid voter ID');
    return
  }
    
  const password = document.getElementById('password').value;
  const confirmationPass = document.getElementById('corfimation-password').value;
  const token = voter_id;

    if (password !== confirmationPass) {
        alert('Passwords do not match');
        return;
    }

  const headers = {
    'method': "GET",
    'Authorization': `Bearer ${token}`,
  };

  fetch(`http://127.0.0.1:8000/signup?voter_id=${voter_id}&password=${password}`, { headers })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Sign up failed');
    }
  })
  .then(data => {
      localStorage.setItem('voter_id', voter_id);
      localStorage.setItem('jwtTokenVoter', data.token);
      window.location.replace(`http://127.0.0.1:8080/index.html?Authorization=Bearer ${localStorage.getItem('jwtTokenVoter')}`);
  })
  .catch(error => {
    console.error('Sign up failed:', error.message);
  });
});
