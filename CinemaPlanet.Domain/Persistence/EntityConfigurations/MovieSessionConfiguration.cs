using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class MovieSessionConfiguration : EntityTypeConfiguration<MovieSession>
    {
        public MovieSessionConfiguration()
        {
            HasMany(ms => ms.Orders)
                .WithRequired(o => o.MovieSession)
                .HasForeignKey(o => o.MovieSessionId);
        }
    }
}
