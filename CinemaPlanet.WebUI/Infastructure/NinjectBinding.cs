using CinemaPlanet.Domain.Core;
using CinemaPlanet.Domain.Persistence;
using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CinemaPlanet.WebUI.Infastructure
{
    public class NinjectBinding : NinjectModule
    {
        public override void Load()
        {
            Bind<IUnitOfWork>().To<UnitOfWork>();
        }
    }
}