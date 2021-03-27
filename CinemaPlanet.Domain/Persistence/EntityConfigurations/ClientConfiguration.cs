using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class ClientConfiguration : EntityTypeConfiguration<Client>
    {
        public ClientConfiguration()
        {
            Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(2550);

            HasMany(c => c.Orders)
                .WithRequired(o => o.Client)
                .HasForeignKey(o => o.ClientId);
        }
    }
}
