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

namespace RejectDetailsService {
    public class RejectDetails {
        const int DataTimeout = 5000;
        //private static DateTime lastDT = DateTime.Now;
        //public static bool is_running = true;

        //Read String
        private object GetStringValue(Tag Red_Msg, Libplctag client) {

            int size = client.GetInt32Value(Red_Msg, 0);
            int offset = DataType.Int32;
            string output = string.Empty;

            for(int i = 0; i < Red_Msg.ElementCount; i++) {
                var sb = new StringBuilder();

                for(int j = 0; j < size; j++) {
                    sb.Append((char)client.GetUint8Value(Red_Msg, (i * Red_Msg.ElementSize) + offset + j));
                }

                output = sb.ToString();
            }
            return output;
        }

        //Write String
        private void SetStringValue(Tag Wrt_Msg, Libplctag client, string value) {
            //First setting the size
            client.SetInt32Value(Wrt_Msg, 0, value.Length);

            //Setting string value
            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(value);

            int offset = DataType.Int32; //the first 4 bytes are used to store the string size
            int j = 0;

            for(j = 0; j < bytes.Length; j++) {
                int off = offset + j;
                client.SetUint8Value(Wrt_Msg, off, bytes[j]);
            }
        }

        public void Start() {
            //System.Console.WriteLine("Starting...")


            //Real
            var Read_DR1 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[55]", DataType.REAL, 1);
            var Read_DR2 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[56]", DataType.REAL, 1);
            var Read_DR3 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[57]", DataType.REAL, 1);
            var Red_DR4 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[58]", DataType.REAL, 1);
            var Red_DR5 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[59]", DataType.REAL, 1);
            var Red_DR6 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[60]", DataType.REAL, 1);
            var Red_DR7 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[61]", DataType.REAL, 1);
            var Red_DR8 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[62]", DataType.REAL, 1);
            var Red_DR9 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[63]", DataType.REAL, 1);
            var Red_DR10 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[64]", DataType.REAL, 1);
            var Red_DR11 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[65]", DataType.REAL, 1);
            var Red_DR12 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[66]", DataType.REAL, 1);
            var Red_DR13 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[67]", DataType.REAL, 1);
            var Red_DR14 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[68]", DataType.REAL, 1);
            var Red_DR15 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[69]", DataType.REAL, 1);
            var Red_DR16 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[70]", DataType.REAL, 1);
            var Red_DR17 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[71]", DataType.REAL, 1);
            var Red_DR18 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[72]", DataType.REAL, 1);
            var Red_DR19 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[73]", DataType.REAL, 1);
            var Red_DR20 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[74]", DataType.REAL, 1);
            var Red_DR21 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[75]", DataType.REAL, 1);
            var Red_DR22 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[76]", DataType.REAL, 1);
            var Red_DR23 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[77]", DataType.REAL, 1);
            var Red_DR24 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[78]", DataType.REAL, 1);
            var Red_DR25 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[79]", DataType.REAL, 1);
            var Red_DR26 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[80]", DataType.REAL, 1);
            var Red_DR27 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[81]", DataType.REAL, 1);
            var Red_DR28 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[82]", DataType.REAL, 1);
            var Red_DR29 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[83]", DataType.REAL, 1);
            var Red_DR30 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[84]", DataType.REAL, 1);
            var Red_DR31 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[85]", DataType.REAL, 1);
            var Red_DR32 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[86]", DataType.REAL, 1);
            var Red_DR33 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[87]", DataType.REAL, 1);
            var Red_DR34 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[88]", DataType.REAL, 1);
            var Red_DR35 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[89]", DataType.REAL, 1);
            var Red_DR36 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[90]", DataType.REAL, 1);
            var Red_DR37 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[91]", DataType.REAL, 1);
            var Red_DR38 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[92]", DataType.REAL, 1);
            var Red_DR39 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[93]", DataType.REAL, 1);
            var Red_DR40 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[94]", DataType.REAL, 1);
            var Red_DR41 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[95]", DataType.REAL, 1);
            var Red_DR42 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[96]", DataType.REAL, 1);
            var Red_DR43 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[97]", DataType.REAL, 1);
            var Red_DR44 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[98]", DataType.REAL, 1);
            var Red_DR45 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "gStation[6].Tracking.Data[99]", DataType.REAL, 1);


