using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace MCSWeb.Actions {
    public class Database {
        private const string CONNECT_STRING = @"Server=.\SQLExpress;Database=MCS;User Id=mcs;Password=mcs";

        public static List<string> getTagContent() {
            List<string> llistResult = new List<string>();
            using(SqlConnection conn = new SqlConnection(CONNECT_STRING)) {
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

        public static List<(string, string)> getTagContent(string ipAddress) {
            List<(string, string)> llistResult = new List<(string, string)>();
            using(SqlConnection conn = new SqlConnection(CONNECT_STRING)) {
                using(SqlCommand comm = conn.CreateCommand()) {
                    conn.Open();
                    comm.CommandText = $@"select tag_cont, tag_add_dt from dbo.tblTagContent where controller_ip = '{ipAddress}' order by tag_add_dt desc";
                    SqlDataReader dr = comm.ExecuteReader();
                    while(dr.Read()) {
                        llistResult.Add((dr[0].ToString(), dr[1].ToString()));
                    }
                }
            }
            return llistResult;
        }

        public static List<(string, string)> getControllerList() {
            List<(string, string)> llistResult = new();
            using(SqlConnection conn = new SqlConnection(CONNECT_STRING)) {
                using(SqlCommand comm = conn.CreateCommand()) {
                    conn.Open();
                    comm.CommandText = "select description, ip_address from dbo.tblController order by ip_address";
                    SqlDataReader dr = comm.ExecuteReader();
                    while(dr.Read()) {
                        llistResult.Add(( dr[0].ToString(), dr[1].ToString() ));
                    }
                }
            }
            return llistResult;
        }
    }
}
