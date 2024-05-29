using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
    {
        if (string.IsNullOrWhiteSpace(orderBy))
            return query.OrderBy(p => p.Name);

        query = orderBy switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            "calories" => query.OrderBy(p => p.Calories),
            "caloriesDesc" => query.OrderByDescending(p => p.Calories),
            "proteins" => query.OrderBy(p => p.Proteins),
            "proteinsDesc" => query.OrderByDescending(p => p.Proteins),
            "nameDesc" => query.OrderByDescending(p => p.Name),
            _ => query.OrderBy(n => n.Name)
        };

        return query;
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
    {
        if (string.IsNullOrEmpty(searchTerm))
            return query;

        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

        return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Product> Filter(
        this IQueryable<Product> query,
        string meats,
        string sideDishes
    )
    {
        var meatsList = new List<string>();
        List<string> sideDishesList = new();

        if (!string.IsNullOrEmpty(meats))
        {
            meatsList.AddRange(meats.ToLower().Split(",").ToList());
        }

        if (!string.IsNullOrEmpty(sideDishes))
        {
            sideDishesList.AddRange(sideDishes.ToLower().Split(",").ToList());
        }

        query = query.Where(p => meatsList.Count == 0 || meatsList.Contains(p.Meat.ToLower()));

        query = query.Where(p =>
            sideDishesList.Count == 0 || sideDishesList.Contains(p.SideDish.ToLower())
        );

        return query;
    }
}
