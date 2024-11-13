using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User { UserName = "Stefan107", Email = "stefan_pisica1@yahoo.com" };

                await userManager.CreateAsync(user, "$P10072001wq");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User { UserName = "admin", Email = "admin@test.com" };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "Admin", "Member" });
            }

            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Vita pe Plita & Orez cu Mazare si Migdale",
                    Ingredients =
                        "Orez Basmati, Mazare, Sos de Soia Dark, Unt, Migdale, Vin Rosu, Amidon de porumb, Bicarbonat, Sos de Stridii, Ardei Gras California, Sos de soia Light, Ceapa Rosie, Usturoi, Morcov, Ghimbir macinat, Ulei de floarea soarelui, Vrabioara de Vita",
                    Price = 844,
                    PictureUrl = "/images/products/1.jpg",
                    Meat = "Beef",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 581,
                    Proteins = 27,
                    Carbohidrates = 69,
                    Fats = 22,
                    QuantityInStock = 9
                },
                new Product
                {
                    Name = "Pui Cacciatore & Piure de Cartofi",
                    Ingredients =
                        "Cartofi albi, Smantana Vegetala, Pulpa de pui, Sare fina, Ceapa Rosie, Morcov, Rosii decojite, Zahar, Rozmarin Uscat, Vin Rosu, Cimbru uscat, Sare de mare, Usturoi, Ulei de masline, Unt, Apio, Foi de Dafin",
                    Price = 810,
                    PictureUrl = "/images/products/2.jpg",
                    Meat = "Chicken",
                    SideDish = "Potatoes",
                    Grams = 500,
                    Calories = 1048,
                    Proteins = 52,
                    Carbohidrates = 74,
                    Fats = 61,
                    QuantityInStock = 15
                },
                new Product
                {
                    Name = "Curcan in Sos de Ceapa si Prune & Cous Cous cu Legume",
                    Ingredients =
                        "Orez Basmati, Mazare, Sos de Soia Dark, Unt, Migdale, Vin Rosu, Amidon de porumb, Bicarbonat, Sos de Stridii, Ardei Gras California, Sos de soia Light, Ceapa Rosie, Usturoi, Morcov, Ghimbir macinat, Ulei de floarea soarelui, Vrabioara de Vita",
                    Price = 700,
                    PictureUrl = "/images/products/3.jpg",
                    Meat = "Turkey",
                    SideDish = "Vegetables",
                    Grams = 400,
                    Calories = 491,
                    Proteins = 40,
                    Carbohidrates = 63,
                    Fats = 7,
                    QuantityInStock = 10
                },
                new Product
                {
                    Name = "Goulash de Porc & Piure de Cartofi",
                    Ingredients =
                        "Cartofi albi, Pulpa de Porc, Cartofi dulci, Ceapa alba, Morcov, Unt, Ardei Kapia, Smantana Vegetala, Ulei de floarea soarelui, Pasta pentru Gulas, Sare fina, Ardei Iuti, Boia de ardei dulce, Piper negru macinat, Chimen",
                    Price = 723,
                    PictureUrl = "/images/products/4.png",
                    Meat = "Pork",
                    SideDish = "Potatoes",
                    Grams = 400,
                    Calories = 709,
                    Proteins = 48,
                    Carbohidrates = 51,
                    Fats = 35,
                    QuantityInStock = 25
                },
                new Product
                {
                    Name = "Chicken Tonkatsu Noodles ",
                    Ingredients =
                        "Cartofi albi, Pulpa de Porc, Cartofi dulci, Ceapa alba, Morcov, Unt, Ardei Kapia, Smantana Vegetala, Ulei de floarea soarelui, Pasta pentru Gulas, Sare fina, Ardei Iuti, Boia de ardei dulce, Piper negru macinat, Chimen",
                    Price = 650,
                    PictureUrl = "/images/products/5.jpg",
                    Meat = "Chicken",
                    SideDish = "Noodles",
                    Grams = 350,
                    Calories = 782,
                    Proteins = 38,
                    Carbohidrates = 97,
                    Fats = 22,
                    QuantityInStock = 11
                },
                new Product
                {
                    Name = "Curcan Dulce Acrisor & Orez Jasmine si Mazare ",
                    Ingredients =
                        "Piept de curcan, Mazare, Orez Jasmin, Ardei Gras California, Ceapa Rosie, Morcov, Urechi de lemn, Miere de albine, Pasta de tomate, Sos de Soia Dark, Ulei de floarea soarelui, Ulei de masline, Sare fina",
                    Price = 683,
                    PictureUrl = "/images/products/6.jpg",
                    Meat = "Turkey",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 485,
                    Proteins = 37,
                    Carbohidrates = 62,
                    Fats = 9,
                    QuantityInStock = 15
                },
                new Product
                {
                    Name = "Piept de pui cu Sos Romesco & Orez cu Fasole Verde",
                    Ingredients =
                        "Piept de pui, Fasole verde, Orez Jasmin, Rosii decojite, Migdale, Boia de ardei dulce, Otet de orez, Usturoi, Alune de Padure, Sare fina, Ulei de masline",
                    Price = 603,
                    PictureUrl = "/images/products/7.jpg",
                    Meat = "Chicken",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 602,
                    Proteins = 62,
                    Carbohidrates = 51,
                    Fats = 15,
                    QuantityInStock = 17
                },
                new Product
                {
                    Name = "Karpaten Chicken & Piure de Cartofi cu Usturoi Copt",
                    Ingredients =
                        "Cartofi albi, Unt, Smantana Vegetala, Usturoi, Sare fina, Ceapa alba, Pasta de tomate, Patrunjel verde, Piept de pui, Piper negru macinat, Ulei de floarea soarelui, Ardei Gras California, Stoc de pui, Ardei Capia, Foi de Dafin",
                    Price = 695,
                    PictureUrl = "/images/products/8.jpg",
                    Meat = "Chicken",
                    SideDish = "Potatoes",
                    Grams = 400,
                    Calories = 442,
                    Proteins = 26,
                    Carbohidrates = 41,
                    Fats = 15,
                    QuantityInStock = 11
                },
                new Product
                {
                    Name = "Pui Teriyaki & Orez Brun",
                    Ingredients =
                        "Piept de pui, Orez brun, Zahar Brun, Unt, Sos Mirin, Ulei de susan, Sos de soia Light, Usturoi, Sare fina, Ghimbir proaspat, Sos de Soia Dark, Piper negru macinat, Seminte Susan Alb, Tapioca",
                    Price = 690,
                    PictureUrl = "/images/products/9.jpg",
                    Meat = "Chicken",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 640,
                    Proteins = 51,
                    Carbohidrates = 71,
                    Fats = 16,
                    QuantityInStock = 16
                },
                new Product
                {
                    Name = "Cotlet de Porc cu Ciuperci & Soba Noodles",
                    Ingredients =
                        "Cotlet de Porc, Soba Noodles ( 85% faina de grau, 15% faina de hrisca), Ciuperci champignon, Ceapa Rosie, Zahar Brun, Ulei de floarea soarelui, Ulei de masline, Usturoi, Sos de Soia Dark, Ulei Susan, Sare fina, Coriandru verde, Seminte Susan negru, Piper negru macinat",
                    Price = 705,
                    PictureUrl = "/images/products/10.jpg",
                    Meat = "Pork",
                    SideDish = "Noodles",
                    Grams = 400,
                    Calories = 658,
                    Proteins = 47,
                    Carbohidrates = 50,
                    Fats = 23,
                    QuantityInStock = 21
                },
                new Product
                {
                    Name =
                        "Cotlet de Porc cu Sos de Piper Verde & Piure de Cartofi cu Usturoi Copt",
                    Ingredients =
                        "Cotlet de Porc, Cartofi albi, Unt, Smantana Vegetala, Usturoi, Piper Verde Murat, Sare fina, Tapioca, Stoc de Vita",
                    Price = 715,
                    PictureUrl = "/images/products/11.jpg",
                    Meat = "Pork",
                    SideDish = "Potatoes",
                    Grams = 400,
                    Calories = 565,
                    Proteins = 59,
                    Carbohidrates = 33,
                    Fats = 20,
                    QuantityInStock = 15
                },
                new Product
                {
                    Name = "Cilantro Lime Chicken & Cartofi la Cuptor cu Rozmarin",
                    Ingredients =
                        "Piept de pui, Cartofi albi, Patrunjel verde, Ulei de masline, Sare fina, Suc Lamaie, Coriandru verde, Sirop de Soc, Piper negru macinat, Rozmarin Verde, Chimion macinat, Usturoi, Peperoncini - fulgi chilli",
                    Price = 682,
                    PictureUrl = "/images/products/12.jpg",
                    Meat = "Chicken",
                    SideDish = "Potatoes",
                    Grams = 380,
                    Calories = 653,
                    Proteins = 63,
                    Carbohidrates = 60,
                    Fats = 17,
                    QuantityInStock = 25
                },
                new Product
                {
                    Name = "Cotlet de Porc cu Ciuperci & Mix de Fasole Pastai",
                    Ingredients =
                        "Cotlet de Porc, Fasole verde, Fasole Galbena, Ciuperci champignon, Ceapa Rosie, Zahar Brun, Usturoi, Ulei de floarea soarelui, Ulei de masline, Unt, Sos de Soia Dark, Sare fina, Patrunjel verde, Piper negru macinat",
                    Price = 670,
                    PictureUrl = "/images/products/13.jpg",
                    Meat = "Pork",
                    SideDish = "Vegetables",
                    Grams = 400,
                    Calories = 448,
                    Proteins = 38,
                    Carbohidrates = 9,
                    Fats = 33,
                    QuantityInStock = 14
                },
                new Product
                {
                    Name = "Tocanita de Curcan & Fasole Verde cu Baby Carrots",
                    Ingredients =
                        "Piept de curcan, Fasole verde, Baby Morcovi, Ardei Gras California, Ciuperci champignon, Ceapa Rosie, Pasta de tomate, Unt, Usturoi, Boia de ardei dulce, Sare fina, Piper negru macinat, Cimbru uscat, Tapioca",
                    Price = 680,
                    PictureUrl = "/images/products/14.jpg",
                    Meat = "Turkey",
                    SideDish = "Vegetables",
                    Grams = 400,
                    Calories = 279,
                    Proteins = 35,
                    Carbohidrates = 20,
                    Fats = 6,
                    QuantityInStock = 11
                },
                new Product
                {
                    Name = "Cilantro Lime Chicken & Spanac",
                    Ingredients =
                        "Piept de pui, Spanac, Smantana Vegetala, Patrunjel verde, Suc Lamaie, Coriandru verde, Ulei de masline, Sirop de Soc, Sare fina, Usturoi, Chimion macinat, Peperoncini - fulgi chilli",
                    Price = 670,
                    PictureUrl = "/images/products/15.jpg",
                    Meat = "Chicken",
                    SideDish = "Vegetables",
                    Grams = 380,
                    Calories = 493,
                    Proteins = 65,
                    Carbohidrates = 15,
                    Fats = 19,
                    QuantityInStock = 19
                },
                new Product
                {
                    Name = "Pui Sweet Chili & Broccoli",
                    Ingredients =
                        "Broccoli, Piept de pui, Ardei Gras California, sos Sweet Chilli, Ceapa Rosie, castravete, Unt, Ciuperci Shitake, Usturoi, Sos de Soia Dark, Sare fina, Ulei de floarea soarelui, Seminte Susan Alb",
                    Price = 640,
                    PictureUrl = "/images/products/16.jpg",
                    Meat = "Chicken",
                    SideDish = "Vegetables",
                    Grams = 400,
                    Calories = 472,
                    Proteins = 34,
                    Carbohidrates = 40,
                    Fats = 20,
                    QuantityInStock = 11
                },
                new Product
                {
                    Name = "Tomato Basil Chicken & Fasole Verde cu Baby Morcov",
                    Ingredients =
                        "Fasole verde, Piept de pui, Baby Morcovi, Rosii decojite, Usturoi, Unt, Capere, Apio, Ceapa Rosie, Parmezan, Pecorino, Sare fina, Patrunjel verde, Busuioc Verde, Zahar",
                    Price = 660,
                    PictureUrl = "/images/products/17.jpg",
                    Meat = "Chicken",
                    SideDish = "Vegetables",
                    Grams = 400,
                    Calories = 390,
                    Proteins = 41,
                    Carbohidrates = 13,
                    Fats = 12,
                    QuantityInStock = 18
                },
                new Product
                {
                    Name = "Chili Con Carne & Orez Jasmine",
                    Ingredients =
                        "Carne tocata de vitel, Orez Basmati, Fasole rosie (Conserva), Ceapa Rosie, Ardei Gras California, Unt, Porumb, Pasta de tomate, Ardei Iuti, Patrunjel verde, Sare fina, Ulei de floarea soarelui, Stoc de Vita, Fajitas Spice Mix",
                    Price = 710,
                    PictureUrl = "/images/products/18.jpg",
                    Meat = "Beef",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 632,
                    Proteins = 39,
                    Carbohidrates = 64,
                    Fats = 25,
                    QuantityInStock = 13
                },
                new Product
                {
                    Name = "Pui Sweet Chili & Orez cu Mazare si Migdale",
                    Ingredients =
                        "Piept de pui, Orez Basmati, Ardei Gras California, sos Sweet Chilli, Ceapa Rosie, castravete, Mazare, Sos de Soia Dark, Ciuperci Shitake, Unt, Ulei de floarea soarelui, Migdale, Seminte Susan Alb",
                    Price = 680,
                    PictureUrl = "/images/products/19.jpg",
                    Meat = "Chicken",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 618,
                    Proteins = 36,
                    Carbohidrates = 77,
                    Fats = 19,
                    QuantityInStock = 15
                },
                new Product
                {
                    Name = "Curcan cu Sos de Rodie si Portocala & Orez Exotic",
                    Ingredients =
                        "Piept de curcan, Orez Jasmin, Suc Portocala, Sos Rodii, Ulei de floarea soarelui, Miere de albine, Curmale Uscate, Ulei de Masline cu Aroma de Lamaie, Usturoi, Caise Uscate, Merisoare, Sare fina, Sos de Soia Dark, Piper negru macinat",
                    Price = 710,
                    PictureUrl = "/images/products/20.jpg",
                    Meat = "Turkey",
                    SideDish = "Rice",
                    Grams = 400,
                    Calories = 736,
                    Proteins = 41,
                    Carbohidrates = 78,
                    Fats = 26,
                    QuantityInStock = 21
                },
                new Product
                {
                    Name = "Bourguignon de Vita & Piure de Cartofi",
                    Ingredients =
                        "Cartofi albi, Unt, Smantana Vegetala, Sare fina, Ceapa alba, Ciuperci champignon, Morcov, Pasta de tomate, Usturoi, Vin Rosu, Bacon, Pulpa de Vita, Cimbru Verde, Ceapa Murata, Knorr Demi Glace",
                    Price = 810,
                    PictureUrl = "/images/products/21.jpg",
                    Meat = "Beef",
                    SideDish = "Potatoes",
                    Grams = 400,
                    Calories = 705,
                    Proteins = 39,
                    Carbohidrates = 49,
                    Fats = 38,
                    QuantityInStock = 16
                },
                new Product
                {
                    Name = "Tomahawk de Porc cu sos Chimichurri & Piure de Cartofi",
                    Ingredients =
                        "Cartofi albi, Unt, Smantana Vegetala, Cotlet de Porc, Sare fina, Ardei Iuti, Patrunjel verde, Piper negru macinat, Ulei de masline, Usturoi, Ceapa Rosie, Rozmarin Verde, Otet de Vin Alb",
                    Price = 840,
                    PictureUrl = "/images/products/22.jpg",
                    Meat = "Beef",
                    SideDish = "Potatoes",
                    Grams = 400,
                    Calories = 665,
                    Proteins = 38,
                    Carbohidrates = 45,
                    Fats = 37,
                    QuantityInStock = 12
                },
                new Product
                {
                    Name = "Involtini de Pui cu Sos de Parmezan & Cartofi la Cuptor",
                    Ingredients =
                        "Cartofi albi, Ulei de masline, Piept de pui, Rozmarin Verde, Parmezan, Spanac, Mozzarella, Piper negru macinat, Sare fina, Ulei de floarea soarelui, Usturoi, Smantana Vegetala",
                    Price = 770,
                    PictureUrl = "/images/products/23.jpg",
                    Meat = "Chicken",
                    SideDish = "Potatoes",
                    Grams = 450,
                    Calories = 757,
                    Proteins = 62,
                    Carbohidrates = 45,
                    Fats = 36,
                    QuantityInStock = 18
                },
            };

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}
