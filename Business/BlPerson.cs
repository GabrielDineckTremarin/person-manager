using ContactOrganizer.Services.Interfaces;
using MongoDB.Bson;
using PersonManager.Services.Interfaces;
using ContactOrganizer.Utils;
using ContactOrganizer.Models;
using System.Runtime.CompilerServices;
using System.Net;

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

        public async Task<PersonResponse> CreatePerson(PersonResponse person)
        {
            var contact = person.Contact;
            var listAddresses = person.Addresses;

            if (contact != null && String.IsNullOrEmpty(contact?.Id) || !Mongo_Utils.IsObjectId(contact?.Id))
            {
                contact.Id = ObjectId.GenerateNewId().ToString();
                _contactService.CreateContact(contact);

            }


            if (listAddresses != null)
            {

                for(int i = 0; i < listAddresses.Count; i++)
                {
                    var address = listAddresses[i];
                    if(String.IsNullOrEmpty(address?.Id) || !Mongo_Utils.IsObjectId(address?.Id))
                    {
                        address.Id = ObjectId.GenerateNewId().ToString();
                        listAddresses[i] = address;
                    }
                    _addressService.CreateAddress(address);
                }

            }

            var dtoPerson = new DtoPerson()
            {
                Name = person.Name,
                LastName = person.LastName,
                FullName = $"{person.Name} {person.LastName}",
                Birthday = person.Birthday,
                ContactId = contact.Id,
                AddressesIds = listAddresses?.Select(a => a.Id).ToList(),
                Age = person.Age,
            };
            _personService.CreatePerson(dtoPerson);

            return person;
        }

        public async Task<object> GetPersonById(string id)
        {
            if (String.IsNullOrEmpty(id) || !Mongo_Utils.IsObjectId(id))
                throw new Exception("Id inválido");

            var person = _personService.GetPersonById(id);

            if(person == null)
                throw new Exception("Contato não encontrado");

            var addressesList = new List<DtoAddress>();
            person.AddressesIds.ForEach(id =>
            {
                var address = _addressService.GetAddressById(id);
                if (address != null) addressesList.Add(address);
            });

            var contact = _contactService.GetContactById(person.ContactId);

            var response = new PersonResponse()
            {
                Id = person.Id,
                Name = person.Name,
                LastName = person.LastName,
                FullName = person.FullName,
                Contact = contact,
                Addresses = addressesList,
                Birthday = person.Birthday,
                Age = person.Age,
            };
            return response;
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

                var contact = _contactService.GetContactById(person.Id);


                var response = new PersonResponse()
                {
                    Id = person.Id,
                    Name = person.Name,
                    LastName = person.LastName,
                    FullName = person.FullName,
                    Contact = contact,
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
