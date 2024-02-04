using ContactOrganizer.Models;
using PersonManager.Services.Interfaces;

using ContactOrganizer.Repository;


namespace ContactOrganizer.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;

        public PersonService(IPersonRepository personRepository) { 
            _personRepository = personRepository;
        }

        public List<PersonDTO> GetAllPeople()
        {
            return _personRepository.GetAllPeople();
        }
        public PersonDTO GetPersonById(string personId)
        {
            return _personRepository.GetPersonById(personId);
        }
        public void CreatePerson(PersonDTO person)
        {
            _personRepository.CreatePerson(person);
        }
        public void UpdatePerson(PersonDTO person)
        {
            _personRepository.UpdatePerson(person);
        }
        public void DeletePerson(string personId)
        {
            _personRepository.DeletePerson(personId);
        }
    }
}
