using Aperta_web_app.Data;
using Aperta_web_app.Models.Club;
using Aperta_web_app.Models.User;
using AutoMapper;

namespace Aperta_web_app.Configurations
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Club, CreateClubDto>().ReverseMap();
            CreateMap<Club, GetClubsDto>().ReverseMap();
            CreateMap<Club, ClubDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

        }
    }
}
