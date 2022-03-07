using MCSWeb.Actions;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace MCSWeb.Pages {
    public class IndexModel : PageModel {
        private readonly ILogger<IndexModel> _logger;
        public List<(string, string)> _listTag {
            get;
            set;
        }

        public IndexModel(ILogger<IndexModel> logger) {
            _logger = logger;
        }

        public void OnPost() {
                this._listTag = Database.getTagContent(_selectedController);
        }
        public void OnGet() {

            var controllers = Database.getControllerList();
            _Controller = new List<SelectListItem>();
            foreach( (string, string) con in controllers ) {
                _Controller.Add(new SelectListItem(con.Item1, con.Item2));
            }

            if(controllers.Count > 0)
                this._listTag = Database.getTagContent(controllers[0].Item2);

        }

        protected void HandleTypeChange(ChangeEventArgs e) {
            string sType = e.Value.ToString();
            this._listTag = Database.getTagContent(sType);
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
