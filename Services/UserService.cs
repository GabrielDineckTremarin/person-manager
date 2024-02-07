using ContactOrganizer.Models;
using ContactOrganizer.Services.Interfaces;
using ContactOrganizer.Repository;


namespace ContactOrganizer.Services
{
    public class UserService :IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<DtoUser> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public DtoUser GetUserById(string userId)
        {
            return _userRepository.GetUserById(userId);
        }
        public void CreateUser(DtoUser user)
        {
            _userRepository.CreateUser(user);
        }
        public void UpdateUser(DtoUser user)
        {
            _userRepository.UpdateUser(user);
        }
        public void DeleteUser(string userId)
        {
            _userRepository.DeleteUser(userId);
        }

    }
}
