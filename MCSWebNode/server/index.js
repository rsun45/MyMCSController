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


// set time schedule
const cron = require('node-cron');



app.use(express.json({ limit: "100mb" }));

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
// sql.ConnectionPool.prototype.setMaxListeners(100);


// API get query page data
var config = {
  user: configData.allLines[configData.currentLineIndex].dbUser,
  password: configData.allLines[configData.currentLineIndex].dbPassword,
  database: configData.allLines[configData.currentLineIndex].dbDataBase,
  server: configData.allLines[configData.currentLineIndex].dbServer,
  requestTimeout: 300000,
  pool: {
    min: 2,
    max: 50,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 60000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    trustedConnection: true
  }
};


async function myQuery(){
  try {
      // make sure that any items are correctly URL encoded in the connection string
      // var con = await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
      await sql.connect(config);
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
const saveAverageCycleTimeByStations = async() => {


  console.log("Server side save /api/AverageCycleTimeByStations");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-05-21 10:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    
    const time1 = new Date();

    // const result = await sql.query('select pd.id, SerialNumber, pd.PartId, st.Name, ta.tagName, TagStatus, tagValue, StartTime, EndTime from tblPartDetail pd join tblParts pa on pa.id = pd.PartId join tblTags ta on ta.id = pd.TagId join tblStation st on st.id = pd.StationId where st.name = 40  order by PartId, StationId, TagId');
    const result = await sql.query(`
      DECLARE @start DATETIME = '${shiftArr[0]}'
      DECLARE @end DATETIME = '${shiftArr[1]}'
      EXEC [dbo].[spGetAverageCycleTimeByStations] @start, @end
    `);


    
    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used for AverageCycleTimeByStations.");


    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/AverageCycleTimeByStations.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });


    console.log("Finished /api/AverageCycleTimeByStations");

  } catch (err) {
    console.log(err);
  }

};


// API All stations average sum time - Quick fetch
app.get("/api/AverageCycleTimeByStationsQuick", async (req, res) => {
  console.log("request /api/AverageCycleTimeByStationsQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/AverageCycleTimeByStations.json"));
  
  res.json(jsonData);
});




// API All stations sum fault time
const saveSumFaultTimeByStations = async () => {


  console.log("server side save /api/SumFaultTimeByStations");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-05-21 10:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    
    const time1 = new Date();

    const result = await sql.query(`
      DECLARE @start DATETIME = '${shiftArr[0]}'
      DECLARE @end DATETIME = '${shiftArr[1]}'
      EXEC [dbo].[spGetSumFaultTimeByStations] @start, @end
    `);

    for (let i=0; i<result.recordsets[0].length; i++){
      result.recordsets[0][i].id = i;
    }

    
    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used for SumFaultTimeByStations.");

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/SumFaultTimeByStations.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("Finished /api/SumFaultTimeByStations");

  } catch (err) {
    console.log(err);
  }

};

// API All stations sum fault time - Quick fetch
app.get("/api/SumFaultTimeByStationsQuick", async (req, res) => {
  console.log("request /api/SumFaultTimeByStationsQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/SumFaultTimeByStations.json"));
  
  res.json(jsonData);
});



// API current shift pass fail counts
const saveCurrentShiftPassFailCounts = async () => {


  console.log("request /api/CurrentShiftPassFailCounts");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-04-11 14:00:00"));
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date());
    console.log(shiftArr);

    const result = await sql.query(`
      DECLARE @start DATETIME = '${shiftArr[0]}'
      DECLARE @end DATETIME = '${shiftArr[1]}'
      EXEC [dbo].[spGetShiftCount] '${configData.allLines[configData.currentLineIndex].name}', @start, @end
    `);


    result.recordsets[0][0].shift = shiftArr[2];

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/CurrentShiftPassFailCounts.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("Finished /api/CurrentShiftPassFailCounts");

  } catch (err) {
    console.log(err);
  }

};

// API current shift pass fail counts - Quick fetch
app.get("/api/CurrentShiftPassFailCountsQuick", async (req, res) => {
  console.log("request /api/CurrentShiftPassFailCountsQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/CurrentShiftPassFailCounts.json"));
  
  res.json(jsonData);
});


// API last shift pass fail counts
const saveLastShiftPassFailCounts = async () => {


  console.log("request /api/LastShiftPassFailCounts");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

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

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/LastShiftPassFailCounts.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("Finished /api/LastShiftPassFailCounts");

  } catch (err) {
    console.log(err);
  }

};

// API last shift pass fail counts - Quick fetch
app.get("/api/LastShiftPassFailCountsQuick", async (req, res) => {
  console.log("request /api/LastShiftPassFailCountsQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/LastShiftPassFailCounts.json"));
  
  res.json(jsonData);
});


// API last two shift pass fail counts
const saveLastTwoShiftPassFailCounts = async () => {


  console.log("request /api/LastTwoShiftPassFailCounts");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

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

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/LastTwoShiftPassFailCounts.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("Finished /api/LastTwoShiftPassFailCounts");

  } catch (err) {
    console.log(err);
  }

};

// API last two shift pass fail counts - Quick fetch
app.get("/api/LastTwoShiftPassFailCountsQuick", async (req, res) => {
  console.log("request /api/LastTwoShiftPassFailCountsQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/LastTwoShiftPassFailCounts.json"));
  
  res.json(jsonData);
});



