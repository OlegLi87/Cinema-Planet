using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class MovieConfiguration : EntityTypeConfiguration<Movie>
    {
        public MovieConfiguration()
        {
            Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(255);

            Property(m => m.Description)
                .IsRequired();

            Property(m => m.ImageUrl)
                .IsRequired();

            HasMany(m => m.MovieSessions)
                .WithRequired(ms => ms.Movie)
                .HasForeignKey(ms => ms.MovieId);
        }
    }
}
