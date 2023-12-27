using System.ComponentModel.DataAnnotations;

namespace Company.Models
{
    public class CompanyGroup
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
        
    }
}
