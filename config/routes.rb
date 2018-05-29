Rails.application.routes.draw do
  resources :comments
  devise_for :users, controllers: { :omniauth_callbacks => 'callbacks' }
  resources :movies
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#index'
end
