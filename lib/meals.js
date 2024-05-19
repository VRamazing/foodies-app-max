import sql from "better-sqlite3"
const db = sql("meals.db")

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