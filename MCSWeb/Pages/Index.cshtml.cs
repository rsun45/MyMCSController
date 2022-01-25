using MCSWeb.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCSWeb.Pages {
    public class IndexModel : PageModel {
        private readonly ILogger<IndexModel> _logger;
        public List<string> _listTag {
            get;
            set;
        }

        public IndexModel(ILogger<IndexModel> logger) {
            _logger = logger;
        }

        public void OnGet() {
            this._listTag = Database.getTagContent();
            var controllers = Database.getControllerList();
            _Controller = new List<SelectListItem>();
            foreach( (string, string) con in controllers ) {
                _Controller.Add(new SelectListItem(con.Item1, con.Item2));
            }
        }

        //public List<(string, string)> _Controller {
        //    get;
        //    set;
        //}
        public string _selectedController {
            get;
            set;
        }
        public List<SelectListItem> _Controller {
            get;
            set;
        }
    }
}
