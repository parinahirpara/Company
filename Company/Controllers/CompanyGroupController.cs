using Company.Data;
using Company.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Company.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyGroupController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public CompanyGroupController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpPost]
        [Route("/api/companygroup")]
        public async Task<CompanyGroup> PostCompanyGroup([FromForm] CompanyGroup companyGroup)
        {
            if(companyGroup == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj = await _applicationDbContext.companyGroups.AddAsync(companyGroup);
            _applicationDbContext.SaveChanges();
            return obj.Entity;

        }
        [HttpGet]
        [Route("/api/companygroup")]
        public async Task<IEnumerable<CompanyGroup>> GetAllCompanyGroup()
        {
            try
            {
                return await _applicationDbContext.companyGroups.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete]
        [Route("/api/companygroup/{id}")]
        public async Task<ActionResult<CompanyGroup>> DeleteCompanyGroup(int id)
        {
            try
            {
                var companygroup = await _applicationDbContext.companyGroups.FirstOrDefaultAsync(c => c.Id == id);
                if (companygroup == null)
                {
                    return NotFound($"companygroup with Id= {id} not found");
                }
                _applicationDbContext.companyGroups.Remove(companygroup);
                var removeaddress=await _applicationDbContext.addresses.Where(a => a.EntityType == 1 && a.EntityId == id).ToListAsync();
                _applicationDbContext.addresses.RemoveRange(removeaddress);
                var removecontact = await _applicationDbContext.contacts.Where(a => a.EntityType == 1 && a.EntityId == id).ToListAsync();
                _applicationDbContext.contacts.RemoveRange(removecontact);
                _applicationDbContext.SaveChanges();
                return companygroup;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Error Deleting Data");
            }
        }
        [HttpPost]
        [Route("/api/editcompanygroup")]
        public async Task<CompanyGroup> UpdateGroup([FromForm]CompanyGroup companyGroup)
        {
            if (companyGroup == null)
            {
                throw new ArgumentNullException("no data");
            }
            var obj= _applicationDbContext.companyGroups.Update(companyGroup);           
            await _applicationDbContext.SaveChangesAsync();
            return obj.Entity;
        }
    }
}
