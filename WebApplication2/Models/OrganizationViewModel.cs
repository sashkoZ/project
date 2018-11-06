using System;
using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class OrganizationViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreateDate { get; set; }
        public string OwnerId { get; set; }
    }
}
