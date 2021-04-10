using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }
        public int Id { get; set; }

        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required]
        [MinLength(5, ErrorMessage = "Password must have minimum 5 characters.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Birth Date")]
        public DateTime BirthDate { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public string JWTToken { get; set; }
    }
}
