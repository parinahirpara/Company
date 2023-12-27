using Company.Data;
using Company.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Company.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public ContactController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        [Route("/api/contact")]
        public async Task<Contact> Postcontact([FromForm] Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj = await _applicationDbContext.contacts.AddAsync(contact);
            _applicationDbContext.SaveChanges();
            return obj.Entity;

        }
        [HttpGet("contact")]
        [Route("/api/contact")]
        public async Task<IEnumerable<Contact>> GetAllContact(int type, int id)
        {
            try
            {
                return await _applicationDbContext.contacts.Where(c => c.EntityType == type && c.EntityId == id).ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete]
        [Route("/api/contact/{id}")]
        public async Task<ActionResult<Contact>> DeleteContact(int id)
        {
            try
            {
                var contact = await _applicationDbContext.contacts.FirstOrDefaultAsync(c => c.Id == id);
                if (contact == null)
                {
                    return NotFound($"companygroup with Id= {id} not found");
                }
                _applicationDbContext.contacts.Remove(contact);
                _applicationDbContext.SaveChanges();
                return contact;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting Data");
            }
        }
        [HttpPost]
        [Route("/api/editcontact")]
        public async Task<Contact> UpdateContact([FromForm] Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj = _applicationDbContext.contacts.Update(contact);
            await _applicationDbContext.SaveChangesAsync();
            return obj.Entity;
        }
    }
}
