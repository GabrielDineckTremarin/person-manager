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
