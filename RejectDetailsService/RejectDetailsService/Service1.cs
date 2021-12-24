using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace RejectDetailsService
{
    public partial class Service1 : ServiceBase
    {
        //private RejectDetails rejectClass = new RejectDetails();

        public Service1()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            addLog("start...");
            try
            {
                Timer timer = new Timer();
                timer.Interval = 500; // 0.5 seconds
                timer.Elapsed += new ElapsedEventHandler(this.OnTimer);
                timer.Start();
            }
            catch (Exception e)
            {
                addLog(e.Message);
            }
            try
            {
                //addLog("START COPY" + DateTime.Now.ToShortTimeString());
                Timer timer = new Timer();
                timer.Interval = 31000; // 60 seconds
                timer.Elapsed += new ElapsedEventHandler(this.OnTimerCopy);
                timer.Start();
            }
            catch (Exception e)
            {
                addLog(e.Message);
            }


        }

        protected override void OnStop()
        {
            addLog("stop...");
        }
        public void addLog(string slog)
        {
            using (StreamWriter sw = File.AppendText(@"c:\temp\log.txt"))
            {
                sw.WriteLine(slog);
            }
        }
        public void OnTimer(object sender, ElapsedEventArgs args)
        {
            new RejectDetails().Start();
        }

        public void OnTimerCopy(object sender, ElapsedEventArgs args)
        {
            new RejectDetails().CopyFile();
            //addLog("END COPY");
        }

    }
}
