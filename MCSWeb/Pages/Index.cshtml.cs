using MCSWeb.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
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
        }
    }
}
