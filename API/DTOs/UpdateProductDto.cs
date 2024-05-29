using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class UpdateProductDto
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Ingredients { get; set; }

    [Required]
    [Range(100, Double.PositiveInfinity)]
    public long Price { get; set; }

    [Required]
    [Range(100, Double.PositiveInfinity)]
    public long Grams { get; set; }

    [Required]
    [Range(0, Double.PositiveInfinity)]
    public long Calories { get; set; }

    [Required]
    [Range(0, Double.PositiveInfinity)]
    public long Proteins { get; set; }

    [Required]
    [Range(0, Double.PositiveInfinity)]
    public long Carbohidrates { get; set; }

    [Required]
    [Range(0, Double.PositiveInfinity)]
    public long Fats { get; set; }

    public IFormFile File { get; set; }

    [Required]
    public string SideDish { get; set; }

    [Required]
    public string Meat { get; set; }

    [Required]
    [Range(0, 200)]
    public int QuantityInStock { get; set; }
}
