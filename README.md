## Are You Ready for Illumicon?

![Pikachu suitcase with wheels on the bottom](/public/images/pikachu-luggage.jpeg "Pikachu suitcase")


This is a little demo application to play around with Next.js, Typescript, Strapi, RabbitMQ and Tailwind.

**Getting Started**

1. `nvm use` (or I use [fpm](https://github.com/Schniz/fnm) personally) to get on the right Node version
1. `npm install` or `yarn install` (I kinda jumped back and forth throughout dev depending on whether or not I was getting `engine` complaints)
1. Strapi needs to be running and you'll need it setup like...
    1. Create an api token created.
    1. You'll need an `island` type, with the plural of `islands` that has just `name` (text) and `type` (text) as the propeties
    1. You'll also need a `marketing-copy` single that is just one rich text field called `copy`
1. Have RabbitMQ running
1. copy `env.local.example` over to `.env` and fill out the details (with stuff from the preveious steps)
1. `npm start` or `yarn start` will run the instance, however, it is setup to work with `ssg` so `npm build` or `yarn build` will also **Make a static site**
