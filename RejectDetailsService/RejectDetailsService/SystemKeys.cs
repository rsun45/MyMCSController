using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace RejectDetailsService {
    public class SystemKeys {
        public static readonly string FILE_FOLDER;
        public static readonly string FILE_NAME_PREFIX;
        public static readonly string FILE_NAME;
        public static readonly string FILE_NAME_EXT;
        public static readonly string COPY_FOLDER;
        public static readonly string COPY_FILE_EXT;
        public static readonly string COPY_FILE_PREFIX;
        public static readonly int VISIT_INTERVAL;
        public static readonly int COPY_INTERVAL;
        public static readonly string LOG_FILE;
        public static readonly string DB_CONNECT;

        private const string FILE_FOLDER_KEY = "fileFolder";
        private const string FILE_NAME_PREFIX_KEY = "fileNamePrefix";
        private const string FILE_NAME_KEY = "fileName";
        private const string FILE_NAME_EXT_KEY = "fileNameExt";
        private const string COPY_FOLDER_KEY = "copyFolder";
        private const string COPY_FILE_EXT_KEY = "copyFileExt";
        private const string COPY_FILE_PREFIX_KEY = "copyNamePrefix";
        private const string VISIT_INTERVAL_KEY = "visitInterval";
        private const string COPY_INTERVAL_KEY = "copyInterval";
        private const string LOG_FILE_KEY = "logFile";
        private const string DB_CONNECT_STRING_KEY = "DBConnect";

        static SystemKeys() {
            var appSetings = ConfigurationManager.AppSettings;

            FILE_FOLDER = appSetings[FILE_FOLDER_KEY] ?? @"c:\temp";
            FILE_NAME_PREFIX = appSetings[FILE_NAME_PREFIX_KEY] ?? @"tag-";
            FILE_NAME = appSetings[FILE_NAME_KEY] ?? @"yyy-MM-dd";
            FILE_NAME_EXT = appSetings[FILE_NAME_EXT_KEY] ?? "";
            COPY_FOLDER = appSetings[COPY_FOLDER_KEY] ?? @"c:\temp";
            COPY_FILE_PREFIX = appSetings[COPY_FILE_PREFIX_KEY] ?? @"RejectDetails-tag-";
            COPY_FILE_EXT = appSetings[COPY_FILE_EXT_KEY] ?? @"csv";
            VISIT_INTERVAL = int.Parse(appSetings[VISIT_INTERVAL_KEY] ?? @"500");
            COPY_INTERVAL = int.Parse(appSetings[COPY_INTERVAL_KEY] ?? @"31000");
            LOG_FILE = appSetings[LOG_FILE_KEY] ?? @"c:\temp\log.txt";
            DB_CONNECT = appSetings[DB_CONNECT_STRING_KEY] ?? @"Server=.\\SQLExpress;Database=MCS;Trusted_Connection=True";
        }


        private static string getFileNameBody() {
            return DateTime.Now.ToString(FILE_NAME);
        }
        private static string getFileName() {
            return FILE_NAME_PREFIX + getFileNameBody() + (string.IsNullOrEmpty(FILE_NAME_EXT) ? "" : ("." + FILE_NAME_EXT));
        }

        public static string getFullFileName() {
            return Path.Combine(FILE_FOLDER, getFileName());
        }

        public static string getCopyFileName() {
            return Path.Combine(COPY_FOLDER, COPY_FILE_PREFIX + getFileNameBody() + "." + COPY_FILE_EXT);
        }

        public static string getCurrentDateTime() {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}
