# Common Core Resource Share

A place to share the best Teaching/Learning resources for common core standards.

## Overview

Meteor+React app w/ one collection (`resources`), and an enormous JS object (`standards`) mapping the CC standards.

- Maybe a way to do this with an API instead of the huge object to account for changes in standards?
- How would this affect submitted resources that get "deprecated"?
- <s>Is there a way to only store the "keys" in state and load in the hierarchy nodes dynamically?
  - better publications/subscriptions??
    - I think pagination needs to be part of the MMethod</s>
    - I ended up storing the keys as a Session var
      - ResourceListContainer sets up a withTracker using Session.get

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
  - <s>"un-favorite button" shows right one depending on fav status</s>
  - <s>pagination on favorites page</s>
- <s>users can view list of authored resources</s>
  - <s>refactor out commonalities b/w favorites, submissions, and maybe ResourceList</s>
- <s>refactor out data layer/container components? seems to help</s>
- <s>TitleBar/NavBar component w/ links</s>
- <s>message for when account already exists in signup</s>
- <s>username in resourcelist links to users submissions page</s>

### Non-priority / Later
- **BUG** when opening favorites page, resources from resourceList component flash
  - i think this happens from the client side minimongo "lagging" behind the new sub
  - is there a way to manually cancel the old sub?
  - if server goes offline, favorites and submissions links render same as App
- ability to remove submissions ?
- finish adding grade levels
- style w/ bootstrap
- deploy to heroku
- refactor

### Ideas
- modal for displaying messages like "thx for signup", "must be logged in", etc.
- users can "subscribe" to standards, recieving email/notification when new resource submitted?
- comments page for each resource?
  - shortid + react-router for resource id's

## Resource Sources
- <s>khanacademy</s>
- <s>education.com</s>
- <s>HCPSS</s>
- <s>betterlesson</s>
  - some ghetto scraping, i think my code comments are good enough
