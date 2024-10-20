using System.ComponentModel.DataAnnotations;

namespace PowerOutageService.Controllers.Enteties;

public class CreateGroupDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [MaxLength(250)]
    public string Description { get; set; }
}