// API get running perfomance
const saveRunningPerformance = async () => {


  console.log("request /api/RunningPerformance");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

    const result = await sql.query(`
      EXEC [dbo].[spGetRunningPerformance]
    `);

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/RunningPerformance.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    
    console.log("Finished /api/RunningPerformance");

  } catch (err) {
    console.log(err);
  }

};

// API get running perfomance - Quick fetch
app.get("/api/RunningPerformanceQuick", async (req, res) => {
  console.log("request /api/RunningPerformanceQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/RunningPerformance.json"));
  
  res.json(jsonData);
});



// Search Operator Summary Times, group bar chart
const saveOperatorSummaryTimes = async () => {


  console.log("request /api/OperatorSummaryTimes");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(config);

    // let shiftArr = shiftCalculator.getShiftTimeStrByDate(new Date("2024-05-21 14:00:00"));
    let inputDT = new Date();
    inputDT.setHours(inputDT.getHours());
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDT);
    console.log(shiftArr);

    const time1 = new Date();

    const result = await sql.query(
    "declare @StartTime datetime = CONVERT(DATETIME,'" + shiftArr[0] + 
    "') declare @EndTime datetime = CONVERT(DATETIME,'" + shiftArr[1] + 
    "') " + 
    " exec [dbo].[spSearchOperatorSummaryTimes] @StartTime, @EndTime, 'station10operatordata'"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used for OperatorSummaryTimes.");

    // save query result to local json file, for quick fetch by other terminals
    var fs = require('fs');
    let jsonData = JSON.stringify(result.recordset, null, 4);
    fs.writeFile(path.join(__dirname, "SummaryPageQueryResults/OperatorSummaryTimes.json"), jsonData, function (err) {
      if (err) {
        console.log(err);
      }
    });

    console.log("Finished /api/OperatorSummaryTimes");

  } catch (err) {
    console.log(err);
  }
};

// Search Operator Summary Times, group bar chart - Quick fetch
app.get("/api/OperatorSummaryTimesQuick", async (req, res) => {
  console.log("request /api/OperatorSummaryTimesQuick");

  const jsonData = require(path.join(__dirname, "SummaryPageQueryResults/OperatorSummaryTimes.json"));
  
  res.json(jsonData);
});




/********************* fetch and save data every minutes *********************/
cron.schedule('* * * * *', () => {
  console.log('\nSever side fetch summary page data.');

  saveAverageCycleTimeByStations();
  saveSumFaultTimeByStations();
  saveCurrentShiftPassFailCounts();
  saveLastShiftPassFailCounts();
  saveLastTwoShiftPassFailCounts();
  saveRunningPerformance();
  saveOperatorSummaryTimes();
  
});



//***************************** End of summary page APIs *********************************/





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
      "EXEC spGetAllFullTagTitle;"
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
      "exec [dbo].[spGetTagContentByTagTitle] @tagTitle = '" + req.body.tagName + "', @startTime = '" + req.body.start + "', @endTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    res.json(result.recordsets[0]);

    console.log("Finish /api/AnalysisPage/getDataAndTimeByTagName");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});





//***************************** quality page APIs *********************************/
app.get("/api/QualityPage/getValueTagTitle", async (req, res) => {
  console.log("requir /api/QualityPage/getValueTagTitle");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "EXEC spGetValueTagTitle;"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/QualityPage/getValueTagTitle");
    await con.close();

  } catch (err) {
    console.log(err);
  }

});



app.post("/api/QualityPage/getDataAndTimeByTagName", jsonParser, async (req, res) => {
  console.log("requir /api/QualityPage/getDataAndTimeByTagName");
  console.log(req.body);
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    let con = await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spGetTagContentByTagTitle] @tagTitle = '" + req.body.tagName + "', @startTime = '" + req.body.start + "', @endTime = '" + req.body.end + "';"
    );

    const limits = await sql.query(
      "exec [dbo].[spGetLatestLimits] @tagTitle = '" + req.body.tagName + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    console.log( result.recordsets[0]);
    res.json({"data": result.recordsets[0], "lowLimit": Number(limits.recordsets[0][0].LowLimitContent), "highLimit": Number(limits.recordsets[0][0].HighLimitContent)});

    console.log("Finish /api/QualityPage/getDataAndTimeByTagName");
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
    
    await sql.connect(config);
    
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
      "exec [dbo].[spGetTagQueryForOnePart] @pSerialNumber = '" + req.body.serialNumber +  "';"
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
      "exec [dbo].[spGetOperationalTime] @stationIdentifier = '" + req.body.tagName + "', @startTime = '" + req.body.start + "', @endTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    // console.log(result.recordsets[0][0]);
    let keyArr = [];
    for (const key in result.recordsets[0][0]) {
      // console.log(key);
      // console.log(result.recordsets[0][0][key]);
      if (key === "serial_number" || key === "LatestUpdateTime"){
        continue;
      }
      keyArr.push(key);
    }
    // console.log(keyArr);

    let final = [];
    for (const it of result.recordsets[0]){
      if (it.serial_number === ''){
        continue;
      }

      for (const key of keyArr){
        if (key.includes("TotalTime")){
          final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "totalTimeValue": it[key], "totalTimeFeild": "Total Operational Time"});
        }
        else if (key.includes("FaultTime")){
          final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it[key]*-1, "timeFeild": key});
        }
        else {
          final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it[key], "timeFeild": key});
        }

      }
      
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "totalTimeValue": it.TotalOperationalTime, "totalTimeFeild": "Total Operational Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.InputTime, "timeFeild": "Input Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.OutputTime, "timeFeild": "Output Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.MachineTime, "timeFeild": "Machine Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.TransferTime, "timeFeild": "Transfer Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.OperatorTime, "timeFeild": "Operator Time"});
      // final.push({"dateTime": it.LatestUpdateTime.toISOString().slice(0, -3), "timeValue": it.FaultTime*-1, "timeFeild": "FaultTime"});
    }

    
    // console.log(final);
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
  
  // try {
  //   let con = await sql.connect(config);

  //   const result = await sql.query(`
  //     SELECT * FROM tblLineParameter;
  //   `);

  //   res.json({"baselineValue": result.recordsets[0][0].CycleTime});

  //   await con.close();
    

  // } catch (err) {
  //   console.log(err);
  // }

  res.json({"baselineValue": configData.settings.designCycleTime});

  

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
//   to: configData.emailConfig.emailTo.reportTo,
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




