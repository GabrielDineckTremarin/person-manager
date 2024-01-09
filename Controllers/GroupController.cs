using ContactOrganizer.Models;
using Microsoft.AspNetCore.Mvc;


namespace ContactOrganizer.Controllers
{
    [Route("[controller]/")]
    public class GroupController
    {
        [HttpGet, Route("GetGroup")]
        public GroupDTO GetGroups(string userId)
        {

            return new GroupDTO();

        }

    }
}
