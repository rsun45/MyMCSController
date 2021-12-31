using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RejectDetailsService {
    public class Database {
        public static void SetContent(string psContent, string ipAddress) {
            
            using(SqlConnection conn = new SqlConnection(SystemKeys.DB_CONNECT)) {
                using(SqlCommand com = conn.CreateCommand()) {
                    conn.Open();
                    com.CommandText = $@"INSERT INTO dbo.tblTagContent (tag_cont, controller_ip) VALUES ('{psContent}', '{ipAddress}')";
                    com.ExecuteNonQuery();
                }
            }
        }
    }
}
