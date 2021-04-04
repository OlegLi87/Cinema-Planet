using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(255);

            HasIndex(u => u.UserName)
                .IsUnique();

            Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(255);

            HasMany(u => u.Orders)
                .WithRequired(o => o.User)
                .HasForeignKey(o => o.UserId);


        }
    }
}
