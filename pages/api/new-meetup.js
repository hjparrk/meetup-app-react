// /api/new-meetup

import { MongoClient } from "mongodb";

const Handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    console.log("data");
    console.log(data);
    const client = await MongoClient.connect(
      "mongodb+srv://hjparrk:gywns0827@cluster0.lr1vn.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log("result");
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
};

export default Handler;
