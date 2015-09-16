FORMAT: 1A

# Polls

Polls is a simple API allowing consumers to view polls and vote in them. You can view this documentation over at [Apiary](http://docs.pollsapi.apiary.io).

# Polls API Root [/]

This resource does not have any attributes. Instead it offers the initial API affordances in the form of the links in the JSON body.

It is recommend to follow the “url” link values, [Link](https://tools.ietf.org/html/rfc5988) or Location headers where applicable to retrieve resources. Instead of constructing your own URLs, to keep your client decoupled from implementation details.

<% include question.md %>
