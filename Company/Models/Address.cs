using System.ComponentModel.DataAnnotations;

namespace Company.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }
        public string AddressType { get; set; }
        public string AddressName { get; set; }
        public int EntityId { get; set; }
        public int EntityType { get; set; }


    }
}
