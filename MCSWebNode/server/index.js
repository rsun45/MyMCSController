// server/index.js
// import { getCurrentShiftTimeStr, getLastShiftTimeStr, getLastTwoShiftTimeStr } from './ShiftCalculator';
const path = require('path');
const shiftCalculator = require("./ShiftCalculator");

const serverConfigPath = path.join(__dirname, '../config.json')
var configData = require(serverConfigPath);

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));



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
        // var con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
        await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
        console.dir("Database is Connected.")
        // await con.close();
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

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-05-01 14:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
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

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-05-01 14:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
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

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-11 14:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
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

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 14:00:00"));
    let inputDT = new Date();
    inputDT.setHours(inputDT.getHours()-8);
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDT);
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

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-12 14:00:00"));
    let inputDT = new Date();
    inputDT.setHours(inputDT.getHours()-16);
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDT);
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
  res.json({"result": result, "currentLineIndex": configData.currentLineIndex, "refreshTimer": configData.refreshTimer});

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
  fs.writeFile(serverConfigPath, configDataStr, 'utf8', ()=>{});

  res.json({"message": "Success", "IndexAfterChange": configData.currentLineIndex});

});




//***************************** query page APIs *********************************/
// API get query page data
var config = {
  user: configData.allLines[configData.currentLineIndex].dbUser,
  password: configData.allLines[configData.currentLineIndex].dbPassword,
  database: configData.allLines[configData.currentLineIndex].dbDataBase,
  server: configData.allLines[configData.currentLineIndex].dbServer,
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

    // const result = await sql.query(`
    //   SELECT tagName, ISNULL(tagTitle, tagName) AS tagTitle FROM tblFullTag WITH(NOLOCK)
    // `);
    
    const result = await sql.query("exec [dbo].[sp_GetTagTitles] ;");
    
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











//***************************** result page APIs *********************************/

app.post("/api/ResultPage/getStationStatusByDateRange", jsonParser, async (req, res) => {
  console.log("requir /api/ResultPage/getStationStatusByDateRange");
  console.log(req.body);
  try {
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[GetStationStatusBySerial] @StartTime = '" + req.body.start + "', @EndTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/ResultPage/getStationStatusByDateRange");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});


app.post("/api/ResultPage/getDataBySerial", jsonParser, async (req, res) => {
  console.log("requir /api/ResultPage/getDataBySerial");
  console.log(req.body);
  try {
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spGetTagOnePartForOther] @pSerialNumber = '" + req.body.serialNumber +  "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/ResultPage/getDataBySerial");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});





//***************************** stack bar chart page APIs *********************************/

// get stations list, return string array stores all station number names e.g. ["10Operator", "10Weld", "20L"...]
app.get("/api/MonitorPage/getStationNumberList", async (req, res) => {

  console.log("requir /api/MonitorPage/getStationNumberList");
  
  try {
    let con = await sql.connect(config);

    // const result = await sql.query(`
    //   SELECT DISTINCT (tagName) tagName FROM tblFullTag WITH(NOLOCK)
    // `);

    const result = await sql.query("exec [dbo].[sp_GetTagTitles] ;");
    
    // console.log(result.recordsets[0]);
    let final = [];
    for (const it of result.recordsets[0]){
      let tempStr = it.tagName.split("Data")[0];
      if (!final.includes(tempStr)){
        final.push(tempStr);
      }
    }

    res.json({"result": final});

    await con.close();
    

  } catch (err) {
    console.log(err);
  }

});


app.post("/api/MonitorPage/getTotalOperationalTimeByStationAndSerial", jsonParser, async (req, res) => {
  console.log("requir /api/MonitorPage/getTotalOperationalTimeByStationAndSerial");
  console.log(req.body);
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spGetTotalOperationalTimeByStationAndSerial] @stationIdentifier = '" + req.body.tagName + "', @startTime = '" + req.body.start + "', @endTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    // console.log(result.recordsets[0]);
    let final = [];
    for (const it of result.recordsets[0]){
      if (it.serial_number === ''){
        continue;
      }
      
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "totalTimeValue": it.TotalOperationalTime, "totalTimeFeild": "Total Operational Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.InputTime, "timeFeild": "Input Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.OutputTime, "timeFeild": "Output Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.MachineTime, "timeFeild": "Machine Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.TransferTime, "timeFeild": "Transfer Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.OperatorTime, "timeFeild": "Operator Time"});
      final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.FaultTime*-1, "timeFeild": "FaultTime"});
    }

    
    res.json(final);

    console.log("Finish /api/MonitorPage/getTotalOperationalTimeByStationAndSerial");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});


// get baseline value for all bar charts
app.get("/api/MonitorPage/getBaselineValue", async (req, res) => {

  console.log("requir /api/MonitorPage/getBaselineValue");
  
  try {
    let con = await sql.connect(config);

    const result = await sql.query(`
      SELECT * FROM tblLineParameter;
    `);

    res.json({"baselineValue": result.recordsets[0][0].CycleTime});

    await con.close();
    

  } catch (err) {
    console.log(err);
  }

});





//***************************** email reports code *********************************/

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: configData.emailConfig.host,
  port: configData.emailConfig.port,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: configData.emailConfig.user,
    pass: configData.emailConfig.pass
  }
});

