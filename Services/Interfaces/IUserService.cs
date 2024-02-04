using ContactOrganizer.Models;
using System;

namespace ContactOrganizer.Services.Interfaces
{
    public interface IUserService
    {
        List<UserDTO> GetAllUsers();
        UserDTO GetUserById(string userId);
        void CreateUser(UserDTO user);
        void UpdateUser(UserDTO user);
        void DeleteUser(string userId);
    }
}
