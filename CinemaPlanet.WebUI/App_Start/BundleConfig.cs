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
            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/Content/bootstrap.css", "~/Content/CustomStyles/style.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryBootstrap")
                .Include("~/Scripts/jquery-{version}.js",
                "~/Scripts/popper.js",
                "~/Scripts/bootstrap.js"));

            bundles.Add(new Bundle("~/bundles/jqueryValidation")
                .Include("~/Scripts/jquery-validation/jquery.validate.js",
                "~/Scripts/jquery-validation/jquery.validate.unobtrusive.js"));
        }
    }
}