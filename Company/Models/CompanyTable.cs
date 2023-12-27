using System.ComponentModel.DataAnnotations;

namespace Company.Models
{
    public class CompanyTable
    {
        [Key]
        public int Id { get; set; }
        public int GroupId { get; set; }
        public string CompanyName { get; set; }
        public string OwnerName { get; set; }

    }
}
