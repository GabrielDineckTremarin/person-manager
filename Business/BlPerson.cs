﻿using ContactOrganizer.Services.Interfaces;
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
            var validations = await ValidatePerson(person);
            if (validations.Count > 0)
                throw new Exception(string.Join($";", validations));

            var contact = person.Contact;
            var listAddresses = person.Addresses;
            if (contact != null && String.IsNullOrEmpty(contact?.Id) || !Mongo_Utils.IsObjectId(contact?.Id))
            {
                contact.Id = ObjectId.GenerateNewId().ToString();
            }
            _contactService.CreateContact(contact);

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

            person.Id = ObjectId.GenerateNewId().ToString();
            var dtoPerson = new DtoPerson()
            {
                Id = person.Id,
                Name = person.Name,
                LastName = person.LastName,
                FullName = $"{person.Name} {person.LastName}",
                Birthday = person.Birthday,
                ContactId = contact.Id,
                AddressesIds = listAddresses?.Select(a => a.Id).ToList(),
                Age = CalculateAge(Date_Utils.GetDateOnly(person.Birthday)),
            };
            _personService.CreatePerson(dtoPerson);
            return person;
        }

        public async Task<PersonResponse> UpdatePerson(PersonResponse person)
        {
            try
            {
                var validations = await ValidatePerson(person);
                if (validations.Count > 0)
                    throw new Exception(string.Join($";", validations));

                var contact = person.Contact;
                var listAddresses = person.Addresses;
                if (contact != null && String.IsNullOrEmpty(contact?.Id) || !Mongo_Utils.IsObjectId(contact?.Id))
                {
                    contact.Id = ObjectId.GenerateNewId().ToString();
                    _contactService.CreateContact(contact);
                }
                else
                {
                    _contactService.UpdateContact(contact);
                }

                if (listAddresses != null)
                {
                    for (int i = 0; i < listAddresses.Count; i++)
                    {
                        var address = listAddresses[i];
                        if (String.IsNullOrEmpty(address?.Id) || !Mongo_Utils.IsObjectId(address?.Id))
                        {
                            address.Id = ObjectId.GenerateNewId().ToString();
                            listAddresses[i] = address;
                            _addressService.CreateAddress(address);
                        }
                        else
                        {
                            _addressService.UpdateAddress(address);
                        }
                    }
                }

                var dtoPerson = new DtoPerson()
                {
                    Id = person.Id,
                    Name = person.Name,
                    LastName = person.LastName,
                    FullName = $"{person.Name} {person.LastName}",
                    Birthday = person.Birthday,
                    ContactId = contact.Id,
                    AddressesIds = listAddresses?.Select(a => a.Id).ToList(),
                    Age = CalculateAge(Date_Utils.GetDateOnly(person.Birthday)),
                };
                _personService.UpdatePerson(dtoPerson);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return person;
        }

        public async Task<DtoPerson> DeletePerson(string  personId)
        {
            try
            {
                var person = _personService.GetPersonById(personId);

                if (person == null)
                    throw new Exception("Person not found");

                if(!String.IsNullOrEmpty(person?.ContactId) && Mongo_Utils.IsObjectId(person?.ContactId))
                    _contactService.DeleteContact(person?.ContactId);

                if(person.AddressesIds != null)
                    person?.AddressesIds?.ForEach(addr => _addressService.DeleteAddress(addr));

                _personService.DeletePerson(personId);

                return person;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<object> GetPersonById(string id)
        {
            if (String.IsNullOrEmpty(id) || !Mongo_Utils.IsObjectId(id))
                throw new Exception("Invalid id");

            var person = _personService.GetPersonById(id);

            if(person == null)
                throw new Exception("Person not found");

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
                throw new Exception("It seems there are no people registered");

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


        public async Task<List<string>> ValidatePerson(PersonResponse person)
        {
            var validations = new List<string>();

            if (person == null)
            {
               validations.Add("Person not found");
                return validations;
            }

            if(String.IsNullOrEmpty(person.Name))
                validations.Add("You need to enter the person's name");

            if (String.IsNullOrEmpty(person.LastName))
                validations.Add("You need to enter the person's last name");

            if (person?.Birthday == DateTime.MinValue || person?.Birthday == DateTime.MaxValue)
                validations.Add("You need to enter a valid birthday");

            if(CalculateAge(Date_Utils.GetDateOnly(person.Birthday)) < 15)
                validations.Add("You need to be at least 15 years old");

            if (person.Contact == null) {
                validations.Add("You need to fill out the Contact Information form");
                return validations;
            }

            if(person.Contact.Emails == null || person.Contact.Emails?.Count == 0)
            {
                validations.Add("You need to enter at least one email");
            }
            else if(person.Contact.Emails != null && person.Contact.Emails?.Count > 0)
            {
                foreach(var email in person.Contact.Emails)
                {
                    if (!StringUtils.IsEmailValid(email))
                        validations.Add($"The email {email} is not valid!");
                }
            }

            if (person.Contact.Phones == null || person.Contact.Phones?.Count == 0)
            {
                validations.Add("You need to enter at least one phone number");
            }
            else if (person.Contact.Phones != null || person.Contact.Phones?.Count > 0)
            {
                foreach(var phone in person.Contact.Phones)
                {
                    if (!StringUtils.IsPhoneValid(phone))
                    {
                        validations.Add($"The number {phone} is not valid!");
                    }
                }
            }

            if(person.Contact.SocialMedia != null)
            {
                foreach (var s in person.Contact.SocialMedia)
                {
                    if (
                        (String.IsNullOrEmpty(s.MediaName) && !String.IsNullOrEmpty(s.Username)) ||
                        (!String.IsNullOrEmpty(s.MediaName) && String.IsNullOrEmpty(s.Username))
                      )
                    {
                        validations.Add("You need to select a social media and enter a username");
                        break;
                    }

                    if (String.IsNullOrEmpty(s.MediaName))
                        validations.Add("You need to select a social media");

                    if (String.IsNullOrEmpty(s.Username))
                        validations.Add("You need to enter a username for a social media");
                }

            }

            if(person.Addresses != null)
            {
                if(person.Addresses.Count <= 0)
                {
                    validations.Add("You need to add at least one address");
                }
                else
                {
                    foreach (var address in person.Addresses)
                    {
                        var subValidation = new List<string>();

                        if (String.IsNullOrEmpty(address.Country) ||
                            String.IsNullOrEmpty(address.State) ||
                            String.IsNullOrEmpty(address.Street) ||
                            String.IsNullOrEmpty(address.City) ||
                            String.IsNullOrEmpty(address.PostalCode))
                        {
                            validations.Add("You need to fill out all the fields in the Addres Information section");
                            break;
                        }

                    }
                }
            } 
            else
            {
                validations.Add("You need to add at least one address");
            }


            return validations;
        }


        static int CalculateAge(DateTime birthdate)
        {
            DateTime currentDate = DateTime.Now;
            int age = currentDate.Year - birthdate.Year;

            // Se nasceu nesse ano, nao subtrai, mas eu vou validar
            // se o cara tem mais de 18
            if (birthdate.Date > currentDate.AddYears(-age))
            {
                age--;
            }

            return age;
        }
    }
}
