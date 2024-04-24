// server/index.js
// import { getCurrentShiftTimeStr, getLastShiftTimeStr, getLastTwoShiftTimeStr } from './ShiftCalculator';
const shiftCalculator = require("./ShiftCalculator");
var configData = require('../config.json')

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// app.use(express.json({ limit: "100mb" }));

// create application/json parser
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

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
        var con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
        console.dir("Database is Connected.")
        await con.close();
    } catch (err) {
      console.log(err);
    }
}

myQuery();


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
    await sql.connect('Server=localhost\\SQLExpress;Database=MCS;User Id=mcs;Password=mcs;Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;')
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
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
    // const result = await sql.query`SELECT * FROM tblTagContent WHERE  controller_ip='192.168.1.10'`

    const result = await sql.query`
    exec [dbo].[spGetHeadByStation] 10
    `

    // console.dir(result)
    console.log("request data01");
    await con.close();
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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 10 and pa.id = ' + id + ' order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetStationDetail ' + id + ",'10'");
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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 20 and pa.id = ' + id + ' order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetStationDetail ' + id + ",'20'");

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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 30 and pa.id = ' + id + ' order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetStationDetail ' + id + ",'30'");

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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40 and pa.id = ' + id + ' order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetStationDetail ' + id + ",'40'");

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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 10  order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetTagDetail 10');


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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 20  order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetTagDetail 20');

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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 30  order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetTagDetail 30');

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

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40  order by PartId, StationId, TagId');
    const result = await sql.query( 'exec dbo.spGetTagDetail 40');

    console.log("request station40 all data");
    res.json(result.recordsets[0]);
  } catch (err) {
    console.log(err);
  }

});




//***************************** summary page APIs *********************************/

// API All stations average sum time
app.get("/api/AverageCycleTimeByStations", async (req, res) => {


  console.log("request /api/AverageCycleTimeByStations");
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 19:04:50"));
    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40  order by PartId, StationId, TagId');
    const result = await sql.query(
      "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
      "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
      "') exec [dbo].[spGetAverageCycleTimeByStations] @start, @end"
      );


    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }

    res.json(result.recordsets[0]);

    await con.close();

  } catch (err) {
    console.log(err);
  }

});


// API All stations sum fault time
app.get("/api/SumFaultTimeByStations", async (req, res) => {


  console.log("request /api/SumFaultTimeByStations");
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 19:04:50"));
    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    const result = await sql.query(
    "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') exec [dbo].[spGetSumFaultTimeByStations] @start, @end"
    );

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }

    res.json(result.recordsets[0]);

    await con.close();

  } catch (err) {
    console.log(err);
  }

});


// API current shift pass fail counts
app.get("/api/CurrentShiftPassFailCounts", async (req, res) => {


  console.log("request /api/CurrentShiftPassFailCounts");
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 19:04:50"));
    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    const result = await sql.query(
    "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') exec [dbo].[spGetShiftCount] '" + configData.allLines[configData.currentLineIndex].name + "', @start, @end"
    );


    result.recordsets[0][0].shift = shiftArr[2];
    res.json(result.recordsets[0]);

    await con.close();

  } catch (err) {
    console.log(err);
  }

});

// API last shift pass fail counts
app.get("/api/LastShiftPassFailCounts", async (req, res) => {


  console.log("request /api/LastShiftPassFailCounts");
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 10:04:50"));
    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    const result = await sql.query(
    "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') exec [dbo].[spGetShiftCount] '" + configData.allLines[configData.currentLineIndex].name + "', @start, @end"
    );


    result.recordsets[0][0].shift = shiftArr[2];
    res.json(result.recordsets[0]);

    await con.close();

  } catch (err) {
    console.log(err);
  }

});

