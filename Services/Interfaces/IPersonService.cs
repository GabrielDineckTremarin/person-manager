using System;
using ContactOrganizer.Models;

namespace PersonManager.Services.Interfaces
{
    public interface IPersonService
    {
        List<PersonDTO> GetAllPeople();
        PersonDTO GetPersonById(string personId);
        void CreatePerson(PersonDTO person);
        void UpdatePerson(PersonDTO person);
        void DeletePerson(string personId);
    }
}