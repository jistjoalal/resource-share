# Common Core Resource Share

A place to share the best Teaching/Learning resources for common core standards.

## Overview

Meteor+React app w/ one collection (`resources`), and an enormous JS object (`standards`) mapping the CC standards.

- Maybe a way to do this with an API instead of the huge object to account for changes in standards?
- How would this affect submitted resources that get "deprecated"?
- Is there a way to only store the "keys" in state and load in the hierarchy nodes dynamically?

## Goals

- All grade levels for Math
  - Elementary
    - <s>K-3</s>
    - 4-5
  - Middle
  - HS
- All grade levels for English

## TODOs
### Priority
- <s>Find a few resources for each standard</s>
- <s>Pub/Sub + MMethods</s>
- <s>SS validation</s>
- <s>user accounts</s>
  - <s>Signup/Login</s>
  - <s>Redirect logged in users away fstandardsrom signup/login</s>
  - <s>Redirect users to where they were before signing up / logging in</s>
    - <s>save a session var anytime user clicks on "Login" from home page</s>
  - <s>Auth. (only signed in can submit)</s>
- <s>alert messages on homepage after logging in/signing up</s>
- <s>'X' button to remove a search term from query</s>
- <s>unique URLs per query w/ react-router</s>
- <s>**BUG**: app crashes from spamming the dropdowns</s>
  - think I fixed this by descending into callback hell
  - still probably need a better state mgmt. solution
- <s>refactor resource scraping</s>
- <s>real pagination</s>
  - <s>hide more button when useless</s>
- <s>associate resources w/ user who submitted</s>
- <s>upvote/visited ranking</s>
- <s>users can view list of favorited resources</s>
  - <s>separate page (private)?</s>
  - "un-favorite button" shows right one depending on fav status
- users can view list of authored resources
  - total the score for a "user karma"

### Non-priority / Later
- finish adding grade levels
- more resources
  - just google standards to find more
- style w/ bootstrap
- deploy to heroku
- refactor

### Ideas
- users can "subscribe" to standards, recieving email/notification when new resource submitted?
- comments page for each resource?
  - shortid + react-router for resource id's

## Resource Sources
- <s>khanacademy</s>
- <s>education.com</s>
- <s>HCPSS</s>
- <s>betterlesson</s>
  - some ghetto scraping, i think my code comments are good enough
