'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        name: 'Foo',
        alias: 'Bar1',
        email: 'foo1@bar.com',
        password: 'foobar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Foo',
        alias: 'Bar2',
        email: 'foo2@bar.com',
        password: 'foobar',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('articles', [
      {
        title: "Office1",
        content: "Programmatically data-point. Mumbo jumbo digital literacy move the needle low-hanging fruit or c-suite. 360 degree content marketing pool take five, punch the tree, and come back in here with a clear head. Finance a loss a day will keep you focus and currying favour value-added message the initiative blue money, value prop. This vendor is incompetent exposing new ways to evolve our design language crank this out or we are running out of runway. Can I just chime in on that one what the yet product management breakout fastworks pixel pushing, nor products need full resourcing and support from a cross-functional team in order to be built, maintained, and evolved roll back strategy and workflow ecosystem. Who's responsible for the ask for this request? my grasp on reality right now is tenuous going forward quick-win table the discussion not enough bandwidth, nor looks great, can we try it a different way.",
        rank: 0,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Office2",
        content: "Scope creep run it up the flagpole, for cross-pollination when does this sunset? or digitalize touch base. Sorry i was triple muted thought shower, but I have zero cycles for this conversational content , highlights or forcing function let's put a pin in that. Thinking outside the box finance yet this medium needs to be more dynamic, so in an ideal world. Low hanging fruit paddle on both sides i have a hard stop in an hour and half so we just need to put these last issues to bed, and spinning our wheels we have put the apim bol, temporarily so that we can later put the monitors on 60% to 30% is a lot of persent. Pro-sumer software baseline the procedure and samepage your department, for gain alignment.",
        rank: 0,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Monocle1",
        content: "Exercitation Marylebone in, Gaggenau destination signature alluring Melbourne Boeing 787 do ex sleepy ea iconic hand-crafted. Minim hub Beams exercitation officia qui. Ut impeccable global concierge Lufthansa classic dolor smart veniam minim. Quality of life remarkable Fast Lane ea. Extraordinary ANA eiusmod Singapore boutique iconic. Ea Asia-Pacific global voluptate et bureaux cillum. Punctual culpa Baggu ANA.",
        rank: 0,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Monocle2",
        content: "Sunspel extraordinary minim classic, eiusmod cillum remarkable nisi perfect cupidatat punctual veniam aliqua. Exercitation fugiat occaecat premium elegant charming remarkable dolore dolore in classic. Signature alluring extraordinary sophisticated handsome nostrud. Asia-Pacific Washlet est elit, irure bureaux do ut. Dolor voluptate in, anim aliqua qui finest Washlet. Consectetur vibrant occaecat, ea discerning bespoke destination veniam. First-class quis eu, cillum in concierge Lufthansa exclusive handsome duis.",
        rank: 0,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('articles', null, {})
  }
};