/********************** setting page **************************/

// API get email settings values
app.get("/api/settings/getEmailGridData", async (req, res) => {

  console.log("request /api/settings/getEmailGridData");

  // generate email setting grid data
  const reportTo = configData.emailConfig.emailTo.reportTo.split(',');
  const alarmTo = configData.emailConfig.emailTo.alarmTo.split(',');
  const scheduledMaintenanceTo = configData.emailConfig.emailTo.scheduledMaintenanceTo.split(',');
  const qualityRejectTo = configData.emailConfig.emailTo.qualityRejectTo.split(',');
  const operatorTo = configData.emailConfig.emailTo.operatorTo.split(',');
  const emailsTimeRange = configData.emailConfig.emailTo.emailsTimeRange;
  // generate all distinct email addresses
  let distinctEmailArr = [];
  // trim all email addresses
  for (let i=0; i<reportTo.length; i++){
    reportTo[i] = reportTo[i].trim();
    if(!distinctEmailArr.includes(reportTo[i])){
      distinctEmailArr.push(reportTo[i]);
    }
  }
  for (let i=0; i<alarmTo.length; i++){
    alarmTo[i] = alarmTo[i].trim();
    if(!distinctEmailArr.includes(alarmTo[i])){
      distinctEmailArr.push(alarmTo[i]);
    }
  }
  for (let i=0; i<scheduledMaintenanceTo.length; i++){
    scheduledMaintenanceTo[i] = scheduledMaintenanceTo[i].trim();
    if(!distinctEmailArr.includes(scheduledMaintenanceTo[i])){
      distinctEmailArr.push(scheduledMaintenanceTo[i]);
    }
  }
  for (let i=0; i<qualityRejectTo.length; i++){
    qualityRejectTo[i] = qualityRejectTo[i].trim();
    if(!distinctEmailArr.includes(qualityRejectTo[i])){
      distinctEmailArr.push(qualityRejectTo[i]);
    }
  }
  for (let i=0; i<operatorTo.length; i++){
    operatorTo[i] = operatorTo[i].trim();
    if(!distinctEmailArr.includes(operatorTo[i])){
      distinctEmailArr.push(operatorTo[i]);
    }
  }


  let result = [];
  for (let i=0; i<distinctEmailArr.length; i++){
    let entry = {"id": i, "emailAddress": distinctEmailArr[i]};
    if (reportTo.includes(distinctEmailArr[i])){
      entry.reportTo = 1;
    }
    else {
      entry.reportTo = 0;
    }
    if (alarmTo.includes(distinctEmailArr[i])){
      entry.alarmTo = 1;
    }
    else {
      entry.alarmTo = 0;
    }
    if (scheduledMaintenanceTo.includes(distinctEmailArr[i])){
      entry.scheduledMaintenanceTo = 1;
    }
    else {
      entry.scheduledMaintenanceTo = 0;
    }
    if (qualityRejectTo.includes(distinctEmailArr[i])){
      entry.qualityRejectTo = 1;
    }
    else {
      entry.qualityRejectTo = 0;
    }
    if (operatorTo.includes(distinctEmailArr[i])){
      entry.operatorTo = 1;
    }
    else {
      entry.operatorTo = 0;
    }

    // current email's time range for receiving email
    if (emailsTimeRange[distinctEmailArr[i]]){
      entry.startTime = emailsTimeRange[distinctEmailArr[i]].startTime;
      entry.endTime = emailsTimeRange[distinctEmailArr[i]].endTime;
    }
    else {
      entry.startTime = "";
      entry.endTime = "";
    }

    result.push(entry);
  }

  
  // console.log(result);
  
  res.json({"emailGridData": result});

});


// API modify email config
app.post("/api/settings/saveEmailConfigs", jsonParser, async (req, res) => {
  console.log("requir /api/settings/saveEmailConfigs");
  console.log(req.body);
  
  configData.emailConfig.emailTo.reportTo = req.body.reportTo;
  configData.emailConfig.emailTo.alarmTo = req.body.alarmTo;
  configData.emailConfig.emailTo.scheduledMaintenanceTo = req.body.scheduledMaintenanceTo;
  configData.emailConfig.emailTo.qualityRejectTo = req.body.qualityRejectTo;
  configData.emailConfig.emailTo.operatorTo = req.body.operatorTo;
  configData.emailConfig.emailTo.emailsTimeRange = req.body.emailsTimeRange;

  let configDataStr = JSON.stringify(configData, null, 4);
  var fs = require('fs');
  fs.writeFile(serverConfigPath, configDataStr, 'utf8', ()=>{});

  res.json({"message": "Success"});

});


// send test email to emailConfig.emailTo.reportTo
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


