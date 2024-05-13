Rails.application.routes.draw do
  get '/dashboard', to: 'dashboard#index'
  resources :inventories
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  ApplicationJob.perform_now

end
