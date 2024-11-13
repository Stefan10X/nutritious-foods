namespace API.RequestHelpers;

public class ProductParams : PaginationParams
{
    public string OrderBy { get; set; }
    public string SearchTerm { get; set; }
    public string Meats { get; set; }
    public string SideDishes { get; set; }
}
