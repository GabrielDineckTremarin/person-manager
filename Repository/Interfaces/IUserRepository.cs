using ContactOrganizer.Models;
using System;

namespace ContactOrganizer.Repository
{
    public interface IUserRepository
    {
        List<UserDTO> GetAllUsers();
        UserDTO GetUserById(string userId);
        void CreateUser(UserDTO user);
        void UpdateUser(UserDTO user);
        void DeleteUser(string userId);
    }
}
