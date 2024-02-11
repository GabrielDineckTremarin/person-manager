using ContactOrganizer.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PersonManager.Services.Interfaces;
using ContactOrganizer.Business;
using ContactOrganizer.Models;

namespace ContactOrganizer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;
        private readonly IContactService _contactService;
        private readonly IAddressService _addressService;
        private readonly IUserService _userService;
        private readonly BlPerson _blPerson;

        public PersonController(
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
            _blPerson = new BlPerson(_personService, _contactService, _addressService, _userService);
        }

        [HttpPost]
        [Route("create-person")]
        public async Task<object> CreatePerson([FromBody] PersonResponse person)
        {
            try
            {
                var result = await _blPerson.CreatePerson(person);
                return new Response() { Data = result, Message = "Person registered successfully", Success = true };
            }
            catch (Exception ex)
            {
                return new Response() { Data = ex, Message = ex.Message, Success = false };
            }
        }

        [HttpPut]
        [Route("update-person")]
        public async Task<object> UpdatePerson([FromBody] PersonResponse person)
        {
            try
            {
                var result = await _blPerson.UpdatePerson(person);
                return new Response() { Data = result, Message = "Person updated successfully", Success = true };
            }
            catch (Exception ex)
            {
                return new Response() { Data = ex, Message = ex.Message, Success = false };
            }
        }



        [HttpGet]
        [Route("get-person-by-id/{id}")]
        public async Task<object> GetPersonById([FromRoute] string id) 
        {
            try
            {
                var result = await _blPerson.GetPersonById(id);

                return new Response() { Data = result, Message = String.Empty, Success = true };
            }
            catch (Exception ex)
            {
                return new Response() { Data = ex, Message = ex.Message, Success = false };

            }

        }

        [HttpDelete]
        [Route("delete-person/{personId}")]
        public async Task<object> DeletePerson([FromRoute] string personId)
        {
            try
            {
                var result = await _blPerson.DeletePerson(personId);
                return new Response() { Data = result, Message = "Person deleted successfully", Success = true };
            }
            catch (Exception ex)
            {
                return new Response() { Data = ex, Message = ex.Message, Success = false };
            }
        }

        [HttpGet]
        [Route("get-list-of-people")]
        public async Task<object> GetListOfPeople()
        {
            try
            {
                var result = await _blPerson.GetListOfPeople();

                return new Response() { Data = result, Message = String.Empty, Success = true };
            }
            catch (Exception ex)
            {
                return new Response() { Data = ex, Message = ex.Message, Success = false };

            }

        }

    }
}
