using CinemaPlanet.Domain.Core.DomainModels;
using System.Data.Entity.ModelConfiguration;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class AuditoriumConfiguration : EntityTypeConfiguration<Auditorium>
    {
        public AuditoriumConfiguration()
        {
            Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(255);

            Property(a => a.ImageUrl)
                .IsRequired()
                .HasMaxLength(255);

            HasMany(a => a.MovieSessions)
                .WithRequired(ms => ms.Auditorium)
                .HasForeignKey(ms => ms.AuditoriumId);
        }
    }
}
