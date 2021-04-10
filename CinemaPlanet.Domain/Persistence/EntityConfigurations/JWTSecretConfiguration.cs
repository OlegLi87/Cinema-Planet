using CinemaPlanet.Domain.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CinemaPlanet.Domain.Persistence.EntityConfigurations
{
    class JWTSecretConfiguration : EntityTypeConfiguration<JWTSecret>
    {
        public JWTSecretConfiguration()
        {
            Property(jwt => jwt.Secret)
                .IsRequired();

            Property(jwt => jwt.Name)
                .IsRequired();
        }
    }
}
