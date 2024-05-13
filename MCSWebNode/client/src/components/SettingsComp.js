import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SettingsComp({reportSendTo, setReportSendTo, setAlertType, setAlertMsg, setAlertOpen}) {

  // when click shift report send test email button
  const clickShiftReportSendTestEmailButton = () =>{
    fetch("/api/settings/sendTestEmailToReportTo", {
      method: "POST",
      headers: {"Content-Type": "application/JSON"},
      body: JSON.stringify({"emailReportSendTo":reportSendTo}) 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === "success") {
          console.log(data)
          setAlertType(data.success);
          setAlertMsg("Test eamil is sent to " + reportSendTo);
          setAlertOpen(true);
        }
        else {
          console.log(data)
          setAlertType(data.success);
          setAlertMsg("Test eamil failed to send to " + reportSendTo);
          setAlertOpen(true);
        }
      })
      .catch((error) => {
        setAlertType("error");
        setAlertMsg("Cannot send test email.");
        setAlertOpen(true);
        console.log('Error: cannot send test email.');
        console.log(error);
      }); 

  };

  return (
    <div>
      <h2>Email Report Settings</h2>
      <TextField id="report-send-to" label="Shift Report Send To" variant="outlined" sx={{ m: 1, width: '600px' }}
        value={reportSendTo}
        onChange={(event) => {
          setReportSendTo(event.target.value);
        }}
        helperText="Use a comma to separate email addresses, for example: example1@test.com, example2@test.com."
      />
      
      <Button sx={{mt:2, ml:2}} variant="outlined" onClick={()=>{clickShiftReportSendTestEmailButton();}}>Send Test email</Button>
    </div>
  );
}
