require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Admin = require("./models/Admin");
const Participant = require("./models/Participant");
const Venue = require("./models/Venue");
const Speaker = require("./models/Speaker");
const Event = require("./models/Event");
const Session = require("./models/Session");

async function seed() {
  await connectDB();

  await Promise.all([
    Admin.deleteMany({}),
    Participant.deleteMany({}),
    Venue.deleteMany({}),
    Speaker.deleteMany({}),
    Event.deleteMany({}),
    Session.deleteMany({})
  ]);

  const admin = await Admin.create({
    name: "Event AI Admin",
    email: "admin@eventai.local",
    password: "Admin@123"
  });

  const participant = await Participant.create({
    name: "Demo Participant",
    email: "participant@eventai.local",
    phone: "9876543210",
    password: "Participant@123",
    organization: "Demo Organization",
    age: 23,
    city: "Bengaluru"
  });

  const venues = await Venue.insertMany([
    { name: "Innovation Hall", location: "Bengaluru", capacity: 500, facilities: ["Projector","WiFi","Stage","Audio"] },
    { name: "Tech Studio", location: "Bengaluru", capacity: 200, facilities: ["Projector","WiFi","Recording"] },
    { name: "Executive Room A", location: "Bengaluru", capacity: 80, facilities: ["WiFi","Video Conferencing"] }
  ]);

  const speakers = await Speaker.insertMany([
    { name: "Dr. Ananya Rao", bio: "AI and event technology researcher.", email: "ananya@example.local", expertise: ["AI","Machine Learning","Analytics"], organization: "Future Labs" },
    { name: "Arjun Kumar", bio: "Operations and venue optimization specialist.", email: "arjun@example.local", expertise: ["Operations","Event Management","Logistics"], organization: "OpsWorks" },
    { name: "Meera Shah", bio: "Product and innovation speaker.", email: "meera@example.local", expertise: ["Product","Innovation","Technology"], organization: "Nova Labs" }
  ]);

  const now = new Date();
  const event1 = await Event.create({
    title: "Agentic AI Summit 2026",
    description: "Explore autonomous AI agents, intelligent workflows and next-generation event operations.",
    category: "AI & Technology",
    date: new Date(now.getTime() + 14 * 86400000),
    startTime: "09:00",
    endTime: "17:30",
    venue: venues[0]._id,
    capacity: 500,
    status: "OPEN",
    facilities: ["Projector","WiFi","Stage","Audio"]
  });

  const event2 = await Event.create({
    title: "Smart Operations Conference",
    description: "Intelligent venue, speaker and attendee operations for modern events.",
    category: "Operations",
    date: new Date(now.getTime() + 30 * 86400000),
    startTime: "10:00",
    endTime: "16:00",
    venue: venues[1]._id,
    capacity: 200,
    status: "OPEN",
    facilities: ["Projector","WiFi","Recording"]
  });

  await Session.insertMany([
    { event: event1._id, title: "Opening: The Agentic Event Stack", room: "Main Stage", start: new Date(event1.date.getTime() + 9*3600000), end: new Date(event1.date.getTime() + 10*3600000), capacity: 500, speaker: speakers[0]._id },
    { event: event1._id, title: "Venue Intelligence & Optimization", room: "Room A", start: new Date(event1.date.getTime() + 11*3600000), end: new Date(event1.date.getTime() + 12*3600000), capacity: 80, speaker: speakers[1]._id },
    { event: event2._id, title: "Automating Event Operations", room: "Tech Studio", start: new Date(event2.date.getTime() + 10*3600000), end: new Date(event2.date.getTime() + 11*3600000), capacity: 200, speaker: speakers[2]._id }
  ]);

  console.log("Seed complete.");
  console.log("Admin:", admin.email, "/ Admin@123");
  console.log("Participant:", participant.email, "/ Participant@123");
  await mongoose.disconnect();
}

seed().catch(async err => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
