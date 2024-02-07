﻿using ContactOrganizer.Services.Interfaces;
using MongoDB.Bson;
using PersonManager.Services.Interfaces;
using ContactOrganizer.Utils;
using ContactOrganizer.Models;

namespace ContactOrganizer.Business
{
    public class BlPerson
    {

        IPersonService _personService;
        IContactService _contactService;
        IAddressService _addressService;
        IUserService _userService;

        public BlPerson(
        IPersonService personService,
        IContactService contactService,
        IAddressService addressService,
        IUserService userService
        )
        {
            _personService = personService;
            _contactService = contactService;
            _addressService = addressService;
            _userService = userService;
        }


        public async Task<object> GetPersonById(string id)
        {
            if (String.IsNullOrEmpty(id) || !Mongo_Utils.IsObjectId(id))
                throw new Exception("Id inválido");

            var person = _personService.GetPersonById(id);

            if(person == null)
                throw new Exception("Contato não encontrado");

            return person;
        }

        public async Task<object> GetListOfPeople()
        {
            var people = _personService.GetAllPeople();

            if (people == null || people.Count == 0)
                throw new Exception("Parece que não há contatos cadastrados");

            var peopleResponse = new List<PersonResponse>();

            people?.ForEach(person =>
            {
                var addresses = new List<DtoAddress>();
                person.AddressesIds?.ForEach(a =>
                {
                    var address = _addressService.GetAddressById(a);
                    if(address != null) addresses.Add(address);
                });

                var contacts = new List<DtoContact>();
                person.ContactsIds?.ForEach(c =>
                {   
                    var contact = _contactService.GetContactById(c);
                    if(contact != null) contacts.Add(contact);
                });

                var response = new PersonResponse()
                {
                    Id = person.Id,
                    Name = person.Name,
                    LastName = person.LastName,
                    FullName = person.FullName,
                    Contacts = contacts,
                    Addresses = addresses,
                    Birthday = person.Birthday,
                    Age = person.Age,
                };

                peopleResponse.Add(response);

            });

            return peopleResponse;
        }

    }
}
