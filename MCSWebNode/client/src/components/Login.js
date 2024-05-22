import * as React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

async function loginUser(credentials) {
  return fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = ({ onLogin }) => {

  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username: username,
      password: password
    });
    if (token.name){
      setAlertOpen(true);
      setAlertType("success");
      setAlertMsg("Welcome " + token.name + "!");
      onLogin(token);
    }
    else {
      setAlertOpen(true);
      setAlertType("error");
      setAlertMsg("Wrong username or password, please try again.");
    }
  }


  
  // alart 
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const [alertType, setAlertType] = React.useState("error");
  const [alertMsg, setAlertMsg] = React.useState("");




  return (
    <div style={{paddingLeft:"16px"}}>
      
      <Snackbar open={alertOpen} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} >
          <Alert onClose={handleAlertClose} severity={alertType}>
              {alertMsg}
          </Alert>
      </Snackbar>

      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div style={{paddingTop:"16px"}}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    
  );
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