// var mailOptions = {
//   from: configData.emailConfig.from,
//   to: configData.emailConfig.reportTo,
//   subject: 'Sending Email using Node.js',
//   text: 'test'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });



// API get email settings values
app.get("/api/settings/getEmailReportSettings", async (req, res) => {

  console.log("request /api/settings/getEmailReportSettings");
  
  res.json({"emailReportSendTo": configData.emailConfig.reportTo});

});


// API modify email config
app.post("/api/settings/saveEmailConfigs", jsonParser, async (req, res) => {
  console.log("requir /api/settings/saveEmailConfigs");
  console.log(req.body);
  
  configData.emailConfig.reportTo = req.body.emailReportSendTo;

  let configDataStr = JSON.stringify(configData, null, 4);
  var fs = require('fs');
  fs.writeFile(serverConfigPath, configDataStr, 'utf8', ()=>{});

  res.json({"message": "Success"});

});


// send test email to emailConfig.reportTo
app.post("/api/settings/sendTestEmailToReportTo", jsonParser, async (req, res) => {
  console.log("requir /api/settings/sendTestEmailToReportTo");
  console.log(req.body);

  const mailOptions = {
    from: configData.emailConfig.from,
    to: req.body.emailReportSendTo,
    subject: 'Testing Email Delivery',
    text: 'This email is a test sent from MCS Web.'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json({"message": error, "success": "error"});
    } else {
      console.log('Email sent: ' + info.response);
      res.json({"message": info.response, "success": "success"});
    }
  });


});


/********************************* send shift report ***********************************/ 

// create report csv attachement
const generateShiftReportCSVByDateTime = async (inputDate) =>{
  let csvStr = "Project Name:," + configData.allLines[configData.currentLineIndex].name + "\n\n";

  
  try {
    await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

    csvStr += shiftArr[2] + " Shift:," + shiftArr[0] + "," + shiftArr[1] + "\n\n";

    // All stations sum fault time
    let result = await sql.query(
    "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') exec [dbo].[spGetSumFaultTimeByStations] @start, @end"
    );

    csvStr += "All Stations Sum Fault Time (Second)\n"
    // tag names row
    csvStr += "Tag name:"
    for (let i=0; i<result.recordsets[0].length; i++){
      csvStr += "," + result.recordsets[0][i].tag_name ;
    }
    csvStr += "\n"
    // time row
    csvStr += "Sum Fault Time (Second):"
    for (let i=0; i<result.recordsets[0].length; i++){
      csvStr += "," + result.recordsets[0][i].SumFaultTime ;
    }
    csvStr += "\n\n"



    // All stations average sum time
    result = await sql.query(
      "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] +
      "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] +
      "') exec [dbo].[spGetAverageCycleTimeByStations] @start, @end"
    );

    csvStr += "All Stations Average Cycle Time (Second)\n"
    // tag names row
    csvStr += "Tag name:"
    for (let i = 0; i < result.recordsets[0].length; i++) {
      csvStr += "," + result.recordsets[0][i].tag_name;
    }
    csvStr += "\n"
    // time row
    csvStr += "Average Cycle Time (Second):"
    for (let i = 0; i < result.recordsets[0].length; i++) {
      csvStr += "," + result.recordsets[0][i].avgCycleTime;
    }
    csvStr += "\n\n"




    // shift pass fail counts
    result = await sql.query(
      "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] +
      "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] +
      "') exec [dbo].[spGetShiftCount] '" + configData.allLines[configData.currentLineIndex].name + "', @start, @end"
    );

    csvStr += "Pass Fail Counts\n";
    csvStr += ",Total,Pass,Fail\n";
    csvStr += "Counts:," + result.recordsets[0][0].tag_cnt + "," + result.recordsets[0][0].pass_cnt + "," + result.recordsets[0][0].reject_cnt + "\n" ;


    return csvStr;

  } catch (err) {
    console.log(err);
    return "";
  } 
}




