using ContactOrganizer.Models;
using System;

namespace ContactOrganizer.Repository
{
    public interface IUserRepository
    {
        List<DtoUser> GetAllUsers();
        DtoUser GetUserById(string userId);
        void CreateUser(DtoUser user);
        void UpdateUser(DtoUser user);
        void DeleteUser(string userId);
    }
}
