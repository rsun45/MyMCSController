using LibplctagWrapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Data;
using System.Configuration;
using System.Web;
using System.Reflection;
using System.IO;
using System.Data.Odbc;

namespace RejectDetailsService
{
    public class RejectDetails
    {
        const int DataTimeout = 5000;
        //private static DateTime lastDT = DateTime.Now;
        //public static bool is_running = true;

        //Read String
        private object GetStringValue(Tag tag7, Libplctag client)
        {

            int size = client.GetInt32Value(tag7, 0);
            int offset = DataType.Int32;
            string output = string.Empty;

            for (int i = 0; i < tag7.ElementCount; i++)
            {
                var sb = new StringBuilder();

                for (int j = 0; j < size; j++)
                {
                    sb.Append((char)client.GetUint8Value(tag7, (i * tag7.ElementSize) + offset + j));
                }

                output = sb.ToString();
            }
            return output;
        }

        //Write String
        private void SetStringValue(Tag tag8, Libplctag client, string value)
        {
            //First setting the size
            client.SetInt32Value(tag8, 0, value.Length);

            //Setting string value
            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(value);

            int offset = DataType.Int32; //the first 4 bytes are used to store the string size
            int j = 0;

            for (j = 0; j < bytes.Length; j++)
            {
                int off = offset + j;
                client.SetUint8Value(tag8, off, bytes[j]);
            }
        }

        public void Start()
        {
            //System.Console.WriteLine("Starting...")
            
            
                //Bool
                var tag1 = new Tag("192.168.1.10", "1,0", CpuType.LGX, "DBrequest", DataType.SINT, 1);
                var tag10 = new Tag("192.168.1.10", "1,0", CpuType.LGX, "DBdone", DataType.SINT, 1);

                //String
                var tag7 = new Tag("192.168.1.10", "1,0", CpuType.LGX, "RejectDataCollect", DataType.String, 1, 1);
                //var tag8 = new Tag("192.168.1.10", "1,0",CpuType.LGX,"CSharpTestS",DataType.String, 1, 1);

                using (var client = new Libplctag())
                {
                    // add the tag                    
                    client.AddTag(tag1);

                    client.AddTag(tag7);

                    client.AddTag(tag10);

                    while (client.GetStatus(tag7) == Libplctag.PLCTAG_STATUS_PENDING)
                    {
                        Thread.Sleep(100);
                    }

                    if (client.GetStatus(tag7) != Libplctag.PLCTAG_STATUS_OK)
                    {
                        Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(tag7))}\n");
                        return;
                    }

                    // Execute the read
                    //var result1 = client.ReadTag(tag1, DataTimeout);

                    var result7 = client.ReadTag(tag7, DataTimeout);

                    var rc = client.ReadTag(tag1, DataTimeout); //state of the reading.

                    if (rc != Libplctag.PLCTAG_STATUS_OK)//manage error here
                    {
                    }
                    else
                    {
                        var value = client.GetBitValue(tag1, 0, 1); //get the value
                    }


                    if (result7 != Libplctag.PLCTAG_STATUS_OK)
                    {
                        Console.WriteLine($"ERROR: Unable to read the data! Got error code {result7}: {client.DecodeError(result7)}\n");
                        return;
                    }

                    // Convert the data
                    var DBrequest = client.GetBitValue(tag1, -1, DataTimeout); // multiply with tag.ElementSize to keep indexes consistant with the indexes on the plc

                    var HMI_Reject_Message = GetStringValue(tag7, client);

                    if (DBrequest == true)
                    {

                        Console.WriteLine("save to file");
                        SaveToFile(HMI_Reject_Message.ToString());

                        //Done Bit
                        client.SetBitValue(tag10, 0, Convert.ToBoolean(1), DataTimeout);
                    }
                    else
                    {
                        client.SetBitValue(tag10, 0, Convert.ToBoolean(0), DataTimeout);
                    }


                    // print to console
                    //Console.WriteLine("DBrequest " + DBrequest);
                    //Console.WriteLine("HMI_Reject_Message " + HMI_Reject_Message);

                }
            }

            //finally
            //{
                //Console.WriteLine("Terminate...");
                //Console.ReadKey();
                //break;
            //}

        


        public void SaveToFile(string tag)
        {
            string lsFileName = getFileName();
            using (StreamWriter sw = File.AppendText(getFilePath(lsFileName)))
            {
                sw.WriteLine(tag);
            }
            /*try
            {
                if (DateTime.Now.AddMinutes(-1) >= lastDT)
                {

                    string lsTargetFile = getCopyPath(lsFileName);
                    File.Copy(getFilePath(lsFileName), lsTargetFile, true);
                    lastDT = DateTime.Now;

                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }*/
        }

        private string getFilePath(string name)
        {
            return @"c:\Users\MCS\tag-" + name;
        }

        private string getCopyPath(string name)
        {
            return @"\\mytfs01\public\EOLT_DataSource\Honda_bulkhead\RejectDetails-tag-" + name;
        }
        private string getFileName()
        {
            return DateTime.Now.ToString("yyyy-MM-dd") + ".csv";
        }

        public void CopyFile()
        {
            string lsTargetFile = getCopyPath(getFileName());
            File.Copy(getFilePath(getFileName()), lsTargetFile, true);
            
        }
    }
}
