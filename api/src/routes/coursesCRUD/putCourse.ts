const { Course, Category } = require("../../db");

export async function putCourse(req: any, res: any) {
  try {
    let {
      name,
      img,
      level,
      description,
      descriptionComplete,
      duration,
      instructor,
      price,
      category,
    } = req.body;
    if(!name){
      return res.status(404).send("The name has not been recognized or has not been entered, please try again.")
    }
    let nameDB = name.split(" ").join("-").toLowerCase();
    let course = await Course.findOne({
      where: { name: nameDB },
      include: {
        model: Category,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
    if (course === undefined) return res.status(404).send(`El curso ${name} no existe`)
    await Course.update(
      {
        level: level ? level : course.level,
        img: img ? img : course.img,
        descriptionComplete: descriptionComplete
          ? descriptionComplete
          : course.descriptionComplete,
        duration: duration ? duration : course.duration,
        instructor: instructor ? instructor : course.instructor,
        description: description ? description : course.description,
        price: price,
      },
      {
        where: {
          name: nameDB,
        },
      }
    );
    if (category) {
      let newCategories = category.map((el: string) => {
        return el.split(" ").join("-").toLowerCase();
      });
      let categoriesArr = course.categories.map((category: any) => {
        return category.name;
      });
      let oldCategories = await Category.findAll({
        where: {
          name: categoriesArr
        }
      });
      oldCategories.forEach((el: any) => {
        course.removeCategory(el)
      });
      let categoriesDB = await Category.findAll({
        where: { name: newCategories },
      });
      categoriesDB.forEach((el: any) => {
        course.addCategory(el);
      });
    };
    return res.status(200).send(`The course ${name} has been updated`);
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}

export async function putRating(req: any, res: any) {
  try {
    let { rating, nameCourse } = req.body;
    if(!nameCourse){
      return res.status(404).send("The name has not been recognized or has not been entered, please try again.");
    }
    let nameCourseDb = nameCourse.split(" ").join("-").toLowerCase();
    let course = await Course.findOne({
      where: {
        name: nameCourseDb
      }
    });
    rating.course = nameCourse;
    let oldRating: any = await course.rating.filter((rat: any) => rating.user !== rat.user)
    let newRating = [...oldRating, rating];
    await Course.update({
      rating: newRating
    }, {
      where: {
        name: nameCourseDb
      }
    });
    return res.status(200).send(`The rating has been updated.`);
  } catch (err: any) {
    const errName = err.name;
    const errCode = err.code;
    const errMessage = err.message;
    return res.status(404).send(errName ? 
      `Error ${errCode}: ${errName} - ${errMessage}` : 
      "Something went wrong, please try again.");
  }
}