            //Bool
            var HS_1 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "DBrequest", DataType.SINT, 1);
            var HS_2 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "DBdone", DataType.SINT, 1);

            //String
            var Rej_Msg1 = new Tag(SystemKeys.IP_ADDRESS_THIS, "1,0", CpuType.LGX, "RejectDataCollect", DataType.String, 1, 1);
            //var tag8 = new Tag("192.168.1.10", "1,0",CpuType.LGX,"CSharpTestS",DataType.String, 1, 1);

            using(var client = new Libplctag()) {

                // add the tag
                client.AddTag(Read_DR1);
                client.AddTag(Read_DR2);
                client.AddTag(Read_DR3);
                client.AddTag(Red_DR4);
                client.AddTag(Red_DR5);
                client.AddTag(Red_DR6);
                client.AddTag(Red_DR7);
                client.AddTag(Red_DR8);
                client.AddTag(Red_DR9);
                client.AddTag(Red_DR10);
                client.AddTag(Red_DR11);
                client.AddTag(Red_DR12);
                client.AddTag(Red_DR13);
                client.AddTag(Red_DR14);
                client.AddTag(Red_DR15);
                client.AddTag(Red_DR16);
                client.AddTag(Red_DR17);
                client.AddTag(Red_DR18);
                client.AddTag(Red_DR19);
                client.AddTag(Red_DR20);
                client.AddTag(Red_DR21);
                client.AddTag(Red_DR22);
                client.AddTag(Red_DR23);
                client.AddTag(Red_DR24);
                client.AddTag(Red_DR25);
                client.AddTag(Red_DR26);
                client.AddTag(Red_DR27);
                client.AddTag(Red_DR28);
                client.AddTag(Red_DR29);
                client.AddTag(Red_DR30);
                client.AddTag(Red_DR31);
                client.AddTag(Red_DR32);
                client.AddTag(Red_DR33);
                client.AddTag(Red_DR34);
                client.AddTag(Red_DR35);
                client.AddTag(Red_DR36);
                client.AddTag(Red_DR37);
                client.AddTag(Red_DR38);
                client.AddTag(Red_DR39);
                client.AddTag(Red_DR40);
                client.AddTag(Red_DR41);
                client.AddTag(Red_DR42);
                client.AddTag(Red_DR43);
                client.AddTag(Red_DR44);
                client.AddTag(Red_DR45);

                client.AddTag(HS_1);
                client.AddTag(HS_2);

                client.AddTag(Rej_Msg1);

                while(client.GetStatus(Read_DR1) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Read_DR1) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Read_DR1))}\n");
                    return;
                }

                while(client.GetStatus(Read_DR2) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Read_DR2) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Read_DR2))}\n");
                    return;
                }

                while(client.GetStatus(Read_DR3) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Read_DR3) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Read_DR3))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR4) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR4) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR4))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR5) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR5) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR5))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR6) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR6) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR6))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR7) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR7) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR7))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR8) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR8) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR8))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR9) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR9) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR9))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR10) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR10) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR10))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR11) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR11) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR11))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR12) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR12) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR12))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR13) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR13) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR13))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR14) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR14) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR14))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR15) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR15) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR15))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR16) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR16) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR16))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR17) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR17) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR17))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR18) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR18) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR18))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR19) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR19) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR19))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR20) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR20) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR20))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR21) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR21) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR21))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR22) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR22) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR22))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR23) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR23) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR23))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR24) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR24) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR24))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR25) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR25) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR25))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR26) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR26) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR26))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR27) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR27) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR27))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR28) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR28) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR28))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR29) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR29) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR29))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR30) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR30) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR30))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR31) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR31) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR31))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR32) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR32) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR32))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR33) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR33) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR33))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR34) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR34) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR34))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR35) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR35) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR35))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR36) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR36) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR36))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR37) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR37) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR37))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR38) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR38) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR38))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR39) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR39) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR39))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR40) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR40) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR40))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR41) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR41) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR41))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR42) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR42) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR42))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR43) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR43) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR43))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR44) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR44) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR44))}\n");
                    return;
                }

                while(client.GetStatus(Red_DR45) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Red_DR45) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Red_DR45))}\n");
                    return;
                }

                while(client.GetStatus(Rej_Msg1) == Libplctag.PLCTAG_STATUS_PENDING) {
                    Thread.Sleep(100);
                }

                if(client.GetStatus(Rej_Msg1) != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"Error setting up tag internal state. Error{ client.DecodeError(client.GetStatus(Rej_Msg1))}\n");
                    return;
                }

                // Execute the read
                //var result1 = client.ReadTag(tag1, DataTimeout);

                var RedReal1 = client.ReadTag(Read_DR1, DataTimeout); //state of the reading.
                var RedReal2 = client.ReadTag(Read_DR2, DataTimeout); //state of the reading.
                var RedReal3 = client.ReadTag(Read_DR3, DataTimeout); //state of the reading.
                var RedReal4 = client.ReadTag(Red_DR4, DataTimeout); //state of the reading.
                var RedReal5 = client.ReadTag(Red_DR5, DataTimeout); //state of the reading.
                var RedReal6 = client.ReadTag(Red_DR6, DataTimeout); //state of the reading.
                var RedReal7 = client.ReadTag(Red_DR7, DataTimeout); //state of the reading.
                var RedReal8 = client.ReadTag(Red_DR8, DataTimeout); //state of the reading.
                var RedReal9 = client.ReadTag(Red_DR9, DataTimeout); //state of the reading.
                var RedReal10 = client.ReadTag(Red_DR10, DataTimeout); //state of the reading.
                var RedReal11 = client.ReadTag(Red_DR11, DataTimeout); //state of the reading.
                var RedReal12 = client.ReadTag(Red_DR12, DataTimeout); //state of the reading.
                var RedReal13 = client.ReadTag(Red_DR13, DataTimeout); //state of the reading.
                var RedReal14 = client.ReadTag(Red_DR14, DataTimeout); //state of the reading.
                var RedReal15 = client.ReadTag(Red_DR15, DataTimeout); //state of the reading.
                var RedReal16 = client.ReadTag(Red_DR16, DataTimeout); //state of the reading.
                var RedReal17 = client.ReadTag(Red_DR17, DataTimeout); //state of the reading.
                var RedReal18 = client.ReadTag(Red_DR18, DataTimeout); //state of the reading.
                var RedReal19 = client.ReadTag(Red_DR19, DataTimeout); //state of the reading.
                var RedReal20 = client.ReadTag(Red_DR20, DataTimeout); //state of the reading.
                var RedReal21 = client.ReadTag(Red_DR21, DataTimeout); //state of the reading.
                var RedReal22 = client.ReadTag(Red_DR22, DataTimeout); //state of the reading.
                var RedReal23 = client.ReadTag(Red_DR23, DataTimeout); //state of the reading.
                var RedReal24 = client.ReadTag(Red_DR24, DataTimeout); //state of the reading.
                var RedReal25 = client.ReadTag(Red_DR25, DataTimeout); //state of the reading.
                var RedReal26 = client.ReadTag(Red_DR26, DataTimeout); //state of the reading.
                var RedReal27 = client.ReadTag(Red_DR27, DataTimeout); //state of the reading.
                var RedReal28 = client.ReadTag(Red_DR28, DataTimeout); //state of the reading.
                var RedReal29 = client.ReadTag(Red_DR29, DataTimeout); //state of the reading.
                var RedReal30 = client.ReadTag(Red_DR30, DataTimeout); //state of the reading.
                var RedReal31 = client.ReadTag(Red_DR31, DataTimeout); //state of the reading.
                var RedReal32 = client.ReadTag(Red_DR32, DataTimeout); //state of the reading.
                var RedReal33 = client.ReadTag(Red_DR33, DataTimeout); //state of the reading.
                var RedReal34 = client.ReadTag(Red_DR34, DataTimeout); //state of the reading.
                var RedReal35 = client.ReadTag(Red_DR35, DataTimeout); //state of the reading.
                var RedReal36 = client.ReadTag(Red_DR36, DataTimeout); //state of the reading.
                var RedReal37 = client.ReadTag(Red_DR37, DataTimeout); //state of the reading.
                var RedReal38 = client.ReadTag(Red_DR38, DataTimeout); //state of the reading.
                var RedReal39 = client.ReadTag(Red_DR39, DataTimeout); //state of the reading.
                var RedReal40 = client.ReadTag(Red_DR40, DataTimeout); //state of the reading.
                var RedReal41 = client.ReadTag(Red_DR41, DataTimeout); //state of the reading.
                var RedReal42 = client.ReadTag(Red_DR42, DataTimeout); //state of the reading.
                var RedReal43 = client.ReadTag(Red_DR43, DataTimeout); //state of the reading.
                var RedReal44 = client.ReadTag(Red_DR44, DataTimeout); //state of the reading.
                var RedReal45 = client.ReadTag(Red_DR45, DataTimeout); //state of the reading.

                var rc = client.ReadTag(HS_1, DataTimeout); //state of the reading.

                var Msg1 = client.ReadTag(Rej_Msg1, DataTimeout);

                if(rc != Libplctag.PLCTAG_STATUS_OK)//manage error here
                {
                } else {
                    var value = client.GetBitValue(HS_1, 0, 1); //get the value
                }

                if(RedReal1 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal1}: {client.DecodeError(RedReal1)}\n");
                    return;
                }

                if(RedReal2 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal2}: {client.DecodeError(RedReal2)}\n");
                    return;
                }

                if(RedReal3 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal3}: {client.DecodeError(RedReal3)}\n");
                    return;
                }

                if(RedReal4 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal4}: {client.DecodeError(RedReal4)}\n");
                    return;
                }

                if(RedReal5 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal5}: {client.DecodeError(RedReal5)}\n");
                    return;
                }

                if(RedReal6 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal6}: {client.DecodeError(RedReal6)}\n");
                    return;
                }

                if(RedReal7 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal7}: {client.DecodeError(RedReal7)}\n");
                    return;
                }

                if(RedReal8 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal8}: {client.DecodeError(RedReal8)}\n");
                    return;
                }

                if(RedReal9 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal9}: {client.DecodeError(RedReal9)}\n");
                    return;
                }

                if(RedReal10 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal10}: {client.DecodeError(RedReal10)}\n");
                    return;
                }

                if(RedReal11 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal11}: {client.DecodeError(RedReal11)}\n");
                    return;
                }

                if(RedReal12 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal12}: {client.DecodeError(RedReal12)}\n");
                    return;
                }

                if(RedReal13 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal13}: {client.DecodeError(RedReal13)}\n");
                    return;
                }

                if(RedReal14 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal14}: {client.DecodeError(RedReal14)}\n");
                    return;
                }

                if(RedReal15 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal15}: {client.DecodeError(RedReal15)}\n");
                    return;
                }

                if(RedReal16 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal16}: {client.DecodeError(RedReal16)}\n");
                    return;
                }

                if(RedReal17 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal17}: {client.DecodeError(RedReal17)}\n");
                    return;
                }

                if(RedReal18 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal18}: {client.DecodeError(RedReal18)}\n");
                    return;
                }

                if(RedReal19 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal19}: {client.DecodeError(RedReal19)}\n");
                    return;
                }

                if(RedReal20 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal20}: {client.DecodeError(RedReal20)}\n");
                    return;
                }

                if(RedReal21 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal21}: {client.DecodeError(RedReal21)}\n");
                    return;
                }

                if(RedReal22 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal22}: {client.DecodeError(RedReal22)}\n");
                    return;
                }

                if(RedReal23 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal23}: {client.DecodeError(RedReal23)}\n");
                    return;
                }

                if(RedReal24 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal24}: {client.DecodeError(RedReal24)}\n");
                    return;
                }

                if(RedReal25 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal25}: {client.DecodeError(RedReal25)}\n");
                    return;
                }

                if(RedReal26 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal26}: {client.DecodeError(RedReal26)}\n");
                    return;
                }

                if(RedReal27 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal27}: {client.DecodeError(RedReal27)}\n");
                    return;
                }

                if(RedReal28 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal28}: {client.DecodeError(RedReal28)}\n");
                    return;
                }

                if(RedReal29 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal29}: {client.DecodeError(RedReal29)}\n");
                    return;
                }

                if(RedReal30 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal30}: {client.DecodeError(RedReal30)}\n");
                    return;
                }

                if(RedReal31 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal31}: {client.DecodeError(RedReal31)}\n");
                    return;
                }

                if(RedReal32 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal32}: {client.DecodeError(RedReal32)}\n");
                    return;
                }

                if(RedReal33 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal33}: {client.DecodeError(RedReal33)}\n");
                    return;
                }

                if(RedReal34 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal34}: {client.DecodeError(RedReal34)}\n");
                    return;
                }

                if(RedReal35 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal35}: {client.DecodeError(RedReal35)}\n");
                    return;
                }

                if(RedReal36 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal36}: {client.DecodeError(RedReal36)}\n");
                    return;
                }

                if(RedReal37 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal37}: {client.DecodeError(RedReal37)}\n");
                    return;
                }

                if(RedReal38 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal38}: {client.DecodeError(RedReal38)}\n");
                    return;
                }

                if(RedReal39 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal39}: {client.DecodeError(RedReal39)}\n");
                    return;
                }

                if(RedReal40 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal40}: {client.DecodeError(RedReal40)}\n");
                    return;
                }

                if(RedReal41 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal41}: {client.DecodeError(RedReal41)}\n");
                    return;
                }

                if(RedReal42 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal42}: {client.DecodeError(RedReal42)}\n");
                    return;
                }

                if(RedReal43 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal43}: {client.DecodeError(RedReal43)}\n");
                    return;
                }

                if(RedReal44 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal44}: {client.DecodeError(RedReal44)}\n");
                    return;
                }

                if(RedReal45 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {RedReal45}: {client.DecodeError(RedReal45)}\n");
                    return;
                }


                if(Msg1 != Libplctag.PLCTAG_STATUS_OK) {
                    Console.WriteLine($"ERROR: Unable to read the data! Got error code {Msg1}: {client.DecodeError(Msg1)}\n");
                    return;
                }

                // Convert the data
                var DBrequest = client.GetBitValue(HS_1, -1, DataTimeout); // multiply with tag.ElementSize to keep indexes consistant with the indexes on the plc

                var ReadValue1 = client.GetFloat32Value(Read_DR1, 0 * Read_DR1.ElementSize);
                var ReadValue2 = client.GetFloat32Value(Read_DR2, 0 * Read_DR2.ElementSize);
                var ReadValue3 = client.GetFloat32Value(Read_DR3, 0 * Read_DR3.ElementSize);
                var ReadValue4 = client.GetFloat32Value(Red_DR4, 0 * Red_DR4.ElementSize);
                var ReadValue5 = client.GetFloat32Value(Red_DR5, 0 * Red_DR5.ElementSize);
                var ReadValue6 = client.GetFloat32Value(Red_DR6, 0 * Red_DR6.ElementSize);
                var ReadValue7 = client.GetFloat32Value(Red_DR7, 0 * Red_DR7.ElementSize);
                var ReadValue8 = client.GetFloat32Value(Red_DR8, 0 * Red_DR8.ElementSize);
                var ReadValue9 = client.GetFloat32Value(Red_DR9, 0 * Red_DR9.ElementSize);
                var ReadValue10 = client.GetFloat32Value(Red_DR10, 0 * Red_DR10.ElementSize);
                var ReadValue11 = client.GetFloat32Value(Red_DR11, 0 * Red_DR11.ElementSize);
                var ReadValue12 = client.GetFloat32Value(Red_DR12, 0 * Red_DR12.ElementSize);
                var ReadValue13 = client.GetFloat32Value(Red_DR13, 0 * Red_DR13.ElementSize);
                var ReadValue14 = client.GetFloat32Value(Red_DR14, 0 * Red_DR14.ElementSize);
                var ReadValue15 = client.GetFloat32Value(Red_DR15, 0 * Red_DR15.ElementSize);
                var ReadValue16 = client.GetFloat32Value(Red_DR16, 0 * Red_DR16.ElementSize);
                var ReadValue17 = client.GetFloat32Value(Red_DR17, 0 * Red_DR17.ElementSize);
                var ReadValue18 = client.GetFloat32Value(Red_DR18, 0 * Red_DR18.ElementSize);
                var ReadValue19 = client.GetFloat32Value(Red_DR19, 0 * Red_DR19.ElementSize);
                var ReadValue20 = client.GetFloat32Value(Red_DR20, 0 * Red_DR20.ElementSize);
                var ReadValue21 = client.GetFloat32Value(Red_DR21, 0 * Red_DR21.ElementSize);
                var ReadValue22 = client.GetFloat32Value(Red_DR22, 0 * Red_DR22.ElementSize);
                var ReadValue23 = client.GetFloat32Value(Red_DR23, 0 * Red_DR23.ElementSize);
                var ReadValue24 = client.GetFloat32Value(Red_DR24, 0 * Red_DR24.ElementSize);
                var ReadValue25 = client.GetFloat32Value(Red_DR25, 0 * Red_DR25.ElementSize);
                var ReadValue26 = client.GetFloat32Value(Red_DR26, 0 * Red_DR26.ElementSize);
                var ReadValue27 = client.GetFloat32Value(Red_DR27, 0 * Red_DR27.ElementSize);
                var ReadValue28 = client.GetFloat32Value(Red_DR28, 0 * Red_DR28.ElementSize);
                var ReadValue29 = client.GetFloat32Value(Red_DR29, 0 * Red_DR29.ElementSize);
                var ReadValue30 = client.GetFloat32Value(Red_DR30, 0 * Red_DR30.ElementSize);
                var ReadValue31 = client.GetFloat32Value(Red_DR31, 0 * Red_DR31.ElementSize);
                var ReadValue32 = client.GetFloat32Value(Red_DR32, 0 * Red_DR32.ElementSize);
                var ReadValue33 = client.GetFloat32Value(Red_DR33, 0 * Red_DR33.ElementSize);
                var ReadValue34 = client.GetFloat32Value(Red_DR34, 0 * Red_DR34.ElementSize);
                var ReadValue35 = client.GetFloat32Value(Red_DR35, 0 * Red_DR35.ElementSize);
                var ReadValue36 = client.GetFloat32Value(Red_DR36, 0 * Red_DR36.ElementSize);
                var ReadValue37 = client.GetFloat32Value(Red_DR37, 0 * Red_DR37.ElementSize);
                var ReadValue38 = client.GetFloat32Value(Red_DR38, 0 * Red_DR38.ElementSize);
                var ReadValue39 = client.GetFloat32Value(Red_DR39, 0 * Red_DR39.ElementSize);
                var ReadValue40 = client.GetFloat32Value(Red_DR40, 0 * Red_DR40.ElementSize);
                var ReadValue41 = client.GetFloat32Value(Red_DR41, 0 * Red_DR41.ElementSize);
                var ReadValue42 = client.GetFloat32Value(Red_DR42, 0 * Red_DR42.ElementSize);
                var ReadValue43 = client.GetFloat32Value(Red_DR43, 0 * Red_DR43.ElementSize);
                var ReadValue44 = client.GetFloat32Value(Red_DR44, 0 * Red_DR44.ElementSize);
                var ReadValue45 = client.GetFloat32Value(Red_DR45, 0 * Red_DR45.ElementSize);

                var HMI_Reject_Message = GetStringValue(Rej_Msg1, client);

                if(DBrequest == true) {

                    //Console.WriteLine("save to file");
                    SaveToFile(ReadValue1.ToString());
                    SaveToFile(ReadValue2.ToString());
                    SaveToFile(ReadValue3.ToString());
                    SaveToFile(ReadValue4.ToString());
                    SaveToFile(ReadValue5.ToString());
                    SaveToFile(ReadValue6.ToString());
                    SaveToFile(ReadValue7.ToString());
                    SaveToFile(ReadValue8.ToString());
                    SaveToFile(ReadValue9.ToString());
                    SaveToFile(ReadValue10.ToString());
                    SaveToFile(ReadValue11.ToString());
                    SaveToFile(ReadValue12.ToString());
                    SaveToFile(ReadValue13.ToString());
                    SaveToFile(ReadValue14.ToString());
                    SaveToFile(ReadValue15.ToString());
                    SaveToFile(ReadValue16.ToString());
                    SaveToFile(ReadValue17.ToString());
                    SaveToFile(ReadValue18.ToString());
                    SaveToFile(ReadValue19.ToString());
                    SaveToFile(ReadValue20.ToString());
                    SaveToFile(ReadValue21.ToString());
                    SaveToFile(ReadValue22.ToString());
                    SaveToFile(ReadValue23.ToString());
                    SaveToFile(ReadValue24.ToString());
                    SaveToFile(ReadValue25.ToString());
                    SaveToFile(ReadValue26.ToString());
                    SaveToFile(ReadValue27.ToString());
                    SaveToFile(ReadValue28.ToString());
                    SaveToFile(ReadValue29.ToString());
                    SaveToFile(ReadValue30.ToString());
                    SaveToFile(ReadValue31.ToString());
                    SaveToFile(ReadValue32.ToString());
                    SaveToFile(ReadValue33.ToString());
                    SaveToFile(ReadValue34.ToString());
                    SaveToFile(ReadValue35.ToString());
                    SaveToFile(ReadValue36.ToString());
                    SaveToFile(ReadValue37.ToString());
                    SaveToFile(ReadValue38.ToString());
                    SaveToFile(ReadValue39.ToString());
                    SaveToFile(ReadValue40.ToString());
                    SaveToFile(ReadValue41.ToString());
                    SaveToFile(ReadValue42.ToString());
                    SaveToFile(ReadValue43.ToString());
                    SaveToFile(ReadValue44.ToString());
                    SaveToFile(ReadValue45.ToString());

                    SaveToFile(HMI_Reject_Message.ToString(), "40", tru);

                    //Done Bit
                    client.SetBitValue(HS_2, 0, Convert.ToBoolean(1), DataTimeout);
                } else {
                    client.SetBitValue(HS_2, 0, Convert.ToBoolean(0), DataTimeout);
                }
            }
        }


        public void SaveToFile(string tag, string Station = "30", bool saveToFile = false) {
            //string lsFileName = getFileName();
            if(saveToFile) {
                using(StreamWriter sw = File.AppendText(SystemKeys.getFullFileName())) {
                    sw.WriteLine(tag);
                }
            }
            Database.SetContent(tag, SystemKeys.IP_ADDRESS_THIS);
        }

        public void CopyFile() {
            string lsSource = SystemKeys.getFullFileName();
            if(File.Exists(lsSource)) {
                File.Copy(lsSource, SystemKeys.getCopyFileName(), true);
            }
        }
    }
}
