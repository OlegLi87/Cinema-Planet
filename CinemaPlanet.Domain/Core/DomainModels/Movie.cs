using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace CinemaPlanet.Domain.Core.DomainModels
{
    public class Movie
    {
        public Movie()
        {
            MovieSessions = new HashSet<MovieSession>();
        }

        public int Id { get; set; }

        [Display(Name = "Movie Name")]
        [Required(ErrorMessage = "Movie Name field is required.")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Description field is required.")]
        public string Description { get; set; }

        [Display(Name = "Image Url")]
        [Required(ErrorMessage = "Image Url field is required.")]
        [RegularExpression(@"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|jpeg)", ErrorMessage = "Value must conform to http/s ... png/jpg/jpeg format.")]
        public string ImageUrl { get; set; }


        [Display(Name = "Release Date")]
        [Required(ErrorMessage = "Release Date field is required.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime ReleaseDate { get; set; }
        public Genre Genre { get; set; }

        [Range(0, float.MaxValue, ErrorMessage = "Price must a positive number.")]
        [Display(Name = "Basic seat price")]
        public float BasicSeatPrice { get; set; }

        [Range(0, float.MaxValue, ErrorMessage = "Price must a positive number.")]
        [Display(Name = "Silver seat price")]
        public float SilverSeatPrice { get; set; }

        [Range(0, float.MaxValue, ErrorMessage = "Price must a positive number.")]
        [Display(Name = "Gold seat price")]
        public float GoldSeatPrice { get; set; }
        public virtual ICollection<MovieSession> MovieSessions { get; set; }

        public IEnumerable<DateTime> GetAvailableSessionDatesForMovie()
        {
            return (MovieSessions as IEnumerable<MovieSession>)
                .Where(ms => ms.IsSessionAvailbale())
                .Select(ms => ms.SessionDate);
        }
    }
}
