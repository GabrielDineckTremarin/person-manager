using PersonManager.Services.Interfaces;
using ContactOrganizer.Repository;
using ContactOrganizer.Models;

namespace ContactOrganizer.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository) {
            _contactRepository = contactRepository; 
        }

        public List<DtoContact> GetAllContacts()
        {
            return _contactRepository.GetAllContacts();
        }
        public DtoContact GetContactById(string contactId)
        {
            return _contactRepository.GetContactById(contactId);
        }
        public void CreateContact(DtoContact contact)
        {
            _contactRepository.CreateContact(contact);
        }
        public void UpdateContact(DtoContact contact)
        {
            _contactRepository.UpdateContact(contact);
        }
        public void DeleteContact(string contactId)
        {
            _contactRepository.DeleteContact(contactId);
        }
    }
}
