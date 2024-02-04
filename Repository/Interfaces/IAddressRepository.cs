using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;

namespace ContactOrganizer.Repository
{
    public interface IAddressRepository
    {
        List<AddressDTO> GetAllAddresses();
        AddressDTO GetAddressById(string addressId);
        void CreateAddress(AddressDTO address);
        void UpdateAddress(AddressDTO address);
        void DeleteAddress(string addressId);
    }
}