// send report email
async function sendShiftReportEmail(inputDate){
  console.log("Sending Shift Report Email.");
  let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

  let csvStr = await generateShiftReportCSVByDateTime(inputDate);

  const mailOptions = {
    from: configData.emailConfig.from,
    to: configData.emailConfig.reportTo,
    subject: shiftArr[2] + 'shift report from ' + shiftArr[0] + " to " + shiftArr[1],
    text: "Please find attached the CSV report for finished shift.",
    attachments: [
      {   
          filename: shiftArr[2] + 'Shift_Report_from' + shiftArr[0] + "_to_" + shiftArr[1] + '.csv',
          content: csvStr
      },
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


// set time to send report everyday
const cron = require('node-cron');

cron.schedule('0 7 * * *', () => {
  console.log('7am shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  sendShiftReportEmail(inputDT);
});

// Schedule a task to run at 3pm every day
cron.schedule('0 15 * * *', () => {
  console.log('3pm shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  sendShiftReportEmail(inputDT);
});

// Schedule a task to run at 11pm every day
cron.schedule('0 23 * * *', () => {
  console.log('11pm shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  sendShiftReportEmail(inputDT);
});


// test shift report 
// sendShiftReportEmail(new Date());



// function for checking alarm actives and send alarm emails
const checkAlarmAndSendEmail = async () =>{
  let emailContent = "Please check the following alarms:\n\n";
  let sendEmail = false;

  try {
    await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

    let result = await sql.query(
    "exec [dbo].[spFindActiveAlarm]"
    );
    
    // console.log(result.recordsets[0]);

    const currentTime = new Date();
    for (const it of result.recordsets[0]){
      const startTimte = new Date(it.EventTime.toISOString().split('.')[0]);
      const seconds = (currentTime.getTime() - startTimte.getTime()) / 1000;
      
      if (seconds >= 300){
        sendEmail = true;
        emailContent += "Alarm tag name: " + it.TagName + "\n";
        emailContent += "Tag description: " + it.TagDescription + "\n";
        emailContent += "Alarm duration (minutes): " + Math.round((seconds/60) * 100) / 100 + "\n\n";
      }
    }

    if (sendEmail){
      return emailContent;
    }
    else {
      return "";
    }
  } catch (err) {
    console.log(err);
    return "";
  } 
}


// async function checkAlarmEmailContent(){
//   let content = await checkAlarmAndSendEmail();
//   console.log("email content: \n" + content);
// }
// checkAlarmEmailContent();

// check alarm and send email every 5 min
cron.schedule('*/5 * * * *', async () => {
  console.log('Checking alarms.');
  let emailContent = await checkAlarmAndSendEmail();
  if (emailContent !== ""){
    console.log('Sending alarms emails.');

    const mailOptions = {
      from: configData.emailConfig.from,
      to: configData.emailConfig.reportTo,
      subject: "Tag alarm, please pay attention.",
      text: emailContent,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
});












//***************************** Alarm page APIs *********************************/

app.post("/api/AlarmPage/getAlarmHistory", jsonParser, async (req, res) => {
  console.log("requir /api/AlarmPage/getAlarmHistory");
  console.log(req.body);
  try {
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spFindAlarmHistory] @StartTime = '" + req.body.start + "', @EndTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/AlarmPage/getAlarmHistory");
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

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
