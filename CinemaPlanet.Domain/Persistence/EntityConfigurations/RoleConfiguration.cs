using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class RoleConfiguration : EntityTypeConfiguration<Role>
    {
        public RoleConfiguration()
        {
            Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(255);

            HasMany(r => r.Users)
                .WithRequired(u => u.Role)
                .HasForeignKey(u => u.RoleId);
        }
    }
}