// API last two shift pass fail counts
app.get("/api/LastTwoShiftPassFailCounts", async (req, res) => {


  console.log("request /api/LastTwoShiftPassFailCounts");
  try {
    // make sure that any items are correctly URL encoded in the connection string
    let con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 03:04:50"));
    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    const result = await sql.query(
    "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') exec [dbo].[spGetShiftCount] '" + configData.allLines[configData.currentLineIndex].name + "', @start, @end"
    );

    result.recordsets[0][0].shift = shiftArr[2];
    res.json(result.recordsets[0]);

    await con.close();

  } catch (err) {
    console.log(err);
  }

});

// API get all line names
app.get("/api/GetAllLinesNames", async (req, res) => {


  console.log("request /api/GetAllLinesNames");
  
  let result = [];
  for (let i=0; i<configData.allLines.length; i++){
    result.push({"label": configData.allLines[i].name});
  }
  res.json({"result": result, "currentLineIndex": configData.currentLineIndex});

});

// API change current project line
app.get("/api/ChangeProjectLine/:lineName", async (req, res) => {

  console.log("requir /api/ChangeProjectLine/" + req.params.lineName);
  
  for (let i=0; i<configData.allLines.length; i++){
    if (configData.allLines[i].name === req.params.lineName){
      configData.currentLineIndex = i;
    }
  }

  

  let configDataStr = JSON.stringify(configData, null, 4);
  var fs = require('fs');
  fs.writeFile('./config.json', configDataStr, 'utf8', ()=>{});

  res.json({"message": "Success", "IndexAfterChange": configData.currentLineIndex});

});




//***************************** query page APIs *********************************/
// API get query page data
var config = {
  user: "mcs",
  password: "mcs",
  database: "MCS",
  server: 'localhost', 
  requestTimeout: 300000,
  pool: {
    max: 10,
    min: 5,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    trustedConnection: true
  }
};
app.post("/api/QueryPage/getQueryByDateRange", jsonParser, async (req, res) => {
  console.log("requir /api/QueryPage/getQueryByDateRange");
  console.log(req.body);
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    // const request = new sql.Request();
    // request.input('pStartTime', sql.DateTime, req.body.start);
    // request.input('pEndTime', sql.DateTime, req.body.end);
    // const result = await request.execute("dbo.spGetTagQuery");


    // const result = await sql.query(
    //   "declare @start datetime = CONVERT(DATETIME,'" + req.body.start + 
    //   "') declare @end datetime = CONVERT(DATETIME,'" + req.body.end + 
    //   "') exec [dbo].[spGetTagQuery] @start, @end "
    // );
    const result = await sql.query(
      "exec [dbo].[spGetTagQuery] @pStartTime = '" + req.body.start + "', @pEndTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/QueryPage/getQueryByDateRange");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});


app.get("/api/QueryPage/stationAndTagTitleMapping", async (req, res) => {

  

  console.log("requir /api/QueryPage/stationAndTagTitleMapping");
  
  try {
    let con = await sql.connect(config);

    const result = await sql.query(`
      SELECT tagName, ISNULL(tagTitle, tagName) AS tagTitle FROM tblFullTag WITH(NOLOCK)
    `);
    
    // console.log(result.recordsets[0]);
    res.json(result.recordsets[0]);

    await con.close();
    

  } catch (err) {
    console.log(err);
  }

});







//***************************** analysis page APIs *********************************/
app.get("/api/AnalysisPage/getAllTagNames", async (req, res) => {
  console.log("requir /api/AnalysisPage/getAllTagNames");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "EXEC spGetAllFullTagNames;"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/AnalysisPage/getAllTagNames");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});

app.post("/api/AnalysisPage/getDataAndTimeByTagName", jsonParser, async (req, res) => {
  console.log("requir /api/AnalysisPage/getDataAndTimeByTagName");
  console.log(req.body);
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spGetTagContentByTagName] @tagName = '" + req.body.tagName + "', @startTime = '" + req.body.start + "', @endTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    // for (let i=0; i<result.recordsets[0].length; i++){
    //   result.recordsets[0][i].id = i;
    // }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/AnalysisPage/getDataAndTimeByTagName");
    await con.close();

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
