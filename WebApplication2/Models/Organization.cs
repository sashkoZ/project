using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class Organization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual AppUser Owner { get; set; }
        public string OwnerId { get; set; }
        public virtual List<Employee> Employees { get; set; }
    }
}
