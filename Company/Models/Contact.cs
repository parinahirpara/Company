using System.ComponentModel.DataAnnotations;

namespace Company.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string ContactType { get; set; }
        public string ContactName { get; set; }
        public int  EntityId{ get; set; }
        public int EntityType { get; set; }


    }
}
