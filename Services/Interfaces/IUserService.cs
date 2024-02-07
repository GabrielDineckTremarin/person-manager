using ContactOrganizer.Models;
using System;

namespace ContactOrganizer.Services.Interfaces
{
    public interface IUserService
    {
        List<DtoUser> GetAllUsers();
        DtoUser GetUserById(string userId);
        void CreateUser(DtoUser user);
        void UpdateUser(DtoUser user);
        void DeleteUser(string userId);
    }
}
