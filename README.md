## Chooz.io
## Inspiration
Friend 1 : “What do you want to eat tonight?”

Friend 2: “Anything is good.”

Friend 1: “What about pizza?”

Friend 2: “Hmmm, nah, I'm not in the mood.”

Friend 1: “What is there nearby?”

Friend 2: “Not sure.”

How many times have you had this conversation with your friends? With Chooz.io, you can swipe right on restaurants near you with your friends, giving you a list of places you'd all enjoy. **What will you Chooz?**

## What it does
Chooz.io asks for your current location, cuisine of choice, and price range to create a list of relevant restaurants you'd potentially want to go to. 

Log on to chooz.io to create a session and share the Session ID with your friends. Once everyone has joined, start the session and everyone swipes on the restaurants on the generated list. 


When everyone is dope swiping, the list of restaurants that everyone swiped right on are shown on the ending screen with links to their websites. Chooz.io is the perfect solution to your decision making problems.


## How we built it
Chooz.io uses socket.io rooms to connect groups of friends using a Session ID. It uses React on the frontend and Node.js on the backend. We ask the Session creator for permission to get their current location from their browser, and pull the relevant list of restaurants in your area using the Yelp API. 

## Challenges we ran into
We initially set up a Firebase database, but decided later that we didn’t need it and could store everything on the server instead. 

## Accomplishments that we're proud of
Successfully creating synchronized sessions using socket.io rooms, connecting to the Yelp API, and making stylized pages using React.

## What we learned
This was our first hackathon! We had never used socket.io before, so that was a fun challenge.

## What's next for Chooz.io
We want to expand the decision making help to movies, events, and general activities. In the future, Chooz.io would help you with any type of decision on what to do or where to go with friends or a significant other. For example, Chooz.io could help you decide what movie to see and what restaurant to go to for your date night, or help you pick out a movie for your virtual Netflix Party with 10 friends. We also want to bring Chooz.io to mobile using React Native, so you can decide on the go.
