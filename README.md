## How to run the code

For the first run, please install all the packages first:

```bash
npm install
```

Then to run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Choice of programming language, framework, library

I choose a NextJS Typescript (React) framework with Material UI because it is the technology stack I worked with most recently. I thought using the technology stack and component library I was most familiar would enable me to work the fastest and show off my work in the best way. However, I think for this type of project, Angular would also be a good choice because of it's MVC setup and two way data binding allows for easier management of data flow.

Since React is a one way data flow, I had to rely on a combination of props, callback functions, or a more global solution like Context or Redux. Due to the simplified nature of this application I decided to have a middle 'section' layer handle all the data changes and leave components to only deal with receiving data updates. However, for a larger scale version of this app, a more robust state solution might be needed.

For unit testing, I chose Jest because that is the testing library I am most familiar with and is also directly supported by Facebook. Given more time, I would also add in Enzyme to do better assertion testing.

## Example of how to deploy to production

1. To generate an optimized version of the application for production, first run:

```bash
next build
```

The output can be found in the `.next` folder 

2. Create a new instance in your Heroku account for this application

3. Update package.json with this new field:

```bash
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start -p $PORT"
  }
}
```

4. Ensure you have the Heroku CLI installed and create the Heroku app

```bash
heroku create $APP_NAME
```

3. Deploy to Heroku

```bash
git add .
git commit -m 'Next.js app on Heroku'
git push heroku main
```

Next provides fairly comprehensive documentation on deploying to production including support for other Cloud based services (AWS, Google Cloud, etc) as well as for a Static HTML Export.

More information on deployment can be found here: [NextJS Deployment Guide](https://nextjs.org/docs/deployment)

## Assumptions Made

Here are the list of assumptions I made:

1. Batch ID is provided in the SIMs GET API call instead of Batch Name. However in the assignment it asks us to display Batch Name in both the table and update modal. I then checked to see if I could get the Batch Name via the Batch GET call but the filter field was based on Name and not ID. I assumed that instead of pulling all the batch data (which would be difficult since the results come paginated) and running a filter function on the frontend just to map the Batch Names over, it would be more feasible to update the backend APIs. Thus, instead of using Batch Names, I used Batch ID to display in the UI. If this were a real project, I would likely ask a backend engineer to update the SIM data field to include the Batch Name.

2. I realized some of the initial data provided was wrong. For example, a lot of the IMSI numbers are not a 15-digit number. Some of the ICCID numbers are also not as 20-digit number (including checksum digit) as we had been instructed to expect. I did not correct the initial data, but enforced these requirements in my own adding of Batches and Updating of SIMs.

3. For the Luhn validation, I used a library to do the validation work instead of writing the algorithm myself. I felt that this was a time saving activity, especially considering how common and well adopted the Luhn algorithm is. However, this means that there may be edge cases or failures with the library that I am not aware of. While I did a high level check to ensure the library worked as expected, this was a level of risk I was ok with taking on.

4. I made some slight changes to the UI relative to the screenshot provided. Firstly, I did not include the 'menu' icon in the header or the 'account' icon. I felt that this was unnecessary since no instructions were given for them and they would be static buttons which seemed more confusing than helpful. I also moved the 'Add SIMs' button into the same row as the search field. I thought it made more UI sense to keep all the actions in one row, instead of having the Add SIMs button in the header. Typically, I would expect header buttons to either be navigation related and not related to the actions of the displayed table.

5. I updated the horizontal three dot icon to an 'Update SIM' button. I felt that a horizontal three dot icon is typically used to display a menu of actions like 'Update SIM, Delete SIM, etc. However, since the button was directly being used to open the 'Update SIM' dialog, I thought having a button that said 'Update SIM' was much clearer and more user friendly. If the app got to the point of wanting to support multiple actions, then I think a horizontal three dot icon button and menu of actions would make sense at that time.

## Improvements

Here are the improvements I would make on this app:

1. Given more time, I would improve my test coverage. Currently my test coverage does very basic checking of seeing if the major elements exist in the app. I would add more unit testing coverage (more assertion checks like checking if the values in the SIM are valid, if the validations are working properly, etc). I would also do more functional tests that run through an entire feature flow like 'Adding a Batch' or 'Updating a SIM'. Lastly, I would add snapshot testing so we can test the application against a 'correct' moment in time. I would setup a pipeline so the application runs on every PR merge.

2. For a real company product, I would spruce up the styling more and make the transitions nicer (such as providing a loading icon during search, etc). I would also check to make sure the application is responsive at different breakpoints (mobile, tablet, desktop, etc).

3. I would provide more functionality given more time, like deleting a SIM. I would also 'debounce' or 'throttle' the search field so not every keystroke is triggering an API call. This would get expensive over time and if a lot of people were using the app.

4. I would provide more UI flagging for my validations if given more time. Right now, the 'Submit' and 'Save' buttons only go through when all the fields are valid. But no UI feedback is given minus the ones already evident on the form fields themselves. I would provide a flag level alert and redirect the user focus to the first 'errored' input.

5. Another improvement I would make is making the application more accessible. While I included basic landmark roles, I still need to provide a lot more ARIA descriptors, checking for color contrast, and more. I would use an accessibility extension to ensure the application is meeting ADA standards.
