using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CinemaPlanet.WebUI.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content")
                .Include("~/Content/bootstrap.css", "~/Content/Style.css"));

            bundles.Add(new ScriptBundle("~/Scripts")
                .Include("~/Scripts/jquery-3.6.0.js",
                "~/Scripts/popper.js",
                "~/Scripts/bootstrap.js"));
        }
    }
}