// get setting page values
app.get("/api/settings/getValues", async (req, res) => {

  console.log("request /api/settings/getValues");

  res.json(configData.settings);

});
// save setting values
app.post("/api/settings/saveSettingValues", jsonParser, async (req, res) => {
  console.log("requir /api/settings/saveSettingValues");
  console.log(req.body);

  for (var key in req.body){
    configData.settings[key] = req.body[key];
  }
  
  let configDataStr = JSON.stringify(configData, null, 4);
  var fs = require('fs');
  fs.writeFile(serverConfigPath, configDataStr, 'utf8', ()=>{});

  res.json({"message": "Success"});

});





/********************************* send shift report ***********************************/ 

// create report csv attachement
const generateShiftReportCSVByDateTime = async (inputDate) =>{
  let csvStr = "Project Name:," + configData.allLines[configData.currentLineIndex].name + "\n\n";

  
  try {
    // await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection); 
    await sql.connect(config);
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



    // All stations average cycle time
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


    
    // operator summary times
    result = await sql.query(
      "declare @StartTime datetime = CONVERT(DATETIME,'" + shiftArr[0] +
      "') declare @EndTime datetime = CONVERT(DATETIME,'" + shiftArr[1] +
      "') " +
      " exec [dbo].[spSearchOperatorSummaryTimes] @StartTime, @EndTime, 'station10operatordata'"
    );

    csvStr += "Operator Summary Times\n"
    // table headers
    csvStr += "Date,Hour,Total Operator Time (second),Average Operator Time (second),Total Over Design Time (second),Total Over Design Time Without Fault (second)\n";

    // lop for table rows
    for (const it of result.recordset){
      csvStr += it.Date.toISOString().split('T')[0] + "," + it.Hour + "," + it.TotalOperatorTime + "," + it.AverageOperatorTime + "," + 
                it.TotalOverDesignTime + "," + it.TotalOverDesignTimeWithoutFault + "\n";
    }

    csvStr += "\n\n";


    // running performance
    result = await sql.query(`
      EXEC [dbo].[spGetRunningPerformance]
    `);
    
    csvStr += "Running performance Counts\n";
    for (const it of result.recordset){
      csvStr += ",";
      csvStr += it.tag_name;
    }
    csvStr += "\n";
    csvStr += "Counts:";
    for (const it of result.recordset){
      csvStr += ",";
      csvStr += it.tag_cont;
    }
    csvStr += "\n\n\n" ;



    // shift pass fail counts
    result = await sql.query(
      "declare @start datetime = CONVERT(DATETIME,'" + shiftArr[0] +
      "') declare @end datetime = CONVERT(DATETIME,'" + shiftArr[1] +
      "') exec [dbo].[spGetShiftCount] '" + configData.allLines[configData.currentLineIndex].name + "', @start, @end"
    );

    csvStr += "Pass Fail Counts\n";
    csvStr += ",Total,Pass,Fail\n";
    csvStr += "Counts:," + result.recordsets[0][0].tag_cnt + "," + result.recordsets[0][0].pass_cnt + "," + result.recordsets[0][0].reject_cnt + "\n" ;

    csvStr += "\n\n" ;



    // maintenance
    result = await sql.query(
      "EXEC spGetMaintCounter;"
    );
    
    csvStr += "Maintenance\n";
    csvStr += "Schedule,Preset,Current,Percentage\n";
    for (const it of result.recordset){
      const percentNum = Math.round(Number(it.CurrentNumber)/Number(it.PresetNumber)*10000)/100;
      csvStr += it.TagName + "," + it.PresetNumber + "," + it.CurrentNumber + "," + percentNum + "%";
      csvStr += "\n";
    }
    csvStr += "\n\n" ;




    // alarm history
    result = await sql.query(
      "exec [dbo].[spFindAlarmHistory] @StartTime = '" + shiftArr[0] + "', @EndTime = '" + shiftArr[1] + "';"
    );

    csvStr += "Alarm History\n";
    csvStr += "Alarm Type,Alarm Name,Tag Description,Occurrences,Total Duration\n";
    for (const it of result.recordset){
      csvStr += it.AlarmType + "," + it.AlarmName + "," + it.TagDescription + "," + it.Occurrences + "," + it.TotalDuration ;
      csvStr += "\n";
    }
    csvStr += "\n\n" ;





    return csvStr;

  } catch (err) {
    console.log(err);
    return "";
  } 
}

// async function printCSV () {
//   let tempstr = await generateShiftReportCSVByDateTime(new Date("2024-05-16 13:00:00"));
//   console.log("csv report conent: \n");
//   console.log(tempstr);

// }
// printCSV();


// function for checking sending email time range and filt the address list
function filterEmailListByTimeRange (emailListStr){
  let emailArr = emailListStr.split(",");

  const ct = new Date();
  const ctStr = ct.toLocaleTimeString();

  let newEmailArr = [];
  for (const it of emailArr){
    let keep = false;

    if (configData.emailConfig.emailTo.emailsTimeRange[it] && configData.emailConfig.emailTo.emailsTimeRange[it].startTime && configData.emailConfig.emailTo.emailsTimeRange[it].endTime){
      if (configData.emailConfig.emailTo.emailsTimeRange[it].startTime > configData.emailConfig.emailTo.emailsTimeRange[it].endTime){
        if (ctStr > configData.emailConfig.emailTo.emailsTimeRange[it].endTime || ctStr < configData.emailConfig.emailTo.emailsTimeRange[it].startTime){
          keep = true;
        }

      }
      else {
        if (ctStr < configData.emailConfig.emailTo.emailsTimeRange[it].endTime && ctStr > configData.emailConfig.emailTo.emailsTimeRange[it].startTime){
          keep = true;
        }
      }

    }
    if (keep){
      newEmailArr.push(it);
    }

  }

  return newEmailArr.join(",");
  
}

