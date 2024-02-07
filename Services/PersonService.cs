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

        public List<DtoPerson> GetAllPeople()
        {
            return _personRepository.GetAllPeople();
        }
        public DtoPerson GetPersonById(string personId)
        {
            return _personRepository.GetPersonById(personId);
        }
        public void CreatePerson(DtoPerson person)
        {
            _personRepository.CreatePerson(person);
        }
        public void UpdatePerson(DtoPerson person)
        {
            _personRepository.UpdatePerson(person);
        }
        public void DeletePerson(string personId)
        {
            _personRepository.DeletePerson(personId);
        }
    }
}
