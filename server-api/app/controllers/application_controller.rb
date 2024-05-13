class ApplicationController < ActionController::API
  after_action :apply_content_range_header

  protected
  def apply_content_range_header
    response.headers['Content-Range'] = 'orders 0-24/319'
  end  
end
