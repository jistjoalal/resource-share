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
- Find a few resources for each standard
  - probably accomplished by scripting/scraping
  - do this after MMethods?
- <s>Pub/Sub + MMethods</s>
- <s>SS validation</s>
- <s>user accounts</s>
  - <s>Signup/Login</s>
  - <s>Redirect logged in users away from signup/login</s>
  - <s>Auth. (only signed in can submit)</s>
- <s>'X' button to remove a search term from query</s>

### Non-priority / Later
- real pagination
- style w/ bootstrap
- deploy to heroku

### Ideas
- unique URLs per query w/ react-router?
- users can "subscribe" to standards, recieving email when new resource submitted?
- associate resources w/ user who submitted
  - track "karma/score" per user? (gamifies submission?) 
- upvote/visited ranking?
- shortid + react-router for resource id's
  - comments page for each resource
