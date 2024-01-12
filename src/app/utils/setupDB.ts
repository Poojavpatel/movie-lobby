import { MongoClient, Db, Collection } from "mongodb";
import { InsertManyResult } from "mongoose";
import { GenreEnum } from "../models/Movie";

async function setupDB(): Promise<void> {
  const uri = "mongodb://localhost:27017";
  const dbName = "lobby";
  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    console.log("Connected to the database for setup");
    const db = client.db(dbName);

    /* Creating movies collection */
    await createMoviesCollection(db);

    console.log("Database setup done!");
  } finally {
    await client.close();
  }
}

async function createMoviesCollection(db: Db): Promise<void> {
  const moviesCollection: Collection = await db.createCollection("movies");

  const moviesData = [
    {
      title: "Dhamaal",
      genre: GenreEnum.COMEDY,
      rating: 9.2,
      streamingLink:
        "https://www.imdb.com/title/tt0845448/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_dhamaal",
    },
    {
      title: "Chup chup ke",
      genre: GenreEnum.COMEDY,
      rating: 8.5,
      streamingLink: "https://www.imdb.com/title/tt0464160/",
    },
    {
      title: "Hera pheri",
      genre: GenreEnum.COMEDY,
      rating: 9,
      streamingLink:
        "https://www.imdb.com/title/tt0242519/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_hera%2520pheri",
    },
    {
      title: "Bahubali",
      genre: GenreEnum.ACTION,
      rating: 8.0,
      streamingLink:
        "https://www.imdb.com/title/tt2631186/?ref_=nv_sr_srsg_0_tt_5_nm_3_q_bahubali",
    },
    {
      title: "Jab we met",
      genre: GenreEnum.ROMANCE,
      rating: 7.9,
      streamingLink:
        "https://www.imdb.com/title/tt1093370/?ref_=nv_sr_srsg_0_tt_6_nm_1_q_jab%2520we%2520met",
    },
  ];

  const result: InsertManyResult<Document> = await moviesCollection.insertMany(
    moviesData
  );
}

setupDB().then().catch();
