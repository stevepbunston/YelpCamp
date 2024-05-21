const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');


//COMMENTING OUT USECREATEINDEX. NOT SUPPORTED ANYMORE
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6624234f7fef79718ba7e8cf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium harum suscipit veritatis nostrum temporibus magnam repellendus odit animi. Harum minima omnis inventore aspernatur possimus nihil veniam ex quibusdam voluptates. Explicabo.',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/duil5vwuw/image/upload/v1714929507/YELPCAMP/csl1kxqixybkkawq84hh.png',
                  filename: 'YELPCAMP/csl1kxqixybkkawq84hh'
                },
                {
                  url: 'https://res.cloudinary.com/duil5vwuw/image/upload/v1714929507/YELPCAMP/xwm35sofuudxrhctqewt.png',
                  filename: 'YELPCAMP/xwm35sofuudxrhctqewt'
                },
                {
                  url: 'https://res.cloudinary.com/duil5vwuw/image/upload/v1714929507/YELPCAMP/kk0rphdvfxrkcyzsepyv.jpg',
                  filename: 'YELPCAMP/kk0rphdvfxrkcyzsepyv'
                }
              ]
        });
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});