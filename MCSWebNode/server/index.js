// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

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
    console.log("request data02");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});


// API to get first page's data
app.get("/api/data01", async (req, res) => {

  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
    // const result = await sql.query`SELECT * FROM tblTagContent WHERE  controller_ip='192.168.1.10'`

    const result = await sql.query`
    select *
    from tblParts
    `

    // console.dir(result)
    console.log("request data01");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get station10 data in one serical number
app.get("/api/station10/:id", async (req, res) => {
  let {id} = req.params;


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 10 and pa.id = ' + id + ' order by PartId, StationId, TagId');

    console.log("request station10 " + id);
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get station20 data in one serical number
app.get("/api/station20/:id", async (req, res) => {
  let {id} = req.params;


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 20 and pa.id = ' + id + ' order by PartId, StationId, TagId');

    console.log("request station20 " + id);
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get station30 data in one serical number
app.get("/api/station30/:id", async (req, res) => {
  let {id} = req.params;


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 30 and pa.id = ' + id + ' order by PartId, StationId, TagId');

    console.log("request station30 " + id);
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get station40 data in one serical number
app.get("/api/station40/:id", async (req, res) => {
  let {id} = req.params;


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40 and pa.id = ' + id + ' order by PartId, StationId, TagId');

    console.log("request station40 " + id);
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

/*********** 获得某一station所有时间段的数据 *********** */ 

// API to get all station10 data 
app.get("/api/station10-allData", async (req, res) => {


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 10  order by PartId, StationId, TagId');

    console.log("request station10 all data");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get all station20 data
app.get("/api/station20-allData", async (req, res) => {


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 20  order by PartId, StationId, TagId');

    console.log("request station20 all data");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get all station30 data
app.get("/api/station30-allData", async (req, res) => {


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 30  order by PartId, StationId, TagId');

    console.log("request station30 all data");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});

// API to get all station40 data
app.get("/api/station40-allData", async (req, res) => {


  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect('Server=localhost,1433;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')

    const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40  order by PartId, StationId, TagId');

    console.log("request station40 all data");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});








//read data from results.json (某一天的全部数据)
app.get("/api/fakeData02", (req, res) => {
  const jsondata = require('./results.json')
  res.json(jsondata);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
