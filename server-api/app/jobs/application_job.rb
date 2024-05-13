require 'faye/websocket'
require 'eventmachine'
require 'json'

class ApplicationJob < ActiveJob::Base
  # Automatically retry jobs that encountered a deadlock
  # retry_on ActiveRecord::Deadlocked

  # Most jobs are safe to ignore if the underlying records are no longer available
  # discard_on ActiveJob::DeserializationError

  queue_as :default

  def perform(*args)
    thread = Thread.new do
      EM.run {
        ws = Faye::WebSocket::Client.new('ws://localhost:8080/')

        ws.on :message do |event|
          data = JSON.parse(event.data)
          Inventory.find_or_create_by(store: data['store'], kind: data['model'], inventory: data['inventory'])
        end
        at_exit { thread.exit }
      }
    end
  end
end
