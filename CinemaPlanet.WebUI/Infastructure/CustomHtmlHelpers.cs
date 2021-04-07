using CinemaPlanet.Domain.Core.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CinemaPlanet.WebUI.Infastructure
{
    public static class CustomHtmlHelpers
    {
        public static MvcHtmlString SessionDatesForMovieDropDown(this HtmlHelper helper, Movie movie, string elementId)
        {
            var sessionDates = movie.GetAvailableSessionDatesForMovie().Select(d => d.ToString("dd-MM-yy"));
            return createDropDown(sessionDates, elementId);
        }

        public static MvcHtmlString AvailableSeatsForMovieDropDown(this HtmlHelper helper, Movie movie, string elementId)
        {
            List<string> availableSeatTypes = new List<string>();

            foreach (SeatType seatType in Enum.GetValues(typeof(SeatType)))
            {
                foreach (var session in movie.MovieSessions)
                {
                    if (session.IsSeatTypeAvailable(seatType))
                    {
                        availableSeatTypes.Add(seatType.ToString());
                        break;
                    }
                }
            }

            return createDropDown(availableSeatTypes.Distinct(), elementId);
        }

        static MvcHtmlString createDropDown(IEnumerable<string> items, string id)
        {
            TagBuilder selectTag = new TagBuilder("select");
            selectTag.AddCssClass("form-control");
            selectTag.Attributes.Add("name", id);

            foreach (var item in items)
            {
                TagBuilder optionTag = new TagBuilder("option");
                optionTag.SetInnerText(item);
                selectTag.InnerHtml += optionTag;
            }

            return new MvcHtmlString(selectTag.ToString());
        }
    }
}