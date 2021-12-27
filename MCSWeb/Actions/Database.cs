using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace MCSWeb.Actions {
    public class Database {
        public static List<string> getTagContent() {
            List<string> llistResult = new List<string>();
            using(SqlConnection conn = new SqlConnection(@"Server=.\SQLExpress;Database=MCS;User Id=mcs;Password=mcs")) {
                using(SqlCommand comm = conn.CreateCommand()) {
                    conn.Open();
                    comm.CommandText = "select tag_cont from dbo.tblTagContent order by id desc";
                    SqlDataReader dr = comm.ExecuteReader();
                    while(dr.Read()) {
                        llistResult.Add(dr[0].ToString());
                    }
                }
            }
            return llistResult;
        }
    }
}
