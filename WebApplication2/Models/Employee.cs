using System;

namespace WebApplication2.Models
{


    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Organization Organization { get; set; }
        public int OrganizationId { get; set; }
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public JobType JobType { get; set; }
    }
}
