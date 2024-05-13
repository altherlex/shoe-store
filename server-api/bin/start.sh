#! /bin/bash

../../bin/websocketd --port=8080 ruby ../../inventory.rb
rails s