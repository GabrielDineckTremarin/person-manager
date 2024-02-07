using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;

namespace PersonManager.Services.Interfaces
{
    public interface IAddressService
    {
        List<DtoAddress> GetAllAddresses();
        DtoAddress GetAddressById(string addressId);
        void CreateAddress(DtoAddress address);
        void UpdateAddress(DtoAddress address);
        void DeleteAddress(string addressId);
    }
}