// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

/**************  connect to sql *********/
// var Connection = require('tedious').Connection;  
// var config = {  
//     server: 'SQLExpress.database.windows.net',  //update me
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'MCS', //update me
//             password: 'mcs'  //update me
//         }
//     },
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         encrypt: true,
//         database: 'SQLExpress'  //update me
//     }
// };  
// var connection = new Connection(config);  
// connection.on('connect', function(err) {  
//     // If no error, then good to proceed.
//     console.log("Connected");  
// });

// connection.connect();

const sql = require('mssql')

async function myQuery(){
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=MCS;User Id=MCS;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
        const result = await sql.query`select * from tblTagContent`
        console.dir(result)
    } catch (err) {
      console.log(err);
    }
}

// myQuery();

/*
app.get("/api/data1", (req, res) => {
  res.json({msg: [
    { id: 1, content:"test 1", Data_Time:"3/10/2022 18:21:00"},
    { id: 2, content:"test 2", Data_Time:"3/10/2022 18:21:10"},
    { id: 3, content:"test 3", Data_Time:"3/10/2022 18:21:20"},
    { id: 4, content:"test 4", Data_Time:"3/21/2022 18:21:30"},
    { id: 5, content:"test 5", Data_Time:"3/19/2022 18:21:40"},
    { id: 6, content:"test 66", Data_Time:"3/17/2022 18:21:50"},
    { id: 7, content:"test 91", Data_Time:"3/16/2022 18:21:00"},
    

]});
});
*/

// get 10.0.0.2
app.get("/api/data02", async (req, res) => {

  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
    // const result = await sql.query`SELECT * FROM tblTagContent WHERE  controller_ip='192.168.1.10'`

    const result = await sql.query`
    select tc.id, tc.tag_cont, tc.tag_add_dt, cl.description, tag.tagName
    from tblTagContent tc
    join tblController cl on tc.controller_ip = cl.ip_address 
    join tblTags tag on tc.tag_id = tag.id
    `

    // console.dir(result)
    console.log("request data02")
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

app.get("/api/fakeData02", (req, res) => {
  res.json({
    msg:[{"id":94,"tag_cont":"-0.1188251","tag_add_dt":"2022-03-07T07:34:08.297Z","description":"HondaBulket","tagName":"Nut 1"},
    {"id":95,"tag_cont":"-0.1808062","tag_add_dt":"2022-03-07T07:34:08.303Z","description":"HondaBulket","tagName":"Nut 2"},
    {"id":96,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.303Z","description":"HondaBulket","tagName":"Nut 3"},
    {"id":97,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.307Z","description":"HondaBulket","tagName":"Nut 4"},
    {"id":98,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.307Z","description":"HondaBulket","tagName":"Nut 5"},
    {"id":99,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.307Z","description":"HondaBulket","tagName":"Nut 6"},
    {"id":100,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.307Z","description":"HondaBulket","tagName":"Nut 7"},
    {"id":101,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.310Z","description":"HondaBulket","tagName":"Nut 8 "},
    {"id":102,"tag_cont":"0.29","tag_add_dt":"2022-03-07T07:34:08.310Z","description":"HondaBulket","tagName":"Nut 9"},
    {"id":103,"tag_cont":"0.02","tag_add_dt":"2022-03-07T07:34:08.310Z","description":"HondaBulket","tagName":"Nut 10"},
    {"id":104,"tag_cont":"0.06000001","tag_add_dt":"2022-03-07T07:34:08.310Z","description":"HondaBulket","tagName":"Nut 11"},
    {"id":105,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.310Z","description":"HondaBulket","tagName":"Nut 12"},
    {"id":106,"tag_cont":"1.13","tag_add_dt":"2022-03-07T07:34:08.313Z","description":"HondaBulket","tagName":"Nut 15"},
    {"id":107,"tag_cont":"6.65","tag_add_dt":"2022-03-07T07:34:08.313Z","description":"HondaBulket","tagName":"Nut 16"},
    {"id":108,"tag_cont":"0.35","tag_add_dt":"2022-03-07T07:34:08.313Z","description":"HondaBulket","tagName":"Nut 17"},
    {"id":109,"tag_cont":"0.45","tag_add_dt":"2022-03-07T07:34:08.313Z","description":"HondaBulket","tagName":"Nut 18"},
    {"id":110,"tag_cont":"0.27","tag_add_dt":"2022-03-07T07:34:08.313Z","description":"HondaBulket","tagName":"Nut 19"},
    {"id":111,"tag_cont":"0","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 20"},
    {"id":112,"tag_cont":"0.08000001","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 21"},
    {"id":113,"tag_cont":"0.06","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 22"},
    {"id":114,"tag_cont":"1.3","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 61"},
    {"id":115,"tag_cont":"1.25","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 62"},
    {"id":116,"tag_cont":"1.25","tag_add_dt":"2022-03-07T07:34:08.317Z","description":"HondaBulket","tagName":"Nut 63"},
    {"id":117,"tag_cont":"1.43","tag_add_dt":"2022-03-07T07:34:08.320Z","description":"HondaBulket","tagName":"Nut 64"},
    {"id":118,"tag_cont":"1.31","tag_add_dt":"2022-03-07T07:34:08.320Z","description":"HondaBulket","tagName":"Nut 65"},
    {"id":119,"tag_cont":"1.4","tag_add_dt":"2022-03-07T07:34:08.320Z","description":"HondaBulket","tagName":"Nut 66"},
    {"id":120,"tag_cont":"0.09000002","tag_add_dt":"2022-03-07T07:34:08.320Z","description":"HondaBulket","tagName":"Nut 81"}]
});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
