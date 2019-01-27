# Common Core Resource Share

A place to share the best Teaching/Learning resources for common core standards.

## Overview

Meteor+React app w/ one collection (`resources`), and an enormous JS object (`standards`) mapping the CC standards.

- Maybe a way to do this with an API instead of the huge object to account for changes in standards?
- How would this affect submitted resources that get "deprecated"?

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
- refactor resource scraping
- finish adding grade levels
- style w/ bootstrap
- deploy to heroku
- refactor

### Non-priority / Later
- real pagination
- more resources
  - just google standards to find more

### Ideas
- users can "subscribe" to standards, recieving email when new resource submitted?
- associate resources w/ user who submitted
  - track "karma/score" per user? (gamifies submission?) 
- upvote/visited ranking?
- comments page for each resource?
  - shortid + react-router for resource id's

## Resource Sources
- khanacademy
- education.com
- HCPSS
- betterlesson
  - https://betterlesson.com/search?standards=15&from=header
  - standards have some weird ass index
  - they have an API ? https://betterlesson.readme.io/docs/getting-started
