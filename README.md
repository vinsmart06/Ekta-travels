# EKTA Travels — India Travel Website

## ▶ HOW TO START (Windows)

Double-click:  start.bat
OR open Command Prompt in this folder and type:
    node server\index.js

Then open browser:  http://localhost:3000

## ▶ HOW TO START (Mac / Linux)

Open Terminal in this folder and type:
    node server/index.js

Then open browser:  http://localhost:3000

---

IMPORTANT: Make sure Node.js is installed.
Download from: https://nodejs.org  (click the LTS button)

---

## Pages

http://localhost:3000                        Home
http://localhost:3000/destinations           All Destinations
http://localhost:3000/destinations/rajasthan Rajasthan Detail
http://localhost:3000/destinations/kerala    Kerala Detail
http://localhost:3000/destinations/ladakh    Ladakh Detail
http://localhost:3000/packages               All Tour Packages
http://localhost:3000/packages/golden-triangle    Golden Triangle Tour
http://localhost:3000/packages/kerala-backwaters  Kerala Backwaters
http://localhost:3000/packages/forts-palaces-rajasthan  Rajasthan Forts
http://localhost:3000/packages/ladakh-adventure   Ladakh Adventure
http://localhost:3000/enquiry                Enquiry Form
http://localhost:3000/about                  About Us
http://localhost:3000/reviews                Reviews

NOTE: Images load from the internet (Unsplash). 
Make sure you are connected to the internet when viewing.

---

## Project Files

dist/           Built website files (do not edit)
server/         Node.js server
src/            Source code (edit to customise)
  data/data.ts  All tours, destinations, content
  styles.css    All colours and styles
  pages/        One file per page
  components/   Navbar, Footer, PackageCard

To rebuild after editing source:
    npm install -g esbuild
    node build.js
