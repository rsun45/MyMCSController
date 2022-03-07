using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MCSWeb.Actions;

namespace MCSWeb.Pages
{
    public class tagGridModel : PageModel
    {
        public tagGridModel(string ipAddress = null) {
            if(ipAddress != null)
                this._tagList = Database.getTagContent(ipAddress);
            else
                this._tagList = new List<(string, string)>();
        }
        public void OnGet()
        {
        }

        public List<(string, string)> _tagList;
    }
}
