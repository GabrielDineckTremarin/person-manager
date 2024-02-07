using System;
using ContactOrganizer.Models;

namespace PersonManager.Services.Interfaces
{
    public interface IPersonService
    {
        List<DtoPerson> GetAllPeople();
        DtoPerson GetPersonById(string personId);
        void CreatePerson(DtoPerson person);
        void UpdatePerson(DtoPerson person);
        void DeletePerson(string personId);
    }
}