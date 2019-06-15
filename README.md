# Common Core Resource Share

![ci](https://travis-ci.com/jistjoalal/resource-share.svg?token=twXeNQnipqLZqxvas2bx&branch=master)

A place to share the best Teaching/Learning resources for common core standards.

[![Screenshot](https://jist-screenshotter.herokuapp.com/desktop/https://ccshare.herokuapp.com/cc/Math/HSA)](https://ccshare.herokuapp.com/cc/)

## Dev Notes

### goals

- <s>All grade levels for Math</s>
- <s>All grade levels for English</s>

### todos

- <s>file upload/download</s>

- <s>parse std descriptions/titles</s>

  - fix columns for CCRA?
  - find some english resources

- how to speed up CI/deployments?

  - i cant figure out how to not have prod run cypress post-install script (even tho its devDep)
  - most of the time seems to be spent by meteor being big and mysterious (starting to see point of jamstack)

- travis CI appearently has only 100 free builds
  - circle CI looks like it has an unlimited free plan and better pricing

### Ideas

- fully automate stds scraping?
  - in case stds get update
  - load xml from cc site
  - wrap w/ API?
- does betterlesson have an API?
- actual search (by title / std.)
- batch upload?
- different way of selecting stds?
  - similar to commoncore site (pick grade, domain -> standard)
  - type like a search box
- a way of reporting dead links?
- a way of dynamically rendering subject pages (CCMath, CCELA)?
- jest snapshot tests for each page?

- ill math new resources @ end of july
