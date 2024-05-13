# Shoe Store

Here's my version of Shoe Store :raised_hands: A under-a-day app bulding using one of my favorites tools.

## Installing & Running

```shell
bin/websocketd --port=8080 ruby inventory.rb
cd server-api && bundle install && server-api/bin/rails s
cd react-admin-app && npm install && npm start
```

## Tools

* React v18
* Reactchartjs v5
* NodeJS v21.7.3
* TS
* Material Design UI
* Vite 
* React-Admin
* Ruby v3.0.3
* Rails v7
* Sqlite3


## Endpoints - REST API

* http://localhost:3000/dashboard
* http://127.0.0.1:3000/inventories?filter=%7B%7D&range=%5B10%2C19%5D&sort=%5B%22store%22%2C%22ASC%22%5D

## Next steps

* Better naming on variables and classes
* For more endpoints, implement GraphQL
* Code Refactoring
* Normalization
* TDD
* Coding notation
* More charts
* Statistics/Math
* Notification

## Features

* Realtime Charts
* Standardized Style
* Pagination
* Table Sort
* Table per Page
* Light/Dark mode
* Export CSV
* Responsive
* Backend and Frontend are Decoupled

![screnshot](screen-shot-2024-05-12-at-8.17.53-pm.png)


## Synopsis

Aldo Shoes is having a huge flash sale online. You provide support to the inventory department. They want to react real-time to various inventory problems as they arise.

You adjust the inventory whenever a new sale is completed. The return value includes the store, the shoe model and the inventory left for that shoe model in the store.

```
{
  'store' => 'ALDO Ste-Catherine',
  'model' => 'ADERI',
  'inventory' => 10,
}
```

`ALDO Ste-Catherine` store sold a pair of `ADERI` shoes. `ALDO Ste-Catherine` now has 10 pairs of `ADERI` left.

## Goal

**Design an interface that would allow the inventory department to monitor Aldo's stores and shoes inventory.**

Hope you’ll have fun with this little test. I know I had designing it.
Go wild. It can be anything you want. I’ve seen results printed to console, displayed on a webpage, and even someone who did periodical database dumps.

Here are a few ideas if you need an extra challenge:

- Add some sort of alerting system, e.g. When a shoe model at a store goes too low, or too high.
- Add a REST JSON API, or GraphQL
- Suggest shoe transfers from one store to another according to inventory
- Your own crazy idea!

Share your repository with us when you’re done.

Happy Hacking :)

## Installation

This projects uses the popular library `websocketd` to send messages.

If you're on a Mac, you can install `websocketd` using [Homebrew](http://brew.sh/). Just run `brew install websocketd`. For other operating systems, or if you don't want to use Homebrew, check out the link below.

**[Download for Linux, OS X and Windows](https://github.com/joewalnes/websocketd/wiki/Download-and-install)**

Note that a Ubuntu 64-bit version is already bundled here `bin/websocketd` for convenience.

## Getting Started

### Inventory Server

Your WebSocket Server is the tap that aggregates inventories from all stores.

You can run it directly from your own machine.

Run the following to start tapping into the inventory events.

```
(bin/)websocketd --port=8080 ruby inventory.rb
```

You now have an active connection to their stores opened on port 8080.

### Start listening on each event

Listen and react on each event using a WebSocket client.

Various implementations are at your disposal. Whatever floats your boat.

They all work the same way. Provide a method or a block to be executed whenever a new event occurs.

Here are two examples for our favorite languages:

#### Javascript

Open a console on a non-secured page:

```
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

#### Ruby

##### Installation

```
gem install faye-websocket
gem install eventmachine
```

##### Example

```
require 'faye/websocket'
require 'eventmachine'
require 'json'

EM.run {
  ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

  ws.on :message do |event|
    p JSON.parse(event.data)
  end
}
```
