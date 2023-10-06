const axios = require("axios");
const { SERVER_PORT } = process.env;
module.exports.postCourses = async function (course) {
  let courseDB = {
    name: course.name,
    img: course.img,
    level: course.level,
    description: course.description,
    descriptionComplete: course.descriptionComplete,
    duration: course.duration,
    instructor: course.instructor,
    price: course.price,
    category: course.category,
  };
  await axios
    .post(`http://localhost:${SERVER_PORT}/courses`, courseDB)
    .catch(function (e) {
      console.log(`Algo salió mal al publicar el curso ${courseDB.name}. Error: `, e);
    });
};

module.exports.postCategories = async function (category) {
  let categoryDB = {
    name: category.name,
    img: category.img,
    description: category.description,
  };
  await axios
    .post(`http://localhost:${SERVER_PORT}/categories`, categoryDB)
    .catch(function (e) {
      console.log(`Algo salió mal al publicar la categoria ${categoryDB.name}. Error: `, e);
    });
};
("/register");
module.exports.postAdmin = async function (user) {
  let userDB = {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    rank: user.rank,
  };
  await axios
    .post(`http://localhost:${SERVER_PORT}/registerDB`, userDB)
    .catch(function (e) {
      console.log(`Algo salió mal al publicar el admin ${userDB.name}. Error: `, e);
    });
};
