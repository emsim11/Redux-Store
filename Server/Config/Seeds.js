const Database = require('./Connection')
const { Category, Product, User } = require('../Models')
const CleanDatabase = require('./CleanDB');
const { Query } = require('mongoose');

Database.once('open', async () => {
    await CleanDatabase('Category', 'Categories')
    await CleanDatabase('Product', 'Products')
    await CleanDatabase('User', 'Users')

    const Categories = await Category.insertMany([
        { name: 'Books' },
        { name: 'Electronics' },
        { name: 'Food' },
        { name: 'Household Supplies' },
        { name: 'Toys' },
    ]);
    console.log('✅ Categories Seeded!');

    const Products = await Product.insertMany([
        {
            Name: 'Alphabet Blocks',
            Category: Categories[4]._Id,
            Description: 'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
            Image: 'Alphabet-Blocks.jpg',
            Price: 9.99,
            Quantity: 300,
        },
        {
          Name: 'Camera',
          Category: Categories[1]._Id,
          Description: 'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
          Image: 'Camera.jpg',
          Price: 399.99,
          Quantity: 15,
        },
        {
            Name: 'Hand Soap',
            Category: Categories[3]._Id,
            Description: 'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
            Image: 'Soap.jpg',
            Price: 4.99,
            Quantity: 50,
        },
        {
            Name: 'iPad',
            Category: Categories[1]._Id,
            Description: 'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
            Image: 'Tablet.jpg',
            Price: 199.99,
            Quantity: 30,
        },
        {
            Name: 'Goodnight, Moon',
            Category: Categories[0]._Id,
            Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
            Image: 'Bedtime-Book.jpg',
            Price: 15.99,
            Quantity: 100,
        },
        {
            Name: 'Set of Wooden Spoons',
            Category: Categories[3]._Id,
            Description: 'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
            Image: 'Wooden-Spoons.jpg',
            Price: 20.99,
            Quantity: 100,
        },
        {
            Name: 'Teddy Bear',
            Category: Categories[4]._Id,
            Description: 'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
            Image: 'Teddy-Bear.jpg',
            Price: 7.99,
            Quantity: 100,
        },
        {
            Name: 'Tin of Cookies',
            Category: Categories[2]._Id,
            Description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            Image: 'Cookie-Tin.jpg',
            Price: 3.99,
            Quantity: 500,
        },
        {
            Name: 'Toilet Paper',
            Category: Categories[3]._Id,
            Description: 'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
            Image: 'Toilet-Paper.jpg',
            Price: 8.99,
            Quantity: 400,
        }
    ])
    console.log('✅ Products Seeded!');

    await User.create({
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'jane@testemail.com',
        Password: 'Password123456',
        Orders: [
            {
                Products: [Products[0]._Id, Products[0]._Id, Products[1]._Id]
            }
        ]
    });

    await User.create({
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'john@testemail.com',
        Password: 'Password123456',
    });

    console.log('✅ Users Seeded!');

    process.exit();
});