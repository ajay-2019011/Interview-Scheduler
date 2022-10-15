![interview-scheduler logo](https://p.kindpng.com/picc/s/367-3674022_alarm-clock-windows-10-alarm-clock-icon-hd.png)



# Interview Scheduler

### About
***

A simple tool for managing interviews or meetings of multiple people. To schedule an interview or meeting, please first go through the candidates information and already scheduled meetings. The interview details can be changed or the meeting itself can be cancelled if needed. The candidates added to a meeting can be notified using mail. If the meeting is cancelled or rescheduled, the same will be communicated to the candidates. Candidates having applied to relevant positions can be selected for the interview of a specific position.

### Tech-Stack
***
* ReactJS
* NodeJS
* MongoDB
* ExpressJS

### Setting up the Project for Development
***

Open git bash, and clone this repository by running the following command

##### `git clone https://github.com/ajay-2019011/Interview-Scheduler.git`

Now, open the command terminal, navigate into the directory where you cloned this repository using the **`cd`** command, and then hop into the **Interview-Scheduler** directory.
* Navigate into the **client** folder, and run the command **`npm install`**. This would install all the required dependencies for the client side of the project.
* Now, navigate into the **server** folder, and run the command **`npm install`**. 


Now, go to [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas) and create a free-tier cluster here. From here, you need the ***MongoDB Connection String***. You may look [here](https://docs.mongodb.com/guides/cloud/connectionstring/) to know more on how to get the 
***MongoDB Connection String***. Copy the connection string, and then on your local machine inside the **Interview-Scheduler** folder, navigate to the **server** folder and create a
**.env** file with the following ***environment variables***

##### **`MONGODB_CONNECTION_STRING=MongoDB_Connection_String`**

***Congratulations! You've setup the project on your local machine for development.***

### Running and Testing the Project
***
* Open the command terminal, navigate into the **ExpenseBuddy/client** directory, and run the **`npm start`** command to start the React Development server on PORT 3000.
* Open the command terminal, navigate into the **ExpenseBuddy/server** directory, and run the **`npm run dev`** or **`npm start`** command to start the NodeJS Development server on default PORT 3002. The default port can be changed in the index.js file contained in the **src** folder.