// console.log(filterEmailListByTimeRange(configData.emailConfig.emailTo.reportTo));




// send report email
async function sendShiftReportEmail(inputDate){
  console.log("Sending Shift Report Email.");
  let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

  let csvStr = await generateShiftReportCSVByDateTime(inputDate);

  const mailOptions = {
    from: configData.emailConfig.from,
    to: filterEmailListByTimeRange(configData.emailConfig.emailTo.reportTo),
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






// function for checking alarm actives and send alarm emails
const checkAlarmAndSendEmail = async ( timeThreshold ) =>{
  let emailContent = "Please check the following alarms:\n\n";
  let sendEmail = false;

  try {
    // await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
    await sql.connect(config);

    let result = await sql.query(
    "exec [dbo].[spFindActiveAlarm]"
    );
    
    // console.log(result.recordsets[0]);

    const currentTime = new Date();
    for (const it of result.recordsets[0]){
      const startTimte = new Date(it.EventTime.toISOString().split('.')[0]);
      const seconds = (currentTime.getTime() - startTimte.getTime()) / 1000;
      
      console.log("seconds: "+ seconds);
      console.log("timeThreshold: "+ timeThreshold);
      console.log(seconds >= (timeThreshold?timeThreshold:60*30));
      if (seconds >= (timeThreshold?timeThreshold:60*30)){
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
let backendAlarmChecking = cron.schedule('*/5 * * * *', async () => {
  console.log('Checking alarms.');
  let time = new Date();
  console.log(time.toLocaleString());
  
  let emailContent = await checkAlarmAndSendEmail(configData.settings.alarmThreshold);
  if (emailContent !== ""){
    console.log('Sending alarms emails.');

    console.log(emailContent);

    const mailOptions = {
      from: configData.emailConfig.from,
      to: filterEmailListByTimeRange(configData.emailConfig.emailTo.alarmTo),
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


// backendAlarmChecking.stop();



// create alarm content
const generateActivityAlarm = async () =>{

  let emailContent = "Please check the following alarms:\n\n";
  let sendEmail = false;

  try {
    // await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
    await sql.connect(config);

    let result = await sql.query(
    "exec [dbo].[spFindActiveAlarm]"
    );
    
    // console.log(result.recordsets[0]);

    const currentTime = new Date();
    for (const it of result.recordsets[0]){
      const startTimte = new Date(it.EventTime.toISOString().split('.')[0]);
      const seconds = (currentTime.getTime() - startTimte.getTime()) / 1000;
      
      sendEmail = true;
      emailContent += "Alarm tag name: " + it.TagName + "\n";
      emailContent += "Tag description: " + it.TagDescription + "\n";
      emailContent += "Alarm duration (minutes): " + Math.round((seconds/60) * 100) / 100 + "\n\n";
      
    }

    if (sendEmail){
      return emailContent;
    }
    else {
      return "There is no active alarm."
    }
  } catch (err) {
    console.log(err);
    return "Faild reading alarms."
  } 
}




//************ operator email  ********************/

// create operator report csv attachement
const generateOperatorReportCSVByDateTime = async (inputDate) =>{
  let csvStr = "Project Name:," + configData.allLines[configData.currentLineIndex].name + "\n\n";

  
  try {
    await sql.connect(config);
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

    csvStr += shiftArr[2] + " Shift: ," + shiftArr[0] + "," + shiftArr[1] + "\n\n";
    
    csvStr += "Operator Time Table: \n\n";

    // table header
    csvStr += "Date,Hour,Exact Time,Serial Number,Operator Time,Fault Time,Over Design Time,Over Design Time Without Fault\n";

    // operator times
    let result = await sql.query(
      "exec [dbo].[spSearchOperatorDetailedTimes] @TagPrefix = 'Station10Operator', @StartTime = '" + shiftArr[0] + "', @EndTime = '" + shiftArr[1] + "';"
    );

    // lop for table rows
    for (const it of result.recordset){
      csvStr += it.Date.toISOString().split('T')[0] + "," + it.Hour + "," + it.ExactTime.toISOString().split('.')[0] + "," + it.serial_number + "," + 
                it.OperatorTime + "," + it.FaultTime + "," + it.OverDesignTime + "," + it.OverDesignTimeWithoutFault + "\n";
    }


    return csvStr;

  } catch (err) {
    console.log(err);
    return "";
  } 
}

// send operator email
async function sendOperatorReportEmail(inputDate){
  console.log("Sending operator Report Email.");
  let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

  let csvStr = await generateOperatorReportCSVByDateTime(inputDate);

  const mailOptions = {
    from: configData.emailConfig.from,
    to: filterEmailListByTimeRange(configData.emailConfig.emailTo.operatorTo),
    subject: shiftArr[2] + ' operator report from ' + shiftArr[0] + " to " + shiftArr[1],
    text: "Please find attached the CSV operator report for finished shift.",
    attachments: [
      {   
          filename: shiftArr[2] + '_operator_Report_from' + shiftArr[0] + "_to_" + shiftArr[1] + '.csv',
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




// set shift schedule to send emails

cron.schedule('0 7 * * *', () => {
  console.log('7am shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  // shift report email
  sendShiftReportEmail(inputDT);

  // operator email
  sendOperatorReportEmail(inputDT);
});

// Schedule a task to run at 3pm every day
cron.schedule('0 15 * * *', () => {
  console.log('3pm shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  // shift report email
  sendShiftReportEmail(inputDT);

  // operator email
  sendOperatorReportEmail(inputDT);
});

// Schedule a task to run at 11pm every day
cron.schedule('0 23 * * *', () => {
  console.log('11pm shift report');
  let inputDT = new Date();
  inputDT.setHours(inputDT.getHours()-1);
  // shift report email
  sendShiftReportEmail(inputDT);
  
  // operator email
  sendOperatorReportEmail(inputDT);
});


// test shift report 
// sendShiftReportEmail(new Date());


//***************************** API for sending test emails  *********************************/
app.post("/api/settings/testsending", jsonParser, async (req, res) => {
  console.log("requir /api/settings/testsending");
  console.log(req.body);
  
  if (req.body.testType === "testProduction"){
    let inputDate = new Date();
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

    let csvStr = await generateShiftReportCSVByDateTime(inputDate);

    var mailOptions = {
      from: configData.emailConfig.from,
      to: req.body.sendTo,
      subject: "Testing production report: " + shiftArr[2] + 'shift report from ' + shiftArr[0] + " to " + shiftArr[1],
      text: "Please find attached the CSV report for finished shift.",
      attachments: [
        {
          filename: shiftArr[2] + 'Shift_Report_from' + shiftArr[0] + "_to_" + shiftArr[1] + '.csv',
          content: csvStr
        },
      ]
    };
  }
  else if (req.body.testType === "testAlarm"){

    let alarmContent = await generateActivityAlarm();

    var mailOptions = {
      from: configData.emailConfig.from,
      to: req.body.sendTo,
      subject: 'Testing alarm',
      text: alarmContent
    };
  }
  else if (req.body.testType === "testMaintenance"){
    var mailOptions = {
      from: configData.emailConfig.from,
      to: req.body.sendTo,
      subject: 'Testing maintenance',
      text: "This email is a maintenance test sent from MCS Web."
    };
  }
  else if (req.body.testType === "testQuality"){
    var mailOptions = {
      from: configData.emailConfig.from,
      to: req.body.sendTo,
      subject: 'Testing quality',
      text: "This email is a quality test sent from MCS Web."
    };
  }
  else if (req.body.testType === "testOperator"){
    let inputDate = new Date();
    let shiftArr = shiftCalculator.getShiftTimeStrByDate(inputDate);

    let csvStr = await generateOperatorReportCSVByDateTime(inputDate);

    var mailOptions = {
      from: configData.emailConfig.from,
      to: filterEmailListByTimeRange(configData.emailConfig.emailTo.operatorTo),
      subject: shiftArr[2] + ' operator report from ' + shiftArr[0] + " to " + shiftArr[1],
      text: "Please find attached the CSV operator report for finished shift.",
      attachments: [
        {   
            filename: shiftArr[2] + '_operator_Report_from' + shiftArr[0] + "_to_" + shiftArr[1] + '.csv',
            content: csvStr
        },
      ]
    };
  }
  else {
    var mailOptions = {
      from: configData.emailConfig.from,
      to: req.body.sendTo,
      subject: 'Testing Email Delivery',
      text: 'This email is a test sent from MCS Web.'
    };
  }
  



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








//***************************** Alarm page APIs *********************************/

app.post("/api/AlarmPage/getAlarmHistory", jsonParser, async (req, res) => {
  console.log("requir /api/AlarmPage/getAlarmHistory");
  console.log(req.body);
  try {
    
    await sql.connect(config);
    
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

  } catch (err) {
    console.log(err);
  }

});



// get alarm activities for email
// app.get("/api/AlarmPage/getAlarmActivity", async (req, res) => {

//   console.log("request /api/AlarmPage/getAlarmActivity");

//   let timeThreshold = configData.settings.alarmThreshold

//   let emailContent = "Please check the following alarms:\n\n";
//   let sendEmail = false;

//   try {
//     await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);

//     let result = await sql.query(
//     "exec [dbo].[spFindActiveAlarm]"
//     );
    
//     // console.log(result.recordsets[0]);

//     const currentTime = new Date();
//     for (const it of result.recordsets[0]){
//       const startTimte = new Date(it.EventTime.toISOString().split('.')[0]);
//       const seconds = (currentTime.getTime() - startTimte.getTime()) / 1000;
      
//       if (seconds >= timeThreshold?timeThreshold:60*30){
//         sendEmail = true;
//         emailContent += "Alarm tag name: " + it.TagName + "\n";
//         emailContent += "Tag description: " + it.TagDescription + "\n";
//         emailContent += "Alarm duration (minutes): " + Math.round((seconds/60) * 100) / 100 + "\n\n";
//       }
//     }

//     if (sendEmail){
//       res.json({"alarmContent": emailContent});
//     }
//     else {
//       res.json({"alarmContent": "No alarm activities."});
//     }
//   } catch (err) {
//     console.log(err);
//     res.json({"alarmContent": "Error on finding alarm activity."});
//   } 

// });



// get alarm activities for alarm page
app.get("/api/AlarmPage/getAlarmActivityForWeb", async (req, res) => {

  console.log("request /api/AlarmPage/getAlarmActivityForWeb");

  let timeThreshold = configData.settings.alarmThreshold


  try {
    // await sql.connect(configData.allLines[configData.currentLineIndex].databaseConnection);
    await sql.connect(config);

    let result = await sql.query(
    "exec [dbo].[spFindActiveAlarm]"
    );
    

    const ct = new Date();
    let i = 0;
    for (const it of result.recordsets[0]){
      let et = new Date(it.EventTime.toISOString().split(".")[0].replace("T", " "))
      let diff =(ct.getTime() - et.getTime()) / 60000;
      it.TotalDuration = Math.round(diff*100)/100;
      it.EventTime = it.EventTime.toISOString().split(".")[0].replace("T", " ");
      it.id = i;
      i++;
    }

    
    // console.log(result.recordsets[0]);

    console.log("Finished /api/AlarmPage/getAlarmActivityForWeb");

    res.json({"alarmContent": result.recordsets[0]});

  } catch (err) {
    console.log(err);
  } 

});
















/*************************** Login API ************************ */

app.use('/login',jsonParser, (req, res) => {

  console.log("\n" + req.body.username+ " is trying to login");


  let pass = false;
  // check user and pw
  for (const it of configData.login){
    if (req.body.username === it.user && req.body.password === it.password){
      pass = true;
    }
  }

  if (pass){
    console.log(req.body.username+ " login");
    res.send({
      name: 'admin',
      level: 0,
      maxAge: 1800
    });
  }
  else {
    console.log("Faild login");
    res.send({});
  }



});








//***************************** maintenance page APIs *********************************/
app.get("/api/MaintenancePage/getAllMaintenance", async (req, res) => {
  console.log("requir /api/MaintenancePage/getAllMaintenance");
  
  try {
    // make sure that any items are correctly URL encoded in the connection string
    
    await sql.connect(config);
    
    const time1 = new Date();

    const result = await sql.query(
      "EXEC spGetMaintCounter;"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i< result.recordsets[0].length; i++){
      if (configData.maintenanceDurationRecords[result.recordsets[0][i].TagName] && configData.maintenanceDurationRecords[result.recordsets[0][i].TagName].durationMinute){
        result.recordsets[0][i]["DurationMinute"] = configData.maintenanceDurationRecords[result.recordsets[0][i].TagName].durationMinute;
      }
      else {
        result.recordsets[0][i]["DurationMinute"] = null;
      }
    }
    
    res.json(result.recordsets[0]);

    console.log("Finish /api/MaintenancePage/getAllMaintenance");

  } catch (err) {
    console.log(err);
  }

});


// fetch maintenance info and set duration when needed
const checkMaintenanceSetDuration = async () =>{
  console.log("check maintenance and set duration.");
  try {
    
    await sql.connect(config);

    const result = await sql.query(
      "EXEC spGetMaintCounter;"
    );

    // iterate database maintenance result
    // check if there is new tagName, then add new to config file or delete uncontinued one
    // calculate duration minutes
    let configMaintenanceObj = configData.maintenanceDurationRecords;
    let dbMaintenanceArr = result.recordsets[0];

    let newConfigMaintenanceObj = {};

    for (let i=0; i< dbMaintenanceArr.length; i++){
      newConfigMaintenanceObj[dbMaintenanceArr[i].TagName] = {};
      // config has the tagName
      if (configMaintenanceObj[dbMaintenanceArr[i].TagName]){
        // when current >= preset
        if (Number(dbMaintenanceArr[i].PresetNumber) <= Number(dbMaintenanceArr[i].CurrentNumber)){
          // set start time when start time is empty, erase the end time
          if (!configMaintenanceObj[dbMaintenanceArr[i].TagName].startDateTime){
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["startDateTime"] = new Date().toLocaleString();
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["endDateTime"] = "";
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["durationMinute"] = configMaintenanceObj[dbMaintenanceArr[i].TagName].durationMinute;
          }
        }
        // when current < preset
        else {
          // has start and end is empty, calulate duration minutes, then empty start
          if (configMaintenanceObj[dbMaintenanceArr[i].TagName].startDateTime && !configMaintenanceObj[dbMaintenanceArr[i].TagName].endDateTime){
            let diff = (new Date().getTime() - new Date(configMaintenanceObj[dbMaintenanceArr[i].TagName].startDateTime).getTime()) / 1000;
            const durationMinute = Math.abs(Math.ceil(diff/60));

            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["startDateTime"] = "";
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["endDateTime"] = new Date().toLocaleString();
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["durationMinute"] = durationMinute;
          }
          else {
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["startDateTime"] = "";
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["endDateTime"] = "";
            newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["durationMinute"] = null;
          }
        }
      }
      // add the new tagName to config
      else {
        // current >= preset
        if (Number(dbMaintenanceArr[i].PresetNumber) <= Number(dbMaintenanceArr[i].CurrentNumber)){
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["startDateTime"] = new Date().toLocaleString();
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["endDateTime"] = "";
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["durationMinute"] = null;
        }
        // current < preset
        else {
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["startDateTime"] = "";
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["endDateTime"] = "";
          newConfigMaintenanceObj[dbMaintenanceArr[i].TagName]["durationMinute"] = null;
        }
      }
    }
    
    // write new maintenanceDurationRecords to config file
    configData.maintenanceDurationRecords = newConfigMaintenanceObj;
    
    let configDataStr = JSON.stringify(configData, null, 4);
    var fs = require('fs');
    fs.writeFile(serverConfigPath, configDataStr, 'utf8', ()=>{});

    console.log("Finish check maintenance and set duration.");

  } catch (err) {
    console.log(err);
  }
};



// schedule for maintenance schedule checking
let scheduleMaintenanceDurationChecking = cron.schedule('* * * * *', async () => {
  console.log('Scheduled maintenance duration checking.');
  checkMaintenanceSetDuration();
});




// set schedule to check maintenance and send email
// create maintenance email content
const generateMaintenanceContent = async () =>{

  let emailContent = "Please check the following maintenance information:\n\n";
  let sendEmail = false;
  const percentThreshold = configData.settings.maintenanceThreshold;

  try {
    await sql.connect(config);

    let result = await sql.query(
    "exec spGetMaintCounter"
    );

    let tagNamesArr = [];

    for (const it of result.recordsets[0]){
      let currentNum = Number(it.CurrentNumber);
      let presetNum = Number(it.PresetNumber);
      if (currentNum/presetNum >= percentThreshold){

        // check if new tag need maintain 
        if (!configData.emailConfig.lastMaintenanceRecord.ScheduleNames.includes(it.TagName)){
          sendEmail = true;
        }
        // check if time comes to new shift
        const currentDT = new Date();
        var currentHour = currentDT.getHours();
        const lastSendHour = configData.emailConfig.lastMaintenanceRecord.emailSendHour;
        if ( (lastSendHour >= 23 && lastSendHour < 7 && currentHour >= 7 && currentHour < 15) || 
              (lastSendHour >= 7 && lastSendHour < 15 && currentHour >= 15 && currentHour < 23) || 
              (lastSendHour >= 15 && lastSendHour < 23 && (currentHour >= 23 || currentHour < 7)) )
        {
          sendEmail = true;
        }

        tagNamesArr.push(it.TagName);
        
        emailContent += "Tag Name: " + it.TagName + "\n";
        emailContent += "Preset Number: " + it.PresetNumber + "\n";
        emailContent += "Current Number: " + it.CurrentNumber + "\n";
        emailContent += "Percentage: " + Math.round(currentNum/presetNum*10000)/100 + "%\n\n";
        
      }
    }

    // condotion for no maintenance tag found
    if (tagNamesArr.length === 0 && configData.emailConfig.lastMaintenanceRecord.ScheduleNames.length !== 0){
      configData.emailConfig.lastMaintenanceRecord.ScheduleNames = [];
      let configDataStr = JSON.stringify(configData, null, 4);
      var fs = require('fs');
      fs.writeFile(serverConfigPath, configDataStr, 'utf8', () => { });
    }

    if (sendEmail) {
      configData.emailConfig.lastMaintenanceRecord.ScheduleNames = tagNamesArr;
      configData.emailConfig.lastMaintenanceRecord.emailSendHour = currentHour;

      let configDataStr = JSON.stringify(configData, null, 4);
      var fs = require('fs');
      fs.writeFile(serverConfigPath, configDataStr, 'utf8', () => { });

      return emailContent;
    }
    else {
      return ""
    }
  } catch (err) {
    console.log(err);
    return "Faild reading maintenance information."
  } 
}



// set schedule 
let backendMaintenanceChecking = cron.schedule('*/5 * * * *', async () => {
  console.log('Checking Maintenance.');
  let time = new Date();
  console.log(time.toLocaleString());
  
  let emailContent = await generateMaintenanceContent();

  console.log(emailContent);

  if (emailContent !== ""){
    console.log('Sending maintenance emails.');

    console.log(emailContent);

    const mailOptions = {
      from: configData.emailConfig.from,
      to: filterEmailListByTimeRange(configData.emailConfig.emailTo.scheduledMaintenanceTo),
      subject: "Maintenance reminder, please pay attention.",
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










//***************************** operator page APIs *********************************/
app.post("/api/OperatorPage/getOperatorDataByTimeAndName", jsonParser, async (req, res) => {
  console.log("requir /api/OperatorPage/getOperatorDataByTimeAndName");
  console.log(req.body);
  try {
    await sql.connect(config);

    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spSearchOperatorDetailedTimes] @TagPrefix = '" + req.body.tagName + "', @StartTime = '" + req.body.start + "', @EndTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordset.length; i++){
      result.recordset[i].id = i;
      // rename column attributes, OverDesignTime -> OverDesignCycleTime  改 OverDesignTimeWithoutFault -> OverDesignCycleTimeWithoutFault
      Object.defineProperty(result.recordset[i], "OverDesignCycleTime", Object.getOwnPropertyDescriptor(result.recordset[i], "OverDesignTime"));
      delete result.recordset[i]["OverDesignTime"];
      Object.defineProperty(result.recordset[i], "OverDesignCycleTimeWithoutFault", Object.getOwnPropertyDescriptor(result.recordset[i], "OverDesignTimeWithoutFault"));
      delete result.recordset[i]["OverDesignTimeWithoutFault"];
    }

    // console.log(result.recordset);


    res.json(result.recordset);
    console.log("Finished /api/OperatorPage/getOperatorDataByTimeAndName");

  } catch (err) {
    console.log(err);
  }

});



// API for getting fault time detail
app.post("/api/OperatorPage/getFaultTimeDetailByTimes", jsonParser, async (req, res) => {
  console.log("requir /api/OperatorPage/getFaultTimeDetailByTimes");
  console.log(req.body);
  try {
    await sql.connect(config);

    const time1 = new Date();

    const result = await sql.query(
      "exec [dbo].[spFindSpecificAlarms] @StartTime = '" + req.body.start + "', @EndTime = '" + req.body.end + "';"
    );

    console.log((new Date().getTime() - time1.getTime())/1000 + " seconds used.");

    for (let i=0; i<result.recordset.length; i++){
      result.recordset[i].id = i;
    }

    // console.log(result.recordset);

    res.json(result.recordset);
    console.log("Finished /api/OperatorPage/getFaultTimeDetailByTimes");

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
