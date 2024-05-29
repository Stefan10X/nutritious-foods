namespace API.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Ingredients { get; set; }
    public long Price { get; set; }
    public string PictureUrl { get; set; }
    public string SideDish { get; set; }
    public string Meat { get; set; }
    public long Grams { get; set; }
    public long Calories { get; set; }
    public long Proteins { get; set; }
    public long Carbohidrates { get; set; }
    public long Fats { get; set; }
    public int QuantityInStock { get; set; }
    public string PublicId { get; set; }
}
