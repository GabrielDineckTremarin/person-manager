using System;
using ContactOrganizer.Models;

namespace ContactOrganizer.Repository
{
    public interface IPersonRepository
    {
        List<PersonDTO> GetAllPeople();
        PersonDTO GetPersonById(string personId);
        void CreatePerson(PersonDTO person);
        void UpdatePerson(PersonDTO person);
        void DeletePerson(string personId);
    }
}