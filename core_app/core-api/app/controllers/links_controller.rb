class LinksController < ApplicationController

  def index
    @links = Link.all
    render json:@links
  end

end
