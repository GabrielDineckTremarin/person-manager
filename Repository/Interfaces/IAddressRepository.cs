using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;

namespace ContactOrganizer.Repository
{
    public interface IAddressRepository
    {
        List<DtoAddress> GetAllAddresses();
        DtoAddress GetAddressById(string addressId);
        void CreateAddress(DtoAddress address);
        void UpdateAddress(DtoAddress address);
        void DeleteAddress(string addressId);
    }
}