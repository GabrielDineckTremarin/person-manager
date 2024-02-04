using ContactOrganizer.Models;
using System;
using ContactOrganizer.Models;


namespace PersonManager.Services.Interfaces
{
    public interface IContactService
    {
        List<ContactDTO> GetAllContacts();
        ContactDTO GetContactById(string contactId);
        void CreateContact(ContactDTO contact);
        void UpdateContact(ContactDTO contact);
        void DeleteContact(string contactId);
    }
}