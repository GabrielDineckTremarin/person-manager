using System;
using ContactOrganizer.Models;

namespace ContactOrganizer.Repository
{
    public interface IPersonRepository
    {
        List<DtoPerson> GetAllPeople();
        DtoPerson GetPersonById(string personId);
        void CreatePerson(DtoPerson person);
        void UpdatePerson(DtoPerson person);
        void DeletePerson(string personId);
    }
}