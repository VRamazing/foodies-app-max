import sql from "better-sqlite3"
const db = sql("meals.db")
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs"

export async function getMeals(){
    // just added for demo purpose 
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // all used for fetch
    // run for update 
    // single row get
    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug){
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);
    const ext = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${ext}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (err) => {
        if(err){
            throw new Error("saving image failed");
        }
    });
    meal.image = `/images/${fileName}`;
    console.log(meal)
    return db.prepare(`
        INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}