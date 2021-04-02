using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Auditorium
    {
        public Auditorium()
        {
            MovieSessions = new HashSet<MovieSession>();
        }
        public int Id { get; set; }

        [Required(ErrorMessage = "The auditorium Name field required.")]
        public string Name { get; set; }

        [Display(Name = "Image Url")]
        [Required(ErrorMessage = "The Image Url field is required.")]
        [RegularExpression(@"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)", ErrorMessage = "Value must conform to http/s ... png/jpg format.")]
        public string ImageUrl { get; set; }

        [Display(Name = "Basic Seats")]
        [Range(0, 255, ErrorMessage = "Value must be in range of 0 - 255.")]
        public byte BasicSeatsCapacity { get; set; }

        [Display(Name = "Silver Seats")]
        [Range(0, 255, ErrorMessage = "Value must be in range of 0 - 255.")]
        public byte SilverSeatsCapacity { get; set; }

        [Display(Name = "Gold Seats")]
        [Range(0, 255, ErrorMessage = "Value must be in range of 0 - 255.")]
        public byte GoldSeatsCapacity { get; set; }
        public virtual ICollection<MovieSession> MovieSessions { get; set; }

        public int GetSeatsCapacity()
        {
            return BasicSeatsCapacity + SilverSeatsCapacity + GoldSeatsCapacity;
        }
    }
}
