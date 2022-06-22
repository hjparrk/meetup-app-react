import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const Homepage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups built with React/Next JS</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

export const getStaticProps = async () => {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://hjparrk:gywns0827@cluster0.lr1vn.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 1,
  };
};

export default Homepage;
