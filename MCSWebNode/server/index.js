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
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=MCS;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
    const result = await sql.query`SELECT * FROM tblTagContent WHERE  controller_ip='10.0.0.2'`
    // console.dir(result)
    console.log("request data02")
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

app.get("/api/fakeData02", (req, res) => {
  res.json({
    msg:[{"id":8,"tag_cont":"test1","tag_add_dt":"2022-03-10T21:52:11.257Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":9,"tag_cont":"test2","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":10,"tag_cont":"test3","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":11,"tag_cont":"test4","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":12,"tag_cont":"test5","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":13,"tag_cont":"test6","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null},
  {"id":14,"tag_cont":"test7","tag_add_dt":"2022-03-10T21:56:35.740Z","controller_ip":"10.0.0.2","category_id":null}]
});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
