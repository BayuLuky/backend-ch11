"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullname: "binar academy",
          email: "binar@gmail.com",
          username: "binar",
          password:
            "$2b$10$ZHhDYZu4sOFsaDPUq0eTVuGTUyUbkxA/1YX8n9yi.GLdqjpkSyCyS",
          total_score: "5",
          bio: "academy fullstack",
          city: "surabaya",
          social_media_url: "instagram",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
