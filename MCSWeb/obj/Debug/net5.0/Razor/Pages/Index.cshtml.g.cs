#pragma checksum "D:\MCSController\MCSWeb\Pages\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "aa617cb76123d4001ba88cff9679816a2f8da3e2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MCSWeb.Pages.Pages_Index), @"mvc.1.0.razor-page", @"/Pages/Index.cshtml")]
namespace MCSWeb.Pages
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\MCSController\MCSWeb\Pages\_ViewImports.cshtml"
using MCSWeb;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"aa617cb76123d4001ba88cff9679816a2f8da3e2", @"/Pages/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f8bc799a7fce8b1ecb67a7cb40101712400e2384", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Index : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 3 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
  
    ViewData["Title"] = "Home page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"text-center\">\r\n    <h2 >Tag Content</h2>\r\n");
            WriteLiteral("    <div id=\"divContent\" style=\"width:100%;height:100%;overflow-y:auto;\">\r\n        <div class=\"h5\">\r\n");
            WriteLiteral("            ");
#nullable restore
#line 13 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
       Write(Html.DropDownListFor(m => m._selectedController, Model._Controller, new { @class= "form-select" }));

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
        </div>
        <br />
        <table class=""table table-striped"">
            <thead style=""background: blue; color: white"">
                <tr>
                    <th scope=""col"" style=""width: 10px"">#</th>
                    <th scope=""col"" >Content</th>
                    <th scope=""col"" style=""width: 200px"">DateTime</th>
                </tr>

            </thead>
            <tbody>
");
#nullable restore
#line 26 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
                 for( int i = 1; i <= Model._listTag.Count; ++ i ){   //foreach((string, string) stag in Model._listTag) {
                    (string, string) stag = Model._listTag[i-1];

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <tr>\r\n                        <td>");
#nullable restore
#line 29 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
                       Write(i);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n                        <td>");
#nullable restore
#line 30 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
                       Write(stag.Item1);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n                        <td>");
#nullable restore
#line 31 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
                       Write(stag.Item2);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n                    </tr>\r\n");
#nullable restore
#line 33 "D:\MCSController\MCSWeb\Pages\Index.cshtml"
                 }

#line default
#line hidden
#nullable disable
            WriteLiteral("            </tbody>\r\n        </table>\r\n");
            WriteLiteral("    </div>\r\n</div>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IndexModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<IndexModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<IndexModel>)PageContext?.ViewData;
        public IndexModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
