using ContactOrganizer.Models;
using PersonManager.Services.Interfaces;
using ContactOrganizer.Repository;


namespace ContactOrganizer.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository _addressRepository;
        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public List<AddressDTO> GetAllAddresses(){
            return _addressRepository.GetAllAddresses();
        }
        public AddressDTO GetAddressById(string addressId){
            return _addressRepository.GetAddressById(addressId);
        }
        public void CreateAddress(AddressDTO address){
            _addressRepository.CreateAddress(address);  
        }
        public void UpdateAddress(AddressDTO address){
            _addressRepository.UpdateAddress(address);
        }
        public void DeleteAddress(string addressId){
            _addressRepository.DeleteAddress(addressId);
        }
    }
}
