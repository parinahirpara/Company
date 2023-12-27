using Company.Data;
using Company.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Company.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AddressController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        [Route("/api/address")]
        public async Task<Address> Postaddress([FromForm] Address address)
        {
            if (address == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj = await _applicationDbContext.addresses.AddAsync(address);
            _applicationDbContext.SaveChanges();
            return obj.Entity;

        }
        [HttpGet("address")]
        [Route("/api/address")]
        public async Task<IEnumerable<Address>> GetAllAddress(int type,int id)
        {
            try
            {
                return await _applicationDbContext.addresses.Where(a=>a.EntityType==type && a.EntityId==id).ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete]
        [Route("/api/address/{id}")]
        public async Task<ActionResult<Address>> DeleteAddress(int id)
        {
            try
            {
                var address = await _applicationDbContext.addresses.FirstOrDefaultAsync(a => a.Id == id);
                if (address == null)
                {
                    return NotFound($"companygroup with Id= {id} not found");
                }
                _applicationDbContext.addresses.Remove(address);
                _applicationDbContext.SaveChanges();
                return address;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting Data");
            }
        }
        [HttpPost]
        [Route("/api/editaddress")]
        public async Task<Address> UpdateAddress([FromForm] Address address)
        {
            if (address == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj = _applicationDbContext.addresses.Update(address);
            await _applicationDbContext.SaveChangesAsync();
            return obj.Entity;
        }
    }
}
