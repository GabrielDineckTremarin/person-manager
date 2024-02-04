using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;

namespace PersonManager.Services.Interfaces
{
    public interface IAddressService
    {
        List<AddressDTO> GetAllAddresses();
        AddressDTO GetAddressById(string addressId);
        void CreateAddress(AddressDTO address);
        void UpdateAddress(AddressDTO address);
        void DeleteAddress(string addressId);
    }
}