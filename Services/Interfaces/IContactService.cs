using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;


namespace PersonManager.Services.Interfaces
{
    public interface IContactService
    {
        List<DtoContact> GetAllContacts();
        DtoContact GetContactById(string contactId);
        void CreateContact(DtoContact contact);
        void UpdateContact(DtoContact contact);
        void DeleteContact(string contactId);
